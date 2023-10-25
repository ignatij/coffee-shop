import { CoffeeManager } from './CoffeeManager'
import { PredefinedCoffees } from './PredefinedCoffees'

export const CoffeeShop = () => {
  return (
    <CoffeeManager>
      <PredefinedCoffees />
    </CoffeeManager>
  )
}
