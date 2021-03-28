import type { Extension } from '../extension'

import * as express from 'express'

import getExtensionData from '../getExtensionData'
import respondWithError from '../respondWithError'
import countOccurrences from '../countOccurrences'

export function SetUpEndpoints(app: express.Express) {
  app.get('/v1/ext-icon', async (req, res) => {
    respondWithError(res, 400, `Invalid syntax. Please see the documentation at: ${process.env.BASE_URL}/v1`)
  })

  app.get('/v1/ext-icon/*', async (req, res) => {
    const packageName = req.params[0]

    if (countOccurrences(packageName, '/') > 1) {
      respondWithError(res, 400, `'packageName' must only contain one forward slash (/). Please see the documentation at: ${process.env.BASE_URL}/v1`)
      return
    } else if (countOccurrences(packageName, '/') < 1) {
      respondWithError(res, 400, `'packageName' must contain a forward slash (/). Please see the documentation at: ${process.env.BASE_URL}/v1`)
      return
    }

    const rawExtData = await getExtensionData(packageName)

    // Some form of error fetching the extension data
    if (rawExtData.error) {
      const statusCode = Number.parseInt(rawExtData.error.status) || 500

      respondWithError(res, statusCode, rawExtData.error.title + '\n\n' + rawExtData.error.detail)
      return
    }

    // We know this won't be undefined
    const extData = rawExtData.data as Extension

    const URL = extData.attributes['icon-url']

    console.log(URL)

    res.setHeader('X-Ext-Data-Cached', rawExtData.wasCached ? 'yes' : 'no')

    res.redirect(URL)
  })
}
