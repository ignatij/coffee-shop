import axios from 'axios'
import { Coffee } from '../model/coffee'
import { findAll, insert } from '../repository/coffee'

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
    return coffees.map(({ title, ingredients }: any) => ({
      title,
      ingredients,
    }))
  } catch (e) {
    console.error(e)
    throw new Error('Error while fetching external coffees')
  }
}
