import express from 'express'
import fs from 'fs'
import path from 'path'
import compression from 'compression'
import morgan from 'morgan'
import dotenv from 'dotenv'

import * as v1 from './v1'

// load env data from .env
dotenv.config({
  path: '../.env',
})

const README_TEXT = fs
  .readFileSync('./readme.txt')
  .toString()
  .replace(/%%BASE_URL%%/g, process.env.BASE_URL || '(PLEASE SET BASE_URL)')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Max-Age', '86400')
  // Cache for 15 mins
  // Serve old version on an error for up to 6 hrs
  // Serve old version while revalidating for up to 2 mins
  res.header('Cache-Control', `public, max-age=${60 * 15}, stale-if-error=${60 * 60 * 6}, stale-while-revalidate=${60 * 2}`)
  next()
})

// Add ETag caching
app.set('etag', 'weak')
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Add gzip compression
app.use(compression())

app.use(morgan('dev'))

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.send(README_TEXT)
})

app.get('/favicon.ico', async (req, res) => {
  res.sendFile('assets/favicon.ico', { root: path.resolve(__dirname, '..') })
})

v1.SetUpEndpoints(app)

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
