'use strict'
const express = require('express')
const dotenv = require('dotenv')
const { createReadStream } = require('fs')
const path = require('path')
dotenv.config()
const app = express()
const port = process.env.PORT

app.get('/', (_, res) => {
  res.setHeader('Content-Type', 'application/json')
  const source = createReadStream(
    path.resolve(__dirname + '/' + 'coffees.json'),
  )
  source.on('open', () => {
    source.pipe(res)
  })
  source.on('error', err => {
    console.error(err)
    throw new Error('Error happened in the external API!')
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
