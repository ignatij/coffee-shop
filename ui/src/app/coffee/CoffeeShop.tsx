import { CoffeeManager } from './CoffeeManager'
import { DecorateCoffeeSelector } from './DecorateCoffeeSelector'
import { ExternalCoffeesSelector } from './ExternalCoffeesSelector'
import { PredefinedCoffeesSelector } from './PredefinedCoffeesSelector'
import { PreviewCoffeeOrder } from './PreviewCoffeeOrder'

export const CoffeeShop = () => {
  return (
    <CoffeeManager>
      <PredefinedCoffeesSelector />
      <ExternalCoffeesSelector />
      <DecorateCoffeeSelector />
      <PreviewCoffeeOrder />
    </CoffeeManager>
  )
}
