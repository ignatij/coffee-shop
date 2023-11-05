import { useContext } from 'react'
import { CoffeeContext } from './CoffeeManager'

export const PlacedOrders = () => {
  const { placedOrder } = useContext(CoffeeContext)
  return (
    placedOrder && (
      <>
        <div>You have placed a new order with id {placedOrder}!</div>
      </>
    )
  )
}
