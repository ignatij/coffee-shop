import type { Order, Resolvers } from '../__generated__/graphql.js'
import * as coffeeService from '../service/coffee.js'
import * as orderService from '../service/order.js'

export const resolvers: Resolvers = {
  Query: {
    coffees: () => coffeeService.findAllCoffees(),
    externalCoffees: () => coffeeService.findExternalCoffees(),
  },
  Mutation: {
    addOrder: (_, { order }): Promise<Order> => {
      return orderService.addOrder(order)
    },
  },
}
