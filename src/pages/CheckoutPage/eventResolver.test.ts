import { getCheckoutEventById, parsePriceAmd } from './eventResolver'

describe('getCheckoutEventById', () => {
  it('returns checkout override events for profile booking ids', () => {
    const event = getCheckoutEventById('event-jazz-fest')

    expect(event).toMatchObject({
      id: 'event-jazz-fest',
      title: 'Yerevan Jazz Night at Cascade',
      location: 'Cascade Complex, Yerevan',
    })
    expect(event?.ticketTiers).toHaveLength(2)
  })

  it('builds checkout data from shared mock events for detail page ids', () => {
    const event = getCheckoutEventById('event-wine-food-festival')

    expect(event).toMatchObject({
      id: 'event-wine-food-festival',
      title: 'Wine & Food Festival',
      location: 'Republic Square',
    })
    expect(event?.ticketTiers).toHaveLength(1)
    expect(event?.ticketTiers[0]).toMatchObject({
      name: 'General Admission',
      priceAmd: 12_000,
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
