import { describe, it, expect } from 'vitest'
import renderer from 'react-test-renderer'
import App from './App'
import { render, screen } from '@testing-library/react'

// function toJson(component: renderer.ReactTestRenderer) {
//   const result = component.toJSON()
//   expect(result).toBeDefined()
//   expect(result).not.toBeInstanceOf(Array)
//   return result as renderer.ReactTestRendererJSON
// }

describe('random tests', () => {
  it('should pass', () => {
    const component = render(<App />)
    expect(component).toBeTruthy()
  })
})
