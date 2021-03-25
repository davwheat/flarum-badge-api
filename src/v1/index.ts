import * as express from 'express'
import fs from 'fs'

import * as compatLatest from './compat-latest'
import * as clearCache from './super-secret-clear-cache'

const README_TEXT = fs
  .readFileSync('./readme.txt')
  .toString()
  .replace('%%BASE_URL%%', process.env.BASE_URL || '(PLEASE SET BASE_URL)')

export function SetUpEndpoints(app: express.Express) {
  app.get('/v1', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send(README_TEXT)
  })

  compatLatest.SetUpEndpoints(app)
  clearCache.SetUpEndpoints(app)
}
