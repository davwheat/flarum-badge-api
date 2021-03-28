import type { Extension } from '../extension'

import * as express from 'express'

import getExtensionData from '../getExtensionData'
import createBadgeUrl from '../createBadgeUrl'
import respondWithError from '../respondWithError'
import countOccurrences from '../countOccurrences'

export function SetUpEndpoints(app: express.Express) {
  app.get('/v1/compat-latest', async (req, res) => {
    respondWithError(res, 400, `Invalid syntax. Please see the documentation at: ${process.env.BASE_URL}/v1`)
  })

  /**
   * @api {get} /v1/compat-latest/:packageName Supports latest Flarum core version
   *
   * @apiName CompatLatest
   * @apiDescription
   *   Fetches a badge that shows whether the provided extension is compatible with the latest version of `flarum/core`.
   *
   *   Uses the information provided by the [Extiverse](https://extiverse.com/) API, kindly hosted free-of-charge by [Daniël Klabbers (luceos)](https://github.com/luceos).
   *
   * @apiGroup Badges
   * @apiVersion 1.0.0
   *
   * @apiParam (URL parameters) {string} packageName The extension's package name.
   *
   * @apiParamExample {string} packageName
   *   "fof/formatting"
   *
   * @apiSuccessExample {svg} Support
   *   <svg
   *     xmlns="http://www.w3.org/2000/svg"
   *     xmlns:xlink="http://www.w3.org/1999/xlink" width="183" height="20" role="img" aria-label="Supports latest Flarum: Yes">
   *     <title>Supports latest Flarum: Yes</title>
   *     <!-- ... -->
   *   </svg>
   *
   * @apiSuccessExample {svg} No support
   *   <svg
   *     xmlns="http://www.w3.org/2000/svg"
   *     xmlns:xlink="http://www.w3.org/1999/xlink" width="183" height="20" role="img" aria-label="Supports latest Flarum: No">
   *     <title>Supports latest Flarum: No</title>
   *     <!-- ... -->
   *   </svg>
   *
   * @apiErrorExample {text} 404 Not Found
   *   Not found
   *
   *   No results found for "flarum/nuke-discourse". Make sure this matches your composer.json's name field.
   *
   * @apiErrorExample {text} 500 Upstream Extiverse API error
   *   Unknown upstream API error
   *
   *   An unknown error occurred with the upstream API used to fetch extension data. Please try again later, or contact @MrJeeves#6969 on Discord.
   *
   * @apiSampleRequest v1/compat-latest/fof/formatting
   */
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
      res.redirect(URL)
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

    res.redirect(URL)
  })
}
