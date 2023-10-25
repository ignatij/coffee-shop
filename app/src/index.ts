import express, { Express } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { router as coffeesRouter } from './routes/coffee'

const app: Express = express()
const port = process.env.PORT

app.use(express.json())
app.use('/coffee', coffeesRouter)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
