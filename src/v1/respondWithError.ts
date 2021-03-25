import type * as express from 'express'

/**
 * Helper to respond with an error in Express.
 *
 * Displays the error to the user and sets the status code.
 *
 * @param res Express response
 * @param statusCode Status code
 * @param err Error text
 */
export default function respondWithError(res: express.Response, statusCode: number, err: string) {
  res.setHeader('Content-Type', 'text/plain')
  res.status(statusCode)
  res.send(err)
}
