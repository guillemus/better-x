import { people, viewer } from './data/people'
import { following, forYou, type PostSeed } from './data/posts'
import { headlines, suggestions, trends } from './data/sidebar'
import type { BadgeCounts, NewsStory, Person, Post, Timeline, Trend } from './types'

const random = (min: number, max: number) => Math.round(min + Math.random() * (max - min))

const sleep = (min: number, max: number) => new Promise((resolve) => setTimeout(resolve, random(min, max)))

function age(minutes: number) {
  if (minutes < 60) return `${minutes}m`
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h`
  return `${Math.floor(minutes / 1440)}d`
}

function engagement(seed: number, reach: number) {
  const views = (1_200 + ((seed * 7_919) % 48_000)) * reach
  return {
    views,
    replies: Math.round(views * 0.003),
    reposts: Math.round(views * 0.002),
    likes: Math.round(views * 0.025),
  }
}

function toPost(seed: PostSeed, i: number, id: string): Post {
  return {
    id,
    author: people[seed.by],
    age: seed.ad ? undefined : age(Math.max(1, seed.minutesAgo)),
    ad: seed.ad,
    text: seed.text,
    media: seed.media,
    quote: seed.quote && {
      author: people[seed.quote.by],
      age: age(seed.quote.minutesAgo),
      text: seed.quote.text,
      media: seed.quote.media,
    },
    counts: engagement(i + 1, seed.ad ? 3 : 1),
  }
}

export async function getViewer(): Promise<Person> {
  await sleep(50, 160)
  return viewer
}

export async function getBadgeCounts(): Promise<BadgeCounts> {
  await sleep(120, 260)
  return {
    notifications: 10,
    messages: 2,
  }
}

export async function getNews(): Promise<NewsStory[]> {
  await sleep(140, 320)
  return headlines.slice(0, 3).map((headline, i) => ({
    ...headline,
    age: `${2 + i * 5} hours ago`,
    posts: [12_400, 3_800, 920][i],
    faces: Object.values(people).slice(i * 3, i * 3 + 3),
  }))
}

export async function getTrends(): Promise<Trend[]> {
  await sleep(280, 650)
  return trends.slice(0, 4).map((trend, i) => ({
    ...trend,
    posts: [48_200, undefined, 6_100, undefined][i],
  }))
}

export async function getWhoToFollow(): Promise<Person[]> {
  await sleep(350, 800)
  return suggestions.slice(0, 3).map((key) => people[key])
}

export async function getForYou(): Promise<Timeline> {
  await sleep(420, 1100)
  return {
    newPosts: 42,
    posts: forYou.map((seed, i) => toPost(seed, i, `for-you-${i}`)),
  }
}

export async function getFollowing(): Promise<Timeline> {
  await sleep(600, 1500)
  return {
    newPosts: 7,
    posts: following.map((seed, i) => toPost(seed, i, `following-${i}`)),
  }
}

export function startHomeQueries() {
  return {
    viewer: getViewer(),
    counts: getBadgeCounts(),
    news: getNews(),
    trends: getTrends(),
    whoToFollow: getWhoToFollow(),
    forYou: getForYou(),
  }
}

export type HomeQueries = ReturnType<typeof startHomeQueries>
