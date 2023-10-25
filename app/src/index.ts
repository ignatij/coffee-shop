import express, { Express } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { router as coffeesRouter } from './routes/coffee'
import { initCoffees } from './service/startup'
import cors from 'cors'

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/coffee', coffeesRouter)


app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  if (process.env.INIT_COFFEE_DB) {
    await initCoffees()
    console.log('Coffees initialized...')
  }
})
