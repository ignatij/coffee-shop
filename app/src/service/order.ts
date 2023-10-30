import { Coffee, Order } from '../__generated__/graphql.js'
import * as orderRepository from '../repository/order.js'

export const addOrder = async (
  coffee: Coffee,
  additionalIngredients?: string[],
): Promise<Order> => {
  const order = await orderRepository.insert(coffee, additionalIngredients)
  return order
}
