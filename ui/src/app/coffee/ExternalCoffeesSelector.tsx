import { Select, Typography, Option } from '@mui/joy'
import { useContext } from 'react'
import { Coffee } from './coffee'
import { CoffeeContext } from './CoffeeManager'

export const ExternalCoffeesSelector = () => {
  const { externalCoffees, setOrder } = useContext(CoffeeContext)
  return (
    <>
      <Typography level="h3">
        Or choose a coffee from our external system
      </Typography>
      <Select
        onChange={(_, c: Coffee) => {
          setOrder(() => c)
        }}
      >
        {externalCoffees.map((c: Coffee) => (
          <Option key={c.id} value={c}>
            {c.title}
          </Option>
        ))}
      </Select>
    </>
  )
}
