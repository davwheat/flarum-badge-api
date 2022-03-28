import type { ExtQueryResponse } from './extiverseApi'
import type { Extension } from './extension'
import type { XOR } from 'ts-essentials'

import querystring from 'querystring'
import fetch from 'node-fetch'
import NodeCache from 'node-cache'

const ExtensionDataCache = new NodeCache({
  stdTTL: 60 * 60, // 1 hour
  checkperiod: 5 * 60, // 5 mins
  useClones: true,
  deleteOnExpire: true,
})

type ReturnVal = XOR<
  {
    error: {
      status: string
      title: string
      detail: string
    }
  },
  {
    data?: Extension
    wasCached?: boolean
  }
>

export default async function getExtensionData(packageName: string): Promise<ReturnVal> {
  // Pull from cache
  if (ExtensionDataCache.has(packageName)) {
    console.log(`${packageName} is in cache`)
    return {
      data: ExtensionDataCache.get(packageName) as Extension,
      wasCached: true,
    }
  }

  const query = querystring.stringify({
    'filter[q]': packageName,
  })

  const URL = `https://extiverse.com/api/v1/extensions/${encodeURIComponent(packageName.replace('/', '$'))}`

  const response = await fetch(URL, {
    headers: {
      Authorization: `Bearer ${process.env.EXTIVERSE_TOKEN}`,
    },
  })

  if (response.ok) {
    const data = (await response.json()) as ExtQueryResponse

    if (data.errors) {
      return { error: data.errors[0] }
    }

    // No upstream API errors!
    ExtensionDataCache.set(packageName, data.data as Extension)

    return {
      data: data.data as Extension,
      wasCached: false,
    }
  } else if (response.status === 404) {
    return {
      error: {
        status: '404',
        title: 'Not found',
        detail: `No results found for "${packageName}". Make sure this matches your composer.json's name field.`,
      },
    }
  } else {
    return {
      error: {
        status: '500',
        title: `Unknown upstream API error (${response.status})`,
        detail: 'An unknown error occurred with the upstream API used to fetch extension data. Please try again later, or contact @MrJeeves#1234 on Discord.',
      },
    }
  }
}

export { ExtensionDataCache }
