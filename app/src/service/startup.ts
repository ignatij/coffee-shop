import { isEmpty } from '../repository/coffee'
import { findExternalCoffees, insertCoffee } from './coffee'

const coffesFs = [
  {
    title: 'Black',
    description:
      'Black coffee is as simple as it gets with ground coffee beans steeped in hot water, served warm. And if you want to sound fancy, you can call black coffee by its proper name: cafe noir.',
    ingredients: ['Coffee'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/640px-A_small_cup_of_coffee.JPG',
    id: 1,
  },
  {
    title: 'Latte',
    description:
      'As the most popular coffee drink out there, the latte is comprised of a shot of espresso and steamed milk with just a touch of foam. It can be ordered plain or with a flavor shot of anything from vanilla to pumpkin spice.',
    ingredients: ['Espresso', 'Steamed Milk'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Latte_at_Doppio_Ristretto_Chiang_Mai_01.jpg/509px-Latte_at_Doppio_Ristretto_Chiang_Mai_01.jpg',
    id: 2,
  },
  {
    title: 'Cappuccino',
    description:
      'Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top. Sometimes you can find variations that use cream instead of milk or ones that throw in flavor shot, as well.',
    ingredients: ['Espresso', 'Steamed Milk', 'Foam'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/e/ed/Wet_Cappuccino_with_heart_latte_art.jpg',
    id: 3,
  },
  {
    title: 'Americano',
    description:
      'With a similar flavor to black coffee, the americano consists of an espresso shot diluted in hot water.',
    ingredients: ['Espresso', 'Hot Water'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg/1280px-Hokitika_Cheese_and_Deli%2C_Hokitika_%283526706594%29.jpg',
    id: 4,
  },
  {
    title: 'Espresso',
    description:
      'An espresso shot can be served solo or used as the foundation of most coffee drinks, like lattes and macchiatos.',
    ingredients: ['1oz Espresso'],
    image:
      'https://upload.wikimedia.org/wikipedia/commons/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg',
    id: 5,
  },
]

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
