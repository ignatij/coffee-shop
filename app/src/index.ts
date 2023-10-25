import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { pool } from './infra/pool'
import { randomUUID } from 'crypto'

const app: Express = express()
const port = process.env.PORT

app.get('/', async (req: Request, res: Response) => {
  try {
    const results = await pool.query('select * from coffee')
    res.json(results.rows)
  } catch (e) {
    console.error(e)
    // this should be in a middleware, check how it's done
    res.status(500).send('Internal Server Error')
  }
})

app.post('/create', async (req, res) => {
  try {
    const uid = randomUUID()
    const insertStatement = `INSERT INTO coffee (id, title) VALUES ('${uid}', 'testing2')`
    await pool.query(insertStatement)
    res.status(200).send('Successfully created coffee')
  } catch (e) {
    /// do somethinh
    console.error(e)
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
