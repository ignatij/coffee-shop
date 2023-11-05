import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CoffeeManager } from './CoffeeManager'
import { DecorateCoffeeSelector } from './DecorateCoffeeSelector'
import { ExternalCoffeesSelector } from './ExternalCoffeesSelector'
import { PlacedOrders } from './PlacedOrders'
import { PredefinedCoffeesSelector } from './PredefinedCoffeesSelector'
import { PreviewCoffeeOrder } from './PreviewCoffeeOrder'
import { getCoffeeQuery, getExternalCoffeeQuery } from './coffee'

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

    const useMutation = vi.fn().mockImplementation(() => {
      return [
        () => {},
        {
          data: {
            addOrder: {
              id: 'test-id',
            },
          },
        },
      ]
    })

    return { useQuery, useMutation, gql }
  })

  beforeEach(() => {
    render(
      <CoffeeManager>
        <PredefinedCoffeesSelector />
        <ExternalCoffeesSelector />
        <DecorateCoffeeSelector />
        <PreviewCoffeeOrder />
        <PlacedOrders />
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

  it('should show toppings when there is an order in preparation', async () => {
    const buttons = await screen.findAllByRole('combobox')

    // external coffees click
    await userEvent.click(buttons[1])

    const option = await screen.findAllByRole('option')
    expect(option[0].textContent).toBe('Test external title 1')
    expect(option[1].textContent).toBe('Test external title 2')

    const list = await screen.findByRole('listbox')

    await userEvent.selectOptions(list, option[0])
    const checkboxes = await screen.findAllByRole('checkbox')

    // select one additional topping
    await userEvent.click(checkboxes[0])

    const additionalIngredientsSection = await screen.findByText(
      'Additional Ingredients',
    )
    // the section should be shown
    expect(additionalIngredientsSection.textContent).toEqual(
      'Additional Ingredients',
    )

    // toggle the same topping
    await userEvent.click(checkboxes[0])
    const hiddenAdditionalIngredientsSection = await screen.queryAllByText(
      'Additional Ingredients',
    )

    // section for additional toppings should be hidden
    expect(hiddenAdditionalIngredientsSection.length).toEqual(0)
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

  it('should make an order', async () => {
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

    const createOrderBtn = await screen.findByText('Create Order')
    await userEvent.click(createOrderBtn)

    const placedOrderDiv = await screen.findByText(
      'You have placed a new order with id test-id!',
    )

    expect(placedOrderDiv).toBeTruthy()
  })
})
