import React from 'react'
import { render, screen } from '@testing-library/react'
import { Hero } from './index'
import { TICKER_TEXT } from './consts'

describe('Hero', () => {
  it('renders the main headline, description, and action buttons', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', {
        name: /experience the pulse of yerevan/i,
      }),
    ).toBeTruthy()
    expect(
      screen.getByText(/discover curated cultural experiences, underground techno nights,/i),
    ).toBeTruthy()
    expect(screen.getByText(/and tech summits in the heart of armenia\./i)).toBeTruthy()
    expect(screen.getByRole('button', { name: /start exploring/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /watch pulse reel/i })).toBeTruthy()
  })

  it('renders duplicated ticker text for the marquee animation', () => {
    render(<Hero />)

    expect(screen.getAllByText(TICKER_TEXT)).toHaveLength(2)
  })
})
