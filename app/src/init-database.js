import pkg from 'pg'

import dotenv from 'dotenv'
dotenv.config()

const { Client } = pkg

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = Number(process.env.DB_PORT)
const database = process.env.DB_NAME

const pgClient = new Client({
  host,
  user,
  database: 'postgres',
  password,
  port,
})
const dbClient = new Client({
  host,
  user,
  database,
  password,
  port,
})

const createDatabase = async () => {
  try {
    await pgClient.connect()
    await pgClient.query(`DROP DATABASE IF EXISTS ${database} WITH (FORCE)`)
    await pgClient.query(`CREATE DATABASE ${database}`)

    await dbClient.connect()
    await dbClient.query(
      `CREATE TABLE coffee (id UUID NOT NULL, title TEXT NOT NULL, ingredients TEXT[] DEFAULT '{}')`,
    )
    await dbClient.query(
      `CREATE TABLE coffee_order (id UUID NOT NULL, title TEXT NOT NULL, ingredients TEXT[] DEFAULT '{}', additional_ingredients TEXT[] DEFAULT '{}')`,
    )
    return true
  } catch (e) {
    console.error(e)
    return false
  } finally {
    await pgClient.end()
    await dbClient.end()
  }
}

createDatabase().then(result => {
  if (result) {
    console.log('DB ready')
  }
})
