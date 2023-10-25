import { useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { Typography, ListItem, ListItemDecorator, List } from '@mui/joy'

export const PreviewCoffeeOrder = () => {
  const { order } = useContext(CoffeeContext)

  return (
    <>
      {order && (
        <>
          <Typography level="h3">Preview order</Typography>
          <Typography level="h4">{order?.title}</Typography>
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
        </>
      )}
    </>
  )
}
