import { Button, List, ListItem, ListItemDecorator, Typography } from '@mui/joy'
import { useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { Coffee, DecoratedCoffee } from './coffee'

export const PreviewCoffeeOrder = () => {
  const { order, addOrder } = useContext(CoffeeContext)

  const getAdditionalIngredients = (
    decoratedOrder: Coffee | undefined,
  ): string[] =>
    (decoratedOrder as DecoratedCoffee).additionalIngredient
      ? [
          ...getAdditionalIngredients(
            (decoratedOrder as DecoratedCoffee).coffee,
          ),
          (decoratedOrder as DecoratedCoffee).additionalIngredient,
        ]
      : ['']

  const prepareAdditionaIngredients = (): string[] => {
    // remove the initial ''
    return getAdditionalIngredients(order).slice(1)
  }

  const addNewOrder = () => {
    const additionalIngredients = prepareAdditionaIngredients()
    addOrder({
      variables: {
        order: {
          title: order?.title || '',
          ingredients: order?.ingredients || [],
          additionalIngredients,
        },
      },
    })
  }

  return (
    <>
      {order && (
        <>
          <div>
            <Typography level="h3">Preview order</Typography>
            <Typography level="h4">{order?.title}</Typography>
          </div>
          <div>
            <Typography level="body-xs">Ingredients</Typography>
            <List>
              {order?.ingredients.map((ingredient: string) => (
                <ListItem key={ingredient}>
                  <ListItemDecorator>{ingredient}</ListItemDecorator>
                </ListItem>
              ))}
            </List>
          </div>
          {(order as DecoratedCoffee).additionalIngredient && (
            <>
              <div>
                <Typography level="body-xs">Additional Ingredients</Typography>
                <List>
                  {prepareAdditionaIngredients().map((ingredient: string) => (
                    <ListItem key={ingredient}>
                      <ListItemDecorator>{ingredient}</ListItemDecorator>
                    </ListItem>
                  ))}
                </List>
              </div>
            </>
          )}
          <div>
            <Button onClick={addNewOrder}>Create Order</Button>
          </div>
        </>
      )}
    </>
  )
}
