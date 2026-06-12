import type { EventLocationDetails } from './eventDetailTypes'
import { EVENT_LOCATION_BY_ID, LOCATION_PRESETS } from './eventLocations'

const YEREVAN_CENTER = { lat: 40.1772, lng: 44.5126 }

export const resolveEventLocationDetails = (
  eventId: string,
  locationLabel: string,
): EventLocationDetails => {
  const byEventId = EVENT_LOCATION_BY_ID[eventId]
  if (byEventId) return byEventId

  const byLabel = LOCATION_PRESETS[locationLabel]
  if (byLabel) return byLabel

  return {
    name: locationLabel,
    address: `${locationLabel}, Armenia`,
    ...YEREVAN_CENTER,
  }
}
