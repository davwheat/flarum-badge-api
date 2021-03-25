import * as express from 'express'
import fetch from 'node-fetch'

/**
 * Fetches content at a specified URL and returns it as the response to a user
 *
 * @param res Express response
 * @param url URL to fetch and respond with
 */
export default async function respondWithUrlContents(res: express.Response, url: string): Promise<void> {
  const resp = await fetch(url)

  if (!resp.ok) {
    res.header('Content-Type', 'text/plain')
    res.status(500)
    res.send('Failed to load URL')
    return
  }

  const respCT = resp.headers.get('Content-Type')

  respCT && res.header('Content-Type', respCT)
  res.send(await resp.text())
}
