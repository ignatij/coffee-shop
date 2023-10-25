import { Request, Response, Router } from 'express'
import { findAllCoffees, insertCoffee } from '../service/coffee'

export const router = Router()

router.get('/', async (_, response: Response) => {
  return response.json(await findAllCoffees())
})

router.post('/', async (req: Request, response: Response) => {
  return response.json(await insertCoffee(req.body['title']))
})