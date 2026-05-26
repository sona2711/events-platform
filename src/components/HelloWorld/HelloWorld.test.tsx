import { render, screen } from '@testing-library/react'
import { HelloWorld } from './HelloWorld'

describe('HelloWorld', () => {
  it('renders the message', () => {
    render(<HelloWorld message="Hello, World!" />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
  })
})
