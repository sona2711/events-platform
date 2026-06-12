import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MarkdownText } from './index'
import { getEventDetailPath } from '@/data/scheduleAssistantEvents'

const renderMarkdown = (content: string) =>
  render(
    <MemoryRouter>
      <MarkdownText content={content} />
    </MemoryRouter>,
  )

describe('MarkdownText', () => {
  it('renders bold text and bullet lists from markdown', () => {
    renderMarkdown(`Free events:\n\n* **Startup Pitch Deck Workshop** on Oct 12, 2026.`)

    expect(screen.getByText('Startup Pitch Deck Workshop')).toHaveProperty('tagName', 'STRONG')
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('renders internal event links with react-router', () => {
    const path = getEventDetailPath('event-startup-pitch')

    renderMarkdown(`* [**Startup Pitch Deck Workshop**](${path}) on Oct 12, 2026.`)

    const link = screen.getByRole('link', { name: 'Startup Pitch Deck Workshop' })

    expect(link).toHaveAttribute('href', path)
  })
})
