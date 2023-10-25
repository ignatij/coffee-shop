import { Select, Option, Typography } from '@mui/joy'
import { CoffeeContext } from './CoffeeManager'
import { useContext } from 'react'
import { Coffee } from './coffee'

export const PredefinedCoffeesSelector = () => {
  const { coffees, setOrder } = useContext(CoffeeContext)
  return (
    <>
      <Typography level="h3">
        Please choose a predefined coffee from our system
      </Typography>
      <Select
        onChange={(_, c: Coffee) => {
          setOrder(() => c)
        }}
      >
        {coffees.map((c: Coffee) => (
          <Option key={c.id} value={c}>
            {c.title}
          </Option>
        ))}
      </Select>
    </>
  )
}
