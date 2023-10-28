import * as coffeeService from '../service/coffee'
import { Resolvers } from '../__generated__/graphql';

export const resolvers: Resolvers = {
  Query: {
    coffees: () => coffeeService.findAllCoffees(),
    externalCoffees: () => coffeeService.findExternalCoffees(),
  },
}
