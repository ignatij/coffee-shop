import React, { useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { Typography, Option, Select } from '@mui/joy'
import { Coffee, DecoratedCoffee } from './coffee'

export const DecorateCoffeeSelector = () => {
  const { setOrder, ingredients } = useContext(CoffeeContext)

  const decorateOrder = (
    _: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null,
    ingredient: string | null,
  ) => {
    if (ingredient) {
      setOrder(
        (prevCoffee: Coffee | undefined) =>
          ({
            coffee: prevCoffee,
            additionalIngredient: ingredient,
            // ingredients and title kept for listing them easier in the preview component
            ingredients: prevCoffee?.ingredients,
            title: prevCoffee?.title,
          } as DecoratedCoffee),
      )
    }
  }

  return (
    <>
      <Typography level="h3">
        Or additionally adding a topping of your favorite flavour
      </Typography>
      <Select onChange={decorateOrder}>
        {ingredients.map((ingredient: string) => (
          <Option key={ingredient} value={ingredient}>
            {ingredient}
          </Option>
        ))}
      </Select>
    </>
  )
}
