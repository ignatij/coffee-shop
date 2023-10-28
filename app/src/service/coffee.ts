import axios from 'axios'
import type { Coffee } from '../model/coffee.js'
import { findAll, insert } from '../repository/coffee.js'

export const findAllCoffees = async (): Promise<Coffee[]> => {
  return await findAll()
}

export const insertCoffee = async (
  title: string,
  ingredients?: string[],
): Promise<Coffee> => {
  return await insert(title, ingredients)
}

export const findExternalCoffees = async (): Promise<Coffee[]> => {
  const externalUrl =
    process.env.EXTERNAL_API_URL ?? 'https://api.sampleapis.com/coffee/hot'
  try {
    const response = await axios.get(externalUrl)
    const coffees = response.data
    return coffees.map(({ id, title, ingredients }: any) => ({
      id,
      title,
      ingredients,
    }))
  } catch (e) {
    console.error(e)
    throw new Error('Error while fetching external coffees')
  }
}
