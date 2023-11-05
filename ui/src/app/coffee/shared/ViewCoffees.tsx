import { PropsWithChildren, useContext } from 'react'
import { Coffee } from '../coffee'
import { CoffeeContext } from '../CoffeeManager'
import { Select, Typography, Option, Box } from '@mui/joy'

export const ViewCoffees = ({
  coffees,
  title,
}: PropsWithChildren<{ coffees: Coffee[]; title: string }>) => {
  const { setOrder } = useContext(CoffeeContext)
  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Typography sx={{ flexBasis: '66.666667%', display: 'flex' }} level="h3">
        {title}
      </Typography>
      <Select
        sx={{ flexBasis: '33.333333', display: 'flex', flexGrow: '1' }}
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
    </Box>
  )
}
