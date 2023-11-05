import { gql } from '@apollo/client'
import { Coffee, OrderInput } from '../../../../app/src/__generated__/graphql'

export interface DecoratedCoffee extends Coffee {
  coffee: Coffee
  additionalIngredient: string
}

const coffeeFields = gql`
  fragment coffeeFields on Coffee {
    id
    title
    ingredients
  }
`

export const getCoffeeQuery = gql`
  query GetCoffees {
    coffees {
      ...coffeeFields
    }
  }
  ${coffeeFields}
`

export const getExternalCoffeeQuery = gql`
  query GetCoffees {
    externalCoffees {
      ...coffeeFields
    }
  }
  ${coffeeFields}
`

export const addOrderMutation = gql`
  mutation AddOrder($order: OrderInput!) {
    addOrder(order: $order) {
      id
    }
  }
`

export type { Coffee, OrderInput }

