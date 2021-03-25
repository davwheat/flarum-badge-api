import * as express from 'express'

import getExtensionData, { ExtensionDataCache } from '../getExtensionData'
import respondWithUrlContents from '../respondWithUrlContents'
import createBadgeUrl from '../createBadgeUrl'
import respondWithError from '../respondWithError'
import countOccurrences from '../countOccurrences'

export function SetUpEndpoints(app: express.Express) {
  app.get('/v1/super-secret-clear-cache/*', async (req, res) => {
    // Don't cache this endpoint!
    res.header('Cache-Control', `no-store, max-age=0`)

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

    if (ExtensionDataCache.has(packageName)) {
      ExtensionDataCache.del(packageName)
      respondWithError(
        res,
        202,
        `The cached data for '${packageName}' was flushed. CDN-based caching may remain for a while longer, so please be patient. Don't spam this endpoint or I'll just remove it. :)`,
      )
      return
    } else {
      respondWithError(res, 200, `Extension data for '${packageName}' was not present in the cache.`)
      return
    }
  })
}
