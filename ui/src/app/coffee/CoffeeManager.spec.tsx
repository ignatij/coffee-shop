import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CoffeeManager } from './CoffeeManager'
import { getCoffeeQuery, getExternalCoffeeQuery } from './coffee'
import { PredefinedCoffeesSelector } from './PredefinedCoffeesSelector'
import { ExternalCoffeesSelector } from './ExternalCoffeesSelector'
import { DecorateCoffeeSelector } from './DecorateCoffeeSelector'
import { PreviewCoffeeOrder } from './PreviewCoffeeOrder'
import userEvent from '@testing-library/user-event'

describe('CoffeeManager tests', () => {
  vi.mock('@apollo/client', () => {
    const useQuery = vi.fn().mockImplementation(query => {
      if (query === getCoffeeQuery) {
        return {
          data: {
            coffees: [
              {
                id: 1,
                title: 'Test title 1',
                ingredients: ['ingredient 1'],
              },
            ],
          },
        }
      } else if (query === getExternalCoffeeQuery) {
        return {
          data: {
            externalCoffees: [
              {
                id: 1,
                title: 'Test external title 1',
                ingredients: ['ingredient 1'],
              },
              {
                id: 2,
                title: 'Test external title 2',
                ingredients: ['ingredient 1', 'ingredient 2', 'ingredient 3'],
              },
            ],
          },
        }
      }
    })
    const gql = vi.fn().mockImplementation(arg => arg)
    return { useQuery, gql }
  })

  beforeEach(() => {
    render(
      <CoffeeManager>
        <PredefinedCoffeesSelector />
        <ExternalCoffeesSelector />
        <DecorateCoffeeSelector />
        <PreviewCoffeeOrder />
      </CoffeeManager>,
    )
  })

  it('should have predefined coffees on screen after clicking on corresponding select button', async () => {
    const buttons = await screen.findAllByRole('combobox')

    // predefined coffees click
    await userEvent.click(buttons[0])

    const option = await screen.findByRole('option')
    expect(option.textContent).toBe('Test title 1')
  })

  it('should have external coffees on screen after clicking on corresponding select button', async () => {
    const buttons = await screen.findAllByRole('combobox')

    // external coffees click
    await userEvent.click(buttons[1])

    const option = await screen.findAllByRole('option')
    expect(option[0].textContent).toBe('Test external title 1')
    expect(option[1].textContent).toBe('Test external title 2')
  })

  it('should have ingredients on screen after clicking on corresponding select button', async () => {
    const buttons = await screen.findAllByRole('combobox')

    // ingredients click
    await userEvent.click(buttons[2])

    const option = await screen.findAllByRole('option')
    expect(option[0].textContent).toBe('ingredient 1')
    expect(option[1].textContent).toBe('ingredient 2')
    expect(option[2].textContent).toBe('ingredient 3')
  })

  it('should have order previewed on screen', async () => {
    const buttons = await screen.findAllByRole('combobox')

    // external coffees click
    await userEvent.click(buttons[1])

    const option = await screen.findAllByRole('option')
    expect(option[0].textContent).toBe('Test external title 1')
    expect(option[1].textContent).toBe('Test external title 2')

    const list = await screen.findByRole('listbox')

    await userEvent.selectOptions(list, option[0])
    const previewOrder = await screen.findByText('Preview order')
    expect(previewOrder.textContent).toEqual('Preview order')

    // title of coffee
    const headings = await screen.findAllByRole('heading')
    expect(headings[headings.length - 1].textContent).toEqual(
      'Test external title 1',
    )

    // ingredient of the coffee
    const ingredients = await screen.findByRole('listitem')
    expect(ingredients.textContent).toEqual('ingredient 1')
  })
})
