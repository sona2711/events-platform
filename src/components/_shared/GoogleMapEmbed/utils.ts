export const GOOGLE_MAPS_EMBED_ZOOM = 15

export const buildGoogleMapsEmbedUrl = (lat: number, lng: number, placeName?: string): string => {
  const query = encodeURIComponent(placeName ?? `${lat},${lng}`)
  return `https://maps.google.com/maps?q=${query}&hl=en&z=${GOOGLE_MAPS_EMBED_ZOOM}&output=embed`
}

export const buildGoogleMapsDirectionsUrl = (
  lat: number,
  lng: number,
  placeName?: string,
): string => {
  const destination = encodeURIComponent(placeName ?? `${lat},${lng}`)
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`
}
