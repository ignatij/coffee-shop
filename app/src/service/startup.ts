import { isEmpty } from '../repository/coffee.js'
import { findExternalCoffees, insertCoffee } from './coffee.js'

export const initCoffees = async () => {
  const isTableEmpty = await isEmpty()
  if (isTableEmpty) {
    const coffees = await findExternalCoffees()
    coffees.slice(0, 5).forEach(async ({ title, ingredients }) => {
      await insertCoffee(title, ingredients)
    })
  } else {
    console.log('Coffees already present. Skipping...')
  }
}
