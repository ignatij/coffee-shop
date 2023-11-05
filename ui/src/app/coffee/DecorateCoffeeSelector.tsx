import { Box, Checkbox, Chip, Typography } from '@mui/joy'
import React, { useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { Coffee, DecoratedCoffee } from './coffee'

export const DecorateCoffeeSelector = () => {
  const { setOrder, ingredients, order } = useContext(CoffeeContext)
  const [selected, setSelected] = React.useState<string[]>([])

  const decorateOrder = (ingredient: string) => {
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

  const unDecorateOrder = (ingredient: string) => {
    let currOrder = order
    let prevOrder = order
    if ((currOrder as DecoratedCoffee).additionalIngredient === ingredient) {
      // most recent selection is toggled
      setOrder(
        (prevCoffee: Coffee | undefined) =>
          (prevCoffee as DecoratedCoffee).coffee,
      )
      return
    }

    while ((currOrder as DecoratedCoffee).additionalIngredient !== ingredient) {
      prevOrder = currOrder
      currOrder = (currOrder as DecoratedCoffee).coffee
    }
    (prevOrder as DecoratedCoffee).coffee = (
      currOrder as DecoratedCoffee
    ).coffee

    setOrder(prevCoffee => {
      const res = replaceCoffeeInList(
        prevCoffee as DecoratedCoffee,
        prevOrder as DecoratedCoffee,
      )
      return {
        ...res,
      }
    })
  }

  const replaceCoffeeInList = (
    prevCoffee: DecoratedCoffee,
    prevOrder: DecoratedCoffee,
  ): DecoratedCoffee => {
    if (prevCoffee.additionalIngredient == prevOrder.additionalIngredient) {
      return prevOrder
    } else {
      return {
        ...prevCoffee,
        coffee: replaceCoffeeInList(
          prevCoffee.coffee as DecoratedCoffee,
          prevOrder,
        ),
      }
    }
  }

  return (
    order && (
      <>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <div>
            <Typography level="title-lg" id="fav-movie" mb={2}>
              Add an additional topping
            </Typography>
            <Box
              role="group"
              aria-labelledby="fav-movie"
              sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
            >
              {ingredients.map(name => {
                const checked = selected.includes(name)
                return (
                  <Chip
                    key={name}
                    variant="plain"
                    color={checked ? 'primary' : 'neutral'}
                  >
                    <Checkbox
                      variant="outlined"
                      color={checked ? 'primary' : 'neutral'}
                      disableIcon
                      overlay
                      label={name}
                      checked={checked}
                      onChange={event => {
                        setSelected(names =>
                          !event.target.checked
                            ? names.filter(n => n !== name)
                            : [...names, name],
                        )
                        if (!event.target.checked) {
                          unDecorateOrder(name)
                        } else {
                          decorateOrder(name)
                        }
                      }}
                    />
                  </Chip>
                )
              })}
            </Box>
          </div>
        </Box>
      </>
    )
  )
}
