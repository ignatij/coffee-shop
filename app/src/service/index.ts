import * as coffeeService from './coffee'

export const resolvers = {
  Query: {
    coffees: () => coffeeService.findAllCoffees(),
    externalCoffees: () => coffeeService.findExternalCoffees(),
  },
}
