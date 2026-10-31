<?php
/**
 * The /contact form's endpoint: validates a submission and emails it to the
 * company inbox. Lives in /public so Vite copies it into dist unchanged; it
 * only runs on the cPanel host, not under `npm run dev`.
 *
 * Sent with PHP's mail() from the web server, whose IP is listed in the
 * domain's SPF record. If that IP ever changes, update the SPF record too or
 * these messages will start landing in junk.
 *
 * The domain's mail is on Microsoft 365, so cPanel's Email Routing for it must
 * be "Remote Mail Exchanger". Set to "Local", the server keeps the message in
 * its own mailbox and it never reaches Outlook, with no error here.
 */

const RECIPIENT = 'reach@cloud4green.com';
const SENDER = 'website@cloud4green.com';
const MAX_PER_WINDOW = 5;
const WINDOW_SECONDS = 600;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond($status, $body)
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

/** A single-line field: no line breaks, so it can't inject mail headers. */
function line($name, $max = 200)
{
    $value = isset($_POST[$name]) && is_string($_POST[$name]) ? $_POST[$name] : '';
    return substr(trim(preg_replace('/[\r\n\t\0]+/', ' ', $value)), 0, $max);
}

/** Counts this visitor's recent sends. The IP is stored only as a hash. */
function rate_limited()
{
    $ip = isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '';
    $file = sys_get_temp_dir() . '/c4g-contact-' . sha1($ip);
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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, array('ok' => false, 'error' => 'method'));
}

/* Browsers send Origin on a cross-site POST, so another site's form stops here. */
if (!empty($_SERVER['HTTP_ORIGIN'])) {
    $origin = parse_url($_SERVER['HTTP_ORIGIN'], PHP_URL_HOST);
    $host = preg_replace('/:\d+$/', '', isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '');
    if ($origin !== $host) {
        respond(403, array('ok' => false, 'error' => 'origin'));
    }
}

/* The hidden field only a bot fills in. Answer as if it worked, so it moves on. */
if (line('website') !== '') {
    respond(200, array('ok' => true));
}

$firstName = line('firstName', 80);
$lastName = line('lastName', 80);
$email = line('email', 254);
$company = line('company');
$interest = line('interest', 80);
$service = line('service');
$message = isset($_POST['message']) && is_string($_POST['message'])
    ? substr(trim(str_replace("\0", '', $_POST['message'])), 0, 5000)
    : '';

if ($firstName === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, array('ok' => false, 'error' => 'invalid'));
}

if (rate_limited()) {
    respond(429, array('ok' => false, 'error' => 'rate'));
}

$name = trim($firstName . ' ' . $lastName);
$subject = 'Website enquiry from ' . $name . ($company !== '' ? ' (' . $company . ')' : '');

$body = implode("\r\n", array_filter(array(
    'New enquiry from the cloud4green.com contact form.',
    '',
    'Name: ' . $name,
    'Email: ' . $email,
    $company !== '' ? 'Company: ' . $company : null,
    $interest !== '' ? 'Interested in: ' . $interest : null,
    $service !== '' ? 'Came from: ' . $service : null,
    '',
    'Message:',
    $message,
), function ($row) {
    return $row !== null;
}));

$headers = implode("\r\n", array(
    'From: Cloud4Green Website <' . SENDER . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
));

$sent = mail(
    RECIPIENT,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    chunk_split(base64_encode($body)),
    $headers,
    '-f' . SENDER
);

if (!$sent) {
    error_log('contact.php: mail() refused the message');
    respond(502, array('ok' => false, 'error' => 'send'));
}

respond(200, array('ok' => true));
