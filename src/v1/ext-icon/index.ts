import type { Extension } from '../extension'

import * as express from 'express'

import getExtensionData from '../getExtensionData'
import respondWithError from '../respondWithError'
import countOccurrences from '../countOccurrences'

export function SetUpEndpoints(app: express.Express) {
  app.get('/v1/ext-icon', async (req, res) => {
    respondWithError(res, 400, `Invalid syntax. Please see the documentation at: ${process.env.BASE_URL}/v1`)
  })

  /**
   * @api {get} /v1/ext-icon/:packageName Get extension icon
   *
   * @apiName ExtIcon
   * @apiDescription
   *   Returns a specified extension's icon which would be shown on the Flarum admin dashboard.
   *
   *   Uses the information provided by the [Extiverse](https://extiverse.com/) API, kindly hosted free-of-charge by [Daniël Klabbers (luceos)](https://github.com/luceos).
   *
   * @apiGroup Extension info
   * @apiVersion 1.0.0
   *
   * @apiParam (URL parameters) {string} packageName The extension's package name.
   *
   * @apiParamExample {string} packageName
   *   "fof/formatting"
   *
   * @apiSuccessExample {text} Extension icon
   *   raw PNG data
   *
   * @apiErrorExample {text} 404 Not Found
   *   Not found
   *
   *   No results found for "flarum/nuke-discourse". Make sure this matches your composer.json's name field.
   *
   * @apiErrorExample {text} 500 Upstream Extiverse API error
   *   Unknown upstream API error
   *
   *   An unknown error occurred with the upstream API used to fetch extension data. Please try again later, or contact @MrJeeves#1234 on Discord.
   *
   * @apiSampleRequest /v1/ext-icon/fof/formatting
   */
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
