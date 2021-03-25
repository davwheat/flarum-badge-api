import querystring from 'querystring'

// MUST be b64 encoded :(
const SVG_LOGO_DATA_URI = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDIuMiAxNjcuMSI+PHBhdGggZmlsbD0iI2RjZGNkYyIgZD0iTTgxLjIgMTEydjU1bC02OC40LTQ0LjctMi44LTEuOC02LTRjLTEtLjYtMS45LTEuNS0yLjUtMi42eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zLjQgMEEzLjQgMy40IDAgMDAwIDMuNFYxMDlhOSA5IDAgMDA0IDcuNmw2IDMuOSAyLjggMS44cy0xMS40LTguNCAyLjQtOC40aDEyN1YweiIvPjwvc3ZnPg==`

interface CustomOptions {
  colorA?: string
  colorB?: string
}

export default function createBadgeUrl(leftMessage: string, rightMessage: string, opts?: CustomOptions) {
  const queryParams = querystring.stringify({
    label: leftMessage,
    message: rightMessage,
    // colorA: '#eee',
    // colorB: '#e7672e',
    colorA: (opts && opts.colorA) || '#e7672e',
    colorB: (opts && opts.colorB) || '#eee',
    logo: SVG_LOGO_DATA_URI,
    style: 'flat',
  })

  return `https://img.shields.io/static/v1?${queryParams}`
}
