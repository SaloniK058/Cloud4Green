<?php
/**
 * /customers' live Google data: the listing's rating and up to five reviews
 * from the Places API (New). Lives in /public so Vite copies it into dist
 * unchanged; it only runs on the cPanel host, not under `npm run dev`.
 *
 * The API key and place ID live in c4g-google.php, one level above the web
 * root, so no deploy can publish them. See "Google reviews" in the README.
 *
 * Google's policy forbids caching Places content, so every call here is a
 * billed request. DEFAULT_DAILY_LIMIT and the per-visitor limit are what stop
 * a bot turning that into a bill. Past either one, or on any failure, this
 * answers ok: false and the page falls back to its hand-kept content.
 */

const DEFAULT_DAILY_LIMIT = 100;
const MAX_PER_WINDOW = 20;
const WINDOW_SECONDS = 600;
const FIELDS = 'rating,userRatingCount,googleMapsUri,googleMapsLinks,reviews';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($status, $body)
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

/** Counts this visitor's recent calls. The IP is stored only as a hash. */
function rate_limited()
{
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
    $file = sys_get_temp_dir() . '/c4g-reviews-' . sha1($ip);
    $now = time();

    $hits = is_file($file) ? json_decode((string) file_get_contents($file), true) : array();
    $hits = array_filter(is_array($hits) ? $hits : array(), function ($t) use ($now) {
        return $t > $now - WINDOW_SECONDS;
    });

    if (count($hits) >= MAX_PER_WINDOW) {
        return true;
    }

    $hits[] = $now;
    file_put_contents($file, json_encode(array_values($hits)), LOCK_EX);
    return false;
}

/** Spends one of today's calls, or returns false if none are left. */
function within_daily_limit($limit)
{
    $file = sys_get_temp_dir() . '/c4g-reviews-daily-' . gmdate('Y-m-d');
    $handle = fopen($file, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        return false;
    }

    $count = (int) stream_get_contents($handle);
    if ($count < $limit) {
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, (string) ($count + 1));
    }

    flock($handle, LOCK_UN);
    fclose($handle);
    return $count < $limit;
}

/** Only https links reach the page, since they end up in href and src. */
function https_url($value)
{
    return is_string($value) && strpos($value, 'https://') === 0 ? $value : null;
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header('Allow: GET');
    respond(405, array('ok' => false, 'error' => 'method'));
}

/* Browsers label cross-site requests, so another site can't spend our calls. */
if (!empty($_SERVER['HTTP_SEC_FETCH_SITE']) && $_SERVER['HTTP_SEC_FETCH_SITE'] !== 'same-origin') {
    respond(403, array('ok' => false, 'error' => 'origin'));
}

$configFile = dirname(dirname(__DIR__)) . '/c4g-google.php';
$config = is_file($configFile) ? include $configFile : null;
if (!is_array($config) || empty($config['apiKey']) || empty($config['placeId'])) {
    respond(503, array('ok' => false, 'error' => 'config'));
}

if (rate_limited()) {
    respond(429, array('ok' => false, 'error' => 'rate'));
}

$dailyLimit = isset($config['dailyLimit']) ? (int) $config['dailyLimit'] : DEFAULT_DAILY_LIMIT;
if (!within_daily_limit($dailyLimit)) {
    error_log('google-reviews.php: daily limit reached');
    respond(429, array('ok' => false, 'error' => 'limit'));
}

$curl = curl_init('https://places.googleapis.com/v1/places/' . rawurlencode($config['placeId']));
curl_setopt_array($curl, array(
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_CONNECTTIMEOUT => 3,
    CURLOPT_TIMEOUT => 6,
    CURLOPT_HTTPHEADER => array(
        'X-Goog-Api-Key: ' . $config['apiKey'],
        'X-Goog-FieldMask: ' . FIELDS,
    ),
));
$raw = curl_exec($curl);
$code = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

$place = is_string($raw) ? json_decode($raw, true) : null;
if ($code !== 200 || !is_array($place)) {
    error_log('google-reviews.php: Places API answered ' . $code);
    respond(502, array('ok' => false, 'error' => 'upstream'));
}

$reviews = array();
foreach (isset($place['reviews']) && is_array($place['reviews']) ? $place['reviews'] : array() as $review) {
    $author = isset($review['authorAttribution']) ? $review['authorAttribution'] : array();

    /* The reviewer's own words where Google has them; a translation would
       have to be labelled as one. */
    $text = '';
    if (isset($review['originalText']['text'])) {
        $text = $review['originalText']['text'];
    } elseif (isset($review['text']['text'])) {
        $text = $review['text']['text'];
    }

    $reviews[] = array(
        'id' => isset($review['name']) ? $review['name'] : '',
        'author' => isset($author['displayName']) ? $author['displayName'] : 'Google user',
        'authorUrl' => https_url(isset($author['uri']) ? $author['uri'] : null),
        'photoUrl' => https_url(isset($author['photoUri']) ? $author['photoUri'] : null),
        'rating' => isset($review['rating']) ? $review['rating'] : null,
        'when' => isset($review['relativePublishTimeDescription']) ? $review['relativePublishTimeDescription'] : '',
        'text' => $text,
    );
}

$links = isset($place['googleMapsLinks']) ? $place['googleMapsLinks'] : array();

respond(200, array(
    'ok' => true,
    'rating' => isset($place['rating']) ? $place['rating'] : null,
    'reviewCount' => isset($place['userRatingCount']) ? $place['userRatingCount'] : null,
    'mapsUrl' => https_url(isset($place['googleMapsUri']) ? $place['googleMapsUri'] : null),
    'reviewsUrl' => https_url(isset($links['reviewsUri']) ? $links['reviewsUri'] : null),
    'writeReviewUrl' => https_url(isset($links['writeAReviewUri']) ? $links['writeAReviewUri'] : null),
    'reviews' => $reviews,
));
