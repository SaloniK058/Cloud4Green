import { useEffect, useState } from "react";

/**
 * The live Google listing from public/api/google-reviews.php, or null until it
 * answers. It stays null if the endpoint can't help, which is always the case
 * under `npm run dev`, so callers need their hand-kept content as a fallback.
 *
 * Not stored between visits: Google's policy forbids caching Places content.
 */
export default function useGooglePlace() {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/google-reviews.php", { signal: controller.signal })
      .then((response) => response.json())
      .then((result) => {
        if (result.ok) setPlace(result);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return place;
}
