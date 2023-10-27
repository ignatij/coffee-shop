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

export const getCoffeeQuery = gql`
  query GetCoffees {
    coffees {
      id
      title
      ingredients
    }
  }
`

export const getExternalCoffeeQuery = gql`
  query GetCoffees {
    externalCoffees {
      id
      title
      ingredients
    }
  }
`
