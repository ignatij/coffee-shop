import { Order, OrderInput } from '../__generated__/graphql.js'
import * as orderRepository from '../repository/order.js'

export const addOrder = async (order: OrderInput): Promise<Order> => {
  const newOrder = await orderRepository.insert(order)
  return newOrder
}
