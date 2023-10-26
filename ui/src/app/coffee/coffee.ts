export interface Coffee {
  id: string
  title: string
  ingredients: string[]
}

export interface DecoratedCoffee extends Coffee {
  coffee: Coffee
  additionalIngredient: string
}
