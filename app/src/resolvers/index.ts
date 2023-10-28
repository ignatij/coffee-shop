import * as coffeeService from '../service/coffee.js'
import type { Resolvers } from '../__generated__/graphql.js';

export const resolvers: Resolvers = {
  Query: {
    coffees: () => coffeeService.findAllCoffees(),
    externalCoffees: () => coffeeService.findExternalCoffees(),
  },
}
