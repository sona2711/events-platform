import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { NotFoundContent } from '@/components/features/NotFoundContent'
import '@/i18n'
import i18n from '@/i18n'
import notFoundEn from '@/locales/notFound/en.json'

jest.mock('react-router-dom', () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string
    children: ReactNode
    className?: string
    replace?: boolean
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}))

const renderNotFoundContent = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <NotFoundContent />
    </I18nextProvider>,
  )

describe('NotFoundContent', () => {
  it('renders the 404 hero content and home link', () => {
    renderNotFoundContent()

    expect(screen.getByRole('heading', { level: 1, name: /404/i })).toBeInTheDocument()
    expect(screen.getByText(notFoundEn.title)).toBeInTheDocument()
    expect(screen.getByText(notFoundEn.description)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: notFoundEn.homeLink })).toHaveAttribute('href', '/')
  })
})
