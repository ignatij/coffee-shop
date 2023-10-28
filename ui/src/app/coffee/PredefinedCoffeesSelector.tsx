import { useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'
import { ViewCoffees } from './shared/ViewCoffees'

export const PredefinedCoffeesSelector = () => {
  const { coffees } = useContext(CoffeeContext)
  return (
    <ViewCoffees
      title="Please choose a predefined coffee from our system"
      coffees={coffees}
    />
  )
}
