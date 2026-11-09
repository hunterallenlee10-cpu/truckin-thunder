import { locations, type Location } from "@/data/locations";

/** Great-circle distance in miles. */
export function milesBetween(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 3958.8;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function nearestLocation(point: { lat: number; lng: number }): { location: Location; miles: number } {
  return locations
    .map((location) => ({ location, miles: milesBetween(point, location.geo) }))
    .sort((a, b) => a.miles - b.miles)[0];
}

/** Promise wrapper around the browser Geolocation API. */
export function getBrowserPosition(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      reject(new Error("Location is not available in this browser."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) =>
        reject(
          new Error(
            err.code === err.PERMISSION_DENIED
              ? "Location permission was blocked. Pick a shop below instead."
              : "We couldn't find your location. Pick a shop below instead.",
          ),
        ),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  });
}
