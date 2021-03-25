interface Icon {
  name: string
  backgroundColor: string
  color: string
}

interface Attributes {
  name: string
  description: string
  license: string
  stars: number
  forks: number
  downloads: number
  dependents: number
  suggesters: number
  'support-email'?: any
  'support-issues'?: any
  'support-forum'?: any
  'support-wiki'?: any
  'support-irc'?: any
  'support-source'?: any
  'support-docs'?: any
  'abandoned-for'?: any
  vcs: string
  'created-at': Date
  'updated-at': Date
  'deleted-at'?: any
  'highest-version': string
  title: string
  icon: Icon
  'satis-vcs'?: any
  'is-premium': number
  'team-id'?: any
  blacklisted: number
  'icon-url': string
  'skip-icon-import': number
  'discuss-url'?: any
  'favorited-by-count': number
  'compatible-with-latest-flarum': boolean
  subscribed: boolean
  'subscribers-count': number
  'reviews-count': number
  'reviews-recommend-count': number
  'reviews-not-recommend-count': number
  'can-change-plan': boolean
  'can-blacklist': boolean
  'can-subscribe': boolean
  'is-locale': boolean
  locale?: any
}

interface Relationships {
  plans: any[]
  tags: any[]
  team: any[]
  repository: any[]
  versions: any[]
  reviews: any[]
}

interface Links {
  self: string
}

export interface Extension {
  type: string
  id: string
  attributes: Attributes
  relationships: Relationships
  links: Links
}
