import { describe, it, expect } from 'vitest'
import { PredefinedCoffeesSelector } from './PredefinedCoffeesSelector'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoffeeContext } from './CoffeeManager'

describe('PredefinedCoffeesSelectorTests', () => {
  it('should render component with the dropdown items', async () => {
    render(
      <CoffeeContext.Provider
        value={{
          order: undefined,
          setOrder: () => {},
          externalCoffees: [],
          ingredients: [],
          coffees: [
            {
              id: '1',
              title: 'Test title',
              ingredients: ['test ingredient'],
            },
          ],
        }}
      >
        <PredefinedCoffeesSelector />
      </CoffeeContext.Provider>,
    )
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('option').textContent).toBe('Test title')
  })
})
