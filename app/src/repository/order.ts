import { UUID, randomUUID } from 'crypto'
import { Coffee, Order } from '../__generated__/graphql.js'
import { pool } from '../infra/pool.js'

export const insertQuery = (
  orderId: UUID,
  coffee: Coffee,
  additionalIngredients: string[] = [],
): string =>
  `INSERT INTO coffee_order (id, title, ingredients, additional_ingredients) VALUES ('${orderId}', '${
    coffee.title
  }', '{${
    coffee.ingredients ? coffee.ingredients.join(',') : ''
  }}', '{${additionalIngredients.join(',')}}')`

const selectQuery = (uid: UUID) =>
  `SELECT * FROM coffee_order WHERE id = '${uid}'`

export const insert = async (
  coffee: Coffee,
  additionalIngredients: string[] = [],
): Promise<Order> => {
  try {
    const uid = randomUUID()
    const insertStatement = insertQuery(uid, coffee, additionalIngredients)
    await pool.query(insertStatement)
    const result = await pool.query(selectQuery(uid))
    const raw = result.rows[0]
    return {
      id: raw.id,
      coffee: {
        title: raw.title,
        ingredients: raw.ingredients,
      },
      additionalIngredients: raw.additional_ingredients,
    }
  } catch (e) {
    /// do something
    console.error(e)
    throw Error('Error while inserting a new order')
  }
}
