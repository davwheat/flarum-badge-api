import type { Extension } from '../extension'

import * as express from 'express'

import getExtensionData from '../getExtensionData'
import respondWithUrlContents from '../respondWithUrlContents'
import createBadgeUrl from '../createBadgeUrl'
import respondWithError from '../respondWithError'
import countOccurrences from '../countOccurrences'

export function SetUpEndpoints(app: express.Express) {
  app.get('/v1/compat-latest', async (req, res) => {
    respondWithError(res, 400, `Invalid syntax. Please see the documentation at: ${process.env.BASE_URL}/v1`)
  })

  app.get('/v1/compat-latest/*', async (req, res) => {
    const packageName = req.params[0]

    if (countOccurrences(packageName, '/') > 1) {
      respondWithError(res, 400, `'packageName' must only contain one forward slash (/). Please see the documentation at: ${process.env.BASE_URL}/v1`)
      return
    } else if (countOccurrences(packageName, '/') < 1) {
      respondWithError(res, 400, `'packageName' must contain a forward slash (/). Please see the documentation at: ${process.env.BASE_URL}/v1`)
      return
    } else if (packageName.toLowerCase() === 'flarum/core') {
      // 🥚 Easter egg 🥚
      const URL = createBadgeUrl('Supports latest Flarum', 'This is literally core...', { colorB: 'lightgrey' })
      respondWithUrlContents(res, URL)
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

    const URL = createBadgeUrl('Supports latest Flarum', extData.attributes['compatible-with-latest-flarum'] ? 'Yes' : 'No', {
      colorB: extData.attributes['compatible-with-latest-flarum'] ? 'success' : '#f00',
    })

    res.setHeader('X-Ext-Data-Cached', rawExtData.wasCached ? 'yes' : 'no')

    respondWithUrlContents(res, URL)
  })
}
