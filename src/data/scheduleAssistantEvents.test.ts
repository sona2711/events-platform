import { getEventDetailPath, linkifyScheduleEventLinks } from './scheduleAssistantEvents'

describe('linkifyScheduleEventLinks', () => {
  it('turns bold event titles into internal event links', () => {
    const markdown = `Free events:\n\n* **Startup Pitch Deck Workshop** on Oct 12, 2026.\n* **Vernissage Night Market** on Oct 16, 2026.`

    const linked = linkifyScheduleEventLinks(markdown)

    expect(linked).toContain(
      `[**Startup Pitch Deck Workshop**](${getEventDetailPath('event-startup-pitch')})`,
    )
    expect(linked).toContain(
      `[**Vernissage Night Market**](${getEventDetailPath('event-night-market')})`,
    )
  })

  it('does not double-link titles that are already linked', () => {
    const path = getEventDetailPath('event-tech-meetup-tumo')
    const markdown = `[**Tech Meetup Yerevan**](${path}) on Nov 2, 2026.`

    expect(linkifyScheduleEventLinks(markdown)).toBe(markdown)
  })
})
