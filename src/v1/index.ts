import * as express from 'express'
import fs from 'fs'

import * as compatLatest from './compat-latest'
import * as extIcon from './ext-icon'
import * as clearCache from './super-secret-clear-cache'

import ENV from '../env'

const README_TEXT = fs
  .readFileSync('./readme.txt')
  .toString()
  .replace(/%%BASE_URL%%/g, ENV.BASE_URL)

export function SetUpEndpoints(app: express.Express) {
  app.get('/v1', async (req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    res.send(README_TEXT)
  })

  compatLatest.SetUpEndpoints(app)
  extIcon.SetUpEndpoints(app)
  clearCache.SetUpEndpoints(app)
}
