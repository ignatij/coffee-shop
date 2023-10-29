import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('random tests', () => {
  it('should pass', () => {
    const component = render(<App />)
    expect(component).toBeTruthy()
  })
})
