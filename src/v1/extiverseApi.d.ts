import { XOR } from 'ts-essentials'
import type { Extension } from './extension'

interface Metadata {
  page: {
    current_page: number
    per_page: number
    from: null | number
    to: null | number
    total: number
    last_page: number
  }
}

interface Links {
  first: string
  last: string
}

interface ApiError {
  status: string
  title: string
  detail: string
}

interface ErrorResponseRaw {
  errors: ApiError[]
}

interface ExtQueryResponseRaw {
  data: Extension
}

interface GetExtensionResponseRaw {
  data: Extension
}

export type GetExtensionResponse = XOR<GetExtensionResponseRaw, ErrorResponseRaw>
export type ExtQueryResponse = XOR<ExtQueryResponseRaw, ErrorResponseRaw>
