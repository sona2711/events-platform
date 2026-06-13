import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { ScheduleDay, ScheduleEvent, SchedulePlace, ScheduleSlot } from '../types.js'

dayjs.extend(customParseFormat)

const EVENT_DATE_FORMAT = 'MMM D, YYYY'

const parseEventDate = (date: string): dayjs.Dayjs => dayjs(date, EVENT_DATE_FORMAT)

const compareByTime = (left: ScheduleEvent, right: ScheduleEvent): number => {
  const leftMinutes = parseTimeToMinutes(left.time)
  const rightMinutes = parseTimeToMinutes(right.time)

  if (leftMinutes !== rightMinutes) {
    return leftMinutes - rightMinutes
  }

  return left.title.localeCompare(right.title)
}

const parseTimeToMinutes = (time: string): number => {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)

  if (!match) {
    return Number.MAX_SAFE_INTEGER
  }

  let hours = Number(match[1])
  const minutes = Number(match[2])
  const period = match[3].toUpperCase()

  if (period === 'PM' && hours !== 12) {
    hours += 12
  }

  if (period === 'AM' && hours === 12) {
    hours = 0
  }

  return hours * 60 + minutes
}

const groupEventsByLocation = (events: ScheduleEvent[]): SchedulePlace[] => {
  const byLocation = new Map<string, ScheduleEvent[]>()

  for (const event of events) {
    const locationEvents = byLocation.get(event.location) ?? []
    locationEvents.push(event)
    byLocation.set(event.location, locationEvents)
  }

  return [...byLocation.entries()]
    .sort(([leftLocation], [rightLocation]) => leftLocation.localeCompare(rightLocation))
    .map(([location, locationEvents]) => ({
      location,
      slots: groupEventsByHour(locationEvents),
    }))
}

const groupEventsByHour = (events: ScheduleEvent[]): ScheduleSlot[] => {
  const byHour = new Map<string, ScheduleEvent[]>()

  for (const event of events) {
    const hourEvents = byHour.get(event.time) ?? []
    hourEvents.push(event)
    byHour.set(event.time, hourEvents)
  }

  return [...byHour.entries()]
    .sort(([leftHour], [rightHour]) => parseTimeToMinutes(leftHour) - parseTimeToMinutes(rightHour))
    .map(([hour, hourEvents]) => ({
      hour,
      events: [...hourEvents].sort(compareByTime),
    }))
}

export const buildEventSchedule = (events: ScheduleEvent[]): ScheduleDay[] => {
  const byDate = new Map<string, ScheduleEvent[]>()

  for (const event of events) {
    const dateEvents = byDate.get(event.date) ?? []
    dateEvents.push(event)
    byDate.set(event.date, dateEvents)
  }

  return [...byDate.entries()]
    .sort(([leftDate], [rightDate]) => {
      const left = parseEventDate(leftDate)
      const right = parseEventDate(rightDate)

      if (!left.isValid() || !right.isValid()) {
        return leftDate.localeCompare(rightDate)
      }

      return left.valueOf() - right.valueOf()
    })
    .map(([date, dateEvents]) => ({
      date,
      places: groupEventsByLocation(dateEvents),
    }))
}

export const formatScheduleForPrompt = (schedule: ScheduleDay[]): string => {
  return schedule
    .map((day) => {
      const placeLines = day.places
        .map((place) => {
          const slotLines = place.slots
            .map((slot) => {
              const eventLines = slot.events
                .map(
                  (event) =>
                    `      - ${event.title} (${event.category}, ${event.price}) [id: ${event.id}]`,
                )
                .join('\n')

              return `    ${slot.hour}:\n${eventLines}`
            })
            .join('\n')

          return `  ${place.location}:\n${slotLines}`
        })
        .join('\n')

      return `${day.date}:\n${placeLines}`
    })
    .join('\n\n')
}
