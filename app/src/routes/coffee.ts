import { type Request, type Response, Router } from 'express'
import {
  findAllCoffees,
  findExternalCoffees,
  insertCoffee,
} from '../service/coffee.js'

export const router = Router()

router.get('/', async (_, response: Response) => {
  return response.json(await findAllCoffees())
})

router.post('/', async (req: Request, response: Response) => {
  return response.json(
    await insertCoffee(req.body['title'], req.body['ingredients']),
  )
})

router.get('/external', async (_, response: Response) =>
  response.json(await findExternalCoffees()),
)
