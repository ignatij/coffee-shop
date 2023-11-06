import { PropsWithChildren, useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { Coffee } from './coffee'
import { ViewCoffees } from './shared/ViewCoffees'

export const PredefinedCoffeesSelector = ({
  value,
  setValue,
  resetFn,
}: PropsWithChildren<{
  value: Coffee | null | undefined
  setValue: (c: Coffee) => void
  resetFn: (c: Coffee | null) => void
}>) => {
  const { coffees } = useContext(CoffeeContext)
  return (
    <ViewCoffees
      title="Please choose a predefined coffee from our system"
      coffees={coffees}
      value={value}
      setValue={setValue}
      resetFn={resetFn}
    />
  )
}
