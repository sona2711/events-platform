import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@/i18n'
import i18n from '@/i18n'
import { WINE_FEST_CTA_PATH } from './consts'
import { WineFestHero } from './index'

function renderWineFestHero() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <WineFestHero />
      </MemoryRouter>
    </I18nextProvider>,
  )
}

describe('WineFestHero', () => {
  it('renders the spotlight content and routes get tickets to login', () => {
    renderWineFestHero()

    expect(screen.getByRole('heading', { name: /armenia wine fest 2026/i })).toBeTruthy()
    expect(screen.getByLabelText(/countdown to event/i)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Get Tickets' })).toHaveAttribute(
      'href',
      WINE_FEST_CTA_PATH,
    )
  })
})
