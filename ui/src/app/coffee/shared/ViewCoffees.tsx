import { PropsWithChildren, useContext } from 'react'
import { Coffee } from '../coffee'
import { CoffeeContext } from '../CoffeeManager'
import { Select, Typography, Option } from '@mui/joy'

export const ViewCoffees = ({
  coffees,
  title
}: PropsWithChildren<{ coffees: Coffee[], title: string }>) => {

    const { setOrder } = useContext(CoffeeContext)
    return (
      <div>
        <Typography level="h3">
         {title}
        </Typography>
        <Select
          onChange={(_, c: Coffee | null) => {
            if (c) {
              setOrder(() => c)
            }
          }}
        >
          {coffees.map((c: Coffee) => (
            <Option key={c.id} value={c}>
              {c.title}
            </Option>
          ))}
        </Select>
      </div>
    )
}
