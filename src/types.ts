export type Verified = 'blue' | 'gold'

export type Person = {
  name: string
  handle: string
  hue: number
  verified?: Verified
  org?: boolean
}

export type Scene = 'mountains' | 'sunset' | 'aurora' | 'datacenter' | 'storm' | 'city' | 'night' | 'focaccia'

export type Media =
  | { kind: 'photo'; scene: Scene; caption?: string }
  | { kind: 'link'; domain: string; title: string }
  | { kind: 'benchmark' }
  | { kind: 'code' }
  | { kind: 'bundle' }
  | { kind: 'waterfall' }

export type Counts = {
  replies: number
  reposts: number
  likes: number
  views: number
}

export type Quote = {
  author: Person
  age: string
  text: string
  media?: Media
}

export type Post = {
  id: string
  author: Person
  age?: string
  ad?: boolean
  text: string
  media?: Media
  quote?: Quote
  counts: Counts
}

export type Timeline = {
  newPosts: number
  posts: Post[]
}

export type NewsStory = {
  title: string
  category: string
  age: string
  posts: number
  faces: Person[]
}

export type Trend = {
  context: string
  name: string
  posts?: number
}

export type BadgeCounts = {
  notifications: number
  messages: number
}
