import { UUID, randomUUID } from 'crypto'
import { Order, OrderInput } from '../__generated__/graphql.js'
import { pool } from '../infra/pool.js'
import { nonNullable } from '../util/object.js'

export const insertQuery = (
  orderId: UUID,
  title: string,
  ingredients: string[],
  additionalIngredients: string[] = [],
): string =>
  `INSERT INTO coffee_order (id, title, ingredients, additional_ingredients) VALUES ('${orderId}', '${title}', '{${ingredients.join(
    ',',
  )}}', '{${additionalIngredients.join(',')}}')`

const selectQuery = (uid: UUID) =>
  `SELECT * FROM coffee_order WHERE id = '${uid}'`

export const insert = async ({
  title,
  ingredients,
  additionalIngredients,
}: OrderInput): Promise<Order> => {
  try {
    const uid = randomUUID()
    const insertStatement = insertQuery(
      uid,
      title,
      ingredients,
      additionalIngredients?.filter(nonNullable),
    )
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
