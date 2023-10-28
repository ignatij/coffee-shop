import express, { Express } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { router as coffeesRouter } from './routes/coffee'
import { initCoffees } from './service/startup'
import { resolvers } from './resolvers'
import cors from 'cors'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { readFileSync } from 'fs'
import path from 'path'
import { Coffee } from './__generated__/graphql'

const app: Express = express()
const port = Number(process.env.PORT)

app.use(express.json())
app.use(cors())
app.use('/coffee', coffeesRouter)

const typeDefs = readFileSync(path.resolve(__dirname + '/schema.graphql'), {
  encoding: 'utf-8',
})

interface CoffeeContext {
  dataSources: {
    coffees: Coffee[]
    externalCoffees: Coffee[]
  }
}

const server = new ApolloServer<any>({
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
