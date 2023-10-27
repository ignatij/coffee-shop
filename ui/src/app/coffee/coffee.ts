import { gql } from '@apollo/client'

export interface Coffee {
  id: string
  title: string
  ingredients: string[]
}

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
