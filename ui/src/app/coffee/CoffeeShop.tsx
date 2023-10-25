import { CoffeeManager } from './CoffeeManager'
import { ExternalCoffeesSelector } from './ExternalCoffeesSelector'
import { PredefinedCoffeesSelector } from './PredefinedCoffeesSelector'
import { PreviewCoffeeOrder } from './PreviewCoffeeOrder'

export const CoffeeShop = () => {
  return (
    <CoffeeManager>
      <PredefinedCoffeesSelector />
      <ExternalCoffeesSelector />
      <PreviewCoffeeOrder />
    </CoffeeManager>
  )
}
