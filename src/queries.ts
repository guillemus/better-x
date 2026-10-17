import { people, viewer } from './data/people'
import { following, forYou, type PostSeed } from './data/posts'
import { headlines, suggestions, trends } from './data/sidebar'
import type { BadgeCounts, NewsStory, Person, Post, Timeline, Trend } from './types'

const random = (min: number, max: number) => Math.round(min + Math.random() * (max - min))

const shuffle = <T>(items: T[]) => [...items].sort(() => Math.random() - 0.5)

const sample = <T>(items: T[], count: number) => shuffle(items).slice(0, count)

const sleep = (min: number, max: number) => new Promise((resolve) => setTimeout(resolve, random(min, max)))

function age(minutes: number) {
  if (minutes < 60) return `${minutes}m`
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h`
  return `${Math.floor(minutes / 1440)}d`
}

function engagement(reach: number) {
  const views = Math.round(random(800, 60_000) * reach)
  return {
    views,
    replies: Math.round(views * random(1, 5) * 0.001),
    reposts: Math.round(views * random(1, 4) * 0.001),
    likes: Math.round(views * random(10, 40) * 0.001),
  }
}

function toPost(seed: PostSeed, id: string): Post {
  return {
    id,
    author: people[seed.by],
    age: seed.ad ? undefined : age(Math.max(1, seed.minutesAgo + random(-5, 5))),
    ad: seed.ad,
    text: seed.text,
    media: seed.media,
    quote: seed.quote && {
      author: people[seed.quote.by],
      age: age(seed.quote.minutesAgo),
      text: seed.quote.text,
      media: seed.quote.media,
    },
    counts: engagement(seed.ad ? 3 : 1),
  }
}

export async function getViewer(): Promise<Person> {
  await sleep(50, 160)
  return viewer
}

export async function getBadgeCounts(): Promise<BadgeCounts> {
  await sleep(120, 260)
  return {
    notifications: Math.random() < 0.7 ? random(1, 12) : 0,
    messages: random(0, 3),
  }
}

export async function getNews(): Promise<NewsStory[]> {
  await sleep(140, 320)
  return sample(headlines, 3).map((headline) => ({
    ...headline,
    age: `${random(1, 23)} hours ago`,
    posts: random(200, 15_000),
    faces: sample(Object.values(people), 3),
  }))
}

export async function getTrends(): Promise<Trend[]> {
  await sleep(280, 650)
  return sample(trends, 4).map((trend) => ({
    ...trend,
    posts: Math.random() < 0.5 ? random(1_200, 90_000) : undefined,
  }))
}

export async function getWhoToFollow(): Promise<Person[]> {
  await sleep(350, 800)
  return sample(suggestions, 3).map((key) => people[key])
}

export async function getForYou(): Promise<Timeline> {
  await sleep(420, 1100)
  const [pinned, ad, ...rest] = forYou
  return {
    newPosts: random(12, 90),
    posts: [pinned, ad, ...shuffle(rest)].map((seed, i) => toPost(seed, `for-you-${i}`)),
  }
}

export async function getFollowing(): Promise<Timeline> {
  await sleep(600, 1500)
  return {
    newPosts: random(3, 30),
    posts: following.map((seed, i) => toPost(seed, `following-${i}`)),
  }
}
