import { useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { ViewCoffees } from './shared/ViewCoffees'

export const ExternalCoffeesSelector = () => {
  const { externalCoffees } = useContext(CoffeeContext)
  return (
    <ViewCoffees
      title="Or choose a coffee from our external system"
      coffees={externalCoffees}
    />
  )
}
