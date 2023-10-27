import express, { Express } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { router as coffeesRouter } from './routes/coffee'
import { initCoffees } from './service/startup'
import { typeDefs } from './model'
import { resolvers } from './service'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const app: Express = express()
const port = Number(process.env.PORT)

app.use(express.json())
app.use(cors())
app.use('/coffee', coffeesRouter)

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  })
  console.log(`🚀  Server ready at: ${url}`)
  if (process.env.INIT_COFFEE_DB) {
    await initCoffees()
    console.log('Coffees initialized...')
  }
}

startServer()
