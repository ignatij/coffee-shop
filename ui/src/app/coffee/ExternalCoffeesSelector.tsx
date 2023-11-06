import { PropsWithChildren, useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { Coffee } from './coffee'
import { ViewCoffees } from './shared/ViewCoffees'

export const ExternalCoffeesSelector = ({
  value,
  setValue,
  resetFn,
}: PropsWithChildren<{
  value: Coffee | undefined | null
  setValue: (c: Coffee | undefined) => void
  resetFn: (c: Coffee | null) => void
}>) => {
  const { externalCoffees } = useContext(CoffeeContext)
  return (
    <ViewCoffees
      value={value}
      setValue={setValue}
      resetFn={resetFn}
      title="Or choose a coffee from our external system"
      coffees={externalCoffees}
    />
  )
}
