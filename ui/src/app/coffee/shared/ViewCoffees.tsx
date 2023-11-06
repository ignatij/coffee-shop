import { Box, Option, Select, Typography } from '@mui/joy'
import { PropsWithChildren, useContext } from 'react'
import { CoffeeContext } from '../CoffeeManager'
import { Coffee } from '../coffee'

export const ViewCoffees = ({
  coffees,
  title,
  value,
  setValue,
  resetFn,
}: PropsWithChildren<{
  coffees: Coffee[]
  title: string
  value: Coffee | null | undefined
  setValue: (c: Coffee) => void
  resetFn: (c: Coffee | null) => void
}>) => {
  const { setOrder } = useContext(CoffeeContext)
  return (
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Typography sx={{ flexBasis: '66.666667%', display: 'flex' }} level="h3">
        {title}
      </Typography>
      <Select
        sx={{ flexBasis: '33.333333', display: 'flex', flexGrow: '1' }}
        value={value}
        onChange={(_, c: Coffee | null) => {
          if (c) {
            setOrder(() => c)
            setValue(c)
            resetFn(null)
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
