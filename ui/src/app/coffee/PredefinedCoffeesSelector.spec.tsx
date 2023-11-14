import { describe, it, expect } from 'vitest'
import { PredefinedCoffeesSelector } from './PredefinedCoffeesSelector'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CoffeeContext } from './CoffeeManager'
import { OrderInput } from './coffee'

describe('PredefinedCoffeesSelectorTests', () => {
  it('should render component with the dropdown items', async () => {
    render(
      <CoffeeContext.Provider
        value={{
          order: undefined,
          setOrder: () => {},
          externalCoffees: [],
          ingredients: [],
          addOrder: (_: { variables: { order: OrderInput } }) => {
            return {}
          },
          placedOrder: undefined,
          coffees: [
            {
              id: '1',
              title: 'Test title',
              ingredients: ['test ingredient'],
            },
          ],
        }}
      >
        <PredefinedCoffeesSelector
          value={null}
          setValue={() => {}}
          resetFn={() => {}}
        />
      </CoffeeContext.Provider>,
    )
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByRole('option').textContent).toBe('Test title')
  })
})
