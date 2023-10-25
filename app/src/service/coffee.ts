import { Coffee } from '../model/coffee'
import { findAll, insert } from '../repository/coffee'

export const findAllCoffees = async (): Promise<Coffee[]> => {
  return await findAll()
}

export const insertCoffee = async (title: string): Promise<Coffee> => {
  return await insert(title)
}

