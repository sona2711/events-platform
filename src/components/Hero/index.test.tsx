import React from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@/i18n'
import i18n from '@/i18n'
import { HERO_FEATURED_EVENT } from '@/components/features/homepage/homeContent'
import { Hero } from './index'

function renderHero() {
  return render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Hero />
      </MemoryRouter>
    </I18nextProvider>,
  )
}

describe('Hero', () => {
  it('renders the main headline, description, and action links', () => {
    renderHero()

    expect(
      screen.getByRole('heading', {
        name: /experience the pulse of yerevan/i,
      }),
    ).toBeTruthy()
    expect(
      screen.getByText(
        'Discover curated cultural experiences, underground techno nights, and tech summits in the heart of Armenia.',
      ),
    ).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Start Exploring' })).toHaveAttribute(
      'href',
      '/categories',
    )
    expect(screen.getByRole('link', { name: 'View This Week' })).toHaveAttribute(
      'href',
      '/categories',
    )
  })

  it('renders featured event cards and category chips', () => {
    renderHero()

    expect(
      screen.getByRole('link', {
        name: `Featured event: ${HERO_FEATURED_EVENT.title}`,
      }),
    ).toHaveAttribute('href', `/event/${HERO_FEATURED_EVENT.id}`)
    expect(screen.getByRole('link', { name: 'Music' })).toHaveAttribute('href', '/categories')
    expect(screen.getByRole('link', { name: 'Technology' })).toHaveAttribute('href', '/categories')
  })
})
