import { Pool } from 'node-postgres'

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = Number(process.env.DB_PORT)
const database = process.env.DB_NAME

export const pool = new Pool({
  user,
  host,
  database,
  password,
  port,
})
