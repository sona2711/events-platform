import { getCheckoutEventById, parsePriceAmd } from './eventResolver'

describe('getCheckoutEventById', () => {
  it('returns checkout override events for profile booking ids', () => {
    const event = getCheckoutEventById('event-jazz-fest')

    expect(event).toMatchObject({
      id: 'event-jazz-fest',
      title: 'Yerevan Jazz Fest 2026',
      location: 'Cascade Complex',
    })
    expect(event?.ticketTiers).toHaveLength(2)
  })

  it('builds checkout data from shared mock events for detail page ids', () => {
    const event = getCheckoutEventById('1')

    expect(event).toMatchObject({
      id: '1',
      title: 'Jazz Night at Cascade',
      location: 'Cascade Complex',
    })
    expect(event?.ticketTiers).toHaveLength(1)
    expect(event?.ticketTiers[0]).toMatchObject({
      name: 'General Admission',
      priceAmd: 8_000,
    })
  })

  it('returns undefined for unknown ids', () => {
    expect(getCheckoutEventById('unknown-event-id')).toBeUndefined()
  })
})

describe('parsePriceAmd', () => {
  it('parses AMD price strings and treats free as zero', () => {
    expect(parsePriceAmd('8,000 AMD')).toBe(8_000)
    expect(parsePriceAmd('Free')).toBe(0)
  })
})
