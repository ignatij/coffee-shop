import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { resolvers } from './resolvers/index.js'
import { initCoffees } from './service/startup.js'
dotenv.config()

const port = Number(process.env.PORT)


const typeDefs = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)) + '/schema.graphql'),
  {
    encoding: 'utf-8',
  },
)

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
