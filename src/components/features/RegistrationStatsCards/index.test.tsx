import { render, screen } from '@testing-library/react'
import { RegistrationStatsCards } from './index'
import { STAT_CARD_META } from './consts'

const renderStatsCards = (props?: Partial<Parameters<typeof RegistrationStatsCards>[0]>) =>
  render(
    <RegistrationStatsCards total={1284} active={942} cancelled={187} pending={155} {...props} />,
  )

describe('RegistrationStatsCards', () => {
  it('renders all stat cards with labels and formatted values', () => {
    renderStatsCards()

    expect(screen.getByRole('list', { name: 'Registration statistics' })).toBeInTheDocument()

    STAT_CARD_META.forEach((card) => {
      expect(screen.getByText(card.label)).toBeInTheDocument()
    })

    expect(screen.getByText('1,284')).toBeInTheDocument()
    expect(screen.getByText('942')).toBeInTheDocument()
    expect(screen.getByText('187')).toBeInTheDocument()
    expect(screen.getByText('155')).toBeInTheDocument()
  })

  it('renders each stat as a list item', () => {
    renderStatsCards()

    expect(screen.getAllByRole('listitem')).toHaveLength(STAT_CARD_META.length)
  })

  it('formats zero values correctly', () => {
    renderStatsCards({ total: 0, active: 0, cancelled: 0, pending: 0 })

    expect(screen.getAllByText('0')).toHaveLength(4)
  })
})
