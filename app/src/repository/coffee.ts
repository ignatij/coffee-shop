import { UUID, randomUUID } from 'crypto'
import { pool } from '../infra/pool'
import { Coffee } from '../model/coffee'

export const findAllQuery = 'select * from coffee'

export const insertQuery = (
  id: UUID,
  title: string,
  ingredients: string[] = [],
): string =>
  `INSERT INTO coffee (id, title, ingredients) VALUES ('${id}', '${title}', '{${ingredients.join(
    ',',
  )}}')`

export const checkIfThereAreCoffeesQuery = 'select true from coffee limit 1'

export const findAll = async (): Promise<Coffee[]> => {
  try {
    const results = await pool.query(findAllQuery)
    return results.rows
  } catch (e) {
    console.error(e)
    throw Error('Error while fetching coffees from database')
    // this should be in a middleware, check how it's done
    // res.status(500).send('Internal Server Error')
  }
}

export const insert = async (
  title: string,
  ingredients?: string[],
): Promise<Coffee> => {
  try {
    const uid = randomUUID()
    const insertStatement = insertQuery(uid, title, ingredients)
    const result = await pool.query(insertStatement)
    return result.rows[0]
  } catch (e) {
    /// do somethinh
    console.error(e)
    throw Error('Error while inserting a new coffee')
  }
}

export const isEmpty = async (): Promise<boolean> => {
  const result = await pool.query(checkIfThereAreCoffeesQuery)
  return result.rowCount === 0
}
