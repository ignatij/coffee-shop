import type { Order, Resolvers } from '../__generated__/graphql.js'
import * as coffeeService from '../service/coffee.js'
import * as orderService from '../service/order.js'
import { nonNullable } from '../util/object.js'

export const resolvers: Resolvers = {
  Query: {
    coffees: () => coffeeService.findAllCoffees(),
    externalCoffees: () => coffeeService.findExternalCoffees(),
  },
  Mutation: {
    addOrder: (_, { coffee, additionalIngredients }): Promise<Order> => {
      return orderService.addOrder(
        coffee,
        additionalIngredients?.filter(nonNullable),
      )
    },
  },
}
