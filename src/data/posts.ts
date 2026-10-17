import type { Media } from '../types'
import type { PersonKey } from './people'

export type PostSeed = {
  by: PersonKey
  minutesAgo: number
  text: string
  ad?: boolean
  media?: Media
  quote?: Omit<PostSeed, 'quote' | 'ad'>
}

export const forYou: PostSeed[] = [
  {
    by: 'ada',
    minutesAgo: 47,
    text: 'I did not expect to feel this difference as much as I do',
    quote: {
      by: 'edgeworks',
      minutesAgo: 600,
      text: 'We keep shaving milliseconds off the edge, and you may have noticed pages start painting sooner!\n\nShells are now cached at every PoP and the data streams in over a single SSE response as each query resolves. Cold sessions also start up as soon as you …',
      media: { kind: 'benchmark' },
    },
  },
  {
    by: 'northwind',
    minutesAgo: 0,
    ad: true,
    text: 'Scaling inference without melting the datacenter: our chief architect on liquid cooling, rack density and what comes after GPUs.',
    media: { kind: 'photo', scene: 'datacenter', caption: 'Northwind Compute · Watch the conversation' },
  },
  {
    by: 'marco',
    minutesAgo: 92,
    text: 'hot take: most SPAs are a cached HTML shell + 6 fetches + a state library to glue the results back together.\n\nyou can delete the state library.',
  },
  {
    by: 'jonas',
    minutesAgo: 130,
    text: 'Reminder that Promise.all waits for the slowest one.\n\nIf you are rendering HTML you can stream each fragment the moment its query resolves. This is the whole trick:',
    media: { kind: 'code' },
  },
  {
    by: 'priya',
    minutesAgo: 190,
    text: 'Spent the weekend hiking above the clouds. No laptop, no notifications. Highly recommend.',
    media: { kind: 'photo', scene: 'mountains' },
  },
  {
    by: 'latencyClub',
    minutesAgo: 240,
    text: 'p50 is the number your dashboard shows you so you feel good.\n\np99 is the number your users feel.',
  },
  {
    by: 'sofia',
    minutesAgo: 300,
    text: 'Shipped the new onboarding today.\n\n0 lines of client-side routing. 0 loading spinners. Just HTML, one SSE stream and a handful of data-* attributes. #hypermedia',
  },
  {
    by: 'hypermedia',
    minutesAgo: 360,
    text: 'Why server-sent events are having a moment in 2026 🧵',
    media: { kind: 'link', domain: 'hypermedia.daily', title: 'The quiet comeback of server-sent events' },
  },
  {
    by: 'femi',
    minutesAgo: 420,
    text: 'If your skeleton screen has a different layout than your real content, it is not a skeleton. It is a jump scare.',
  },
  {
    by: 'noor',
    minutesAgo: 510,
    text: 'Our dashboard went from 1.9MB of JavaScript to 41KB. Same features.\n\nUsers noticed before we told them.',
    media: { kind: 'bundle' },
  },
  {
    by: 'tomas',
    minutesAgo: 600,
    text: 'the best loading spinner is the one you never ship',
  },
  {
    by: 'elena',
    minutesAgo: 720,
    text: 'Interview question I keep coming back to:\n\n"Your page makes 6 requests. One of them is slow. What does the user see?"\n\nThe answer tells me everything.',
  },
  {
    by: 'kai',
    minutesAgo: 800,
    text: 'new wallpaper drop. made it entirely with gradients because I have no self control',
    media: { kind: 'photo', scene: 'aurora' },
  },
  {
    by: 'ines',
    minutesAgo: 900,
    text: 'Morphing the DOM instead of replacing it is so underrated. Focus, scroll position, playing videos, open details — all kept.',
  },
  {
    by: 'wes',
    minutesAgo: 1020,
    text: 'TIL a Worker can return a streaming Response immediately and keep writing to it while other promises resolve.\n\nFelt like cheating.',
  },
  {
    by: 'betterX',
    minutesAgo: 1140,
    text: 'Every panel on this page arrived over one streamed request. Open the stream log (bottom left) and reload to watch them land in a different order each time.',
    media: { kind: 'waterfall' },
  },
  {
    by: 'mira',
    minutesAgo: 1300,
    text: 'Unpopular opinion: "loading states" are mostly a backend latency problem wearing a frontend costume.',
  },
  {
    by: 'systemsWeekly',
    minutesAgo: 1500,
    text: 'This week: zero-copy parsers, a 4KB HTTP server, and why your allocator is probably fine.',
    media: { kind: 'link', domain: 'systems.weekly', title: 'Issue #212 — Smaller, faster, calmer' },
  },
  {
    by: 'lucia',
    minutesAgo: 1700,
    text: 'Barcelona sunsets never miss 🌅',
    media: { kind: 'photo', scene: 'sunset' },
  },
  {
    by: 'hana',
    minutesAgo: 2000,
    text: 'Accessibility tip: if content streams in, put the region in an aria-live="polite" container or screen reader users will never know it arrived.',
  },
  {
    by: 'dev',
    minutesAgo: 2300,
    text: 'me: I will just add one more useEffect\n\nthe app 6 months later:',
    media: { kind: 'photo', scene: 'storm' },
  },
  {
    by: 'oscar',
    minutesAgo: 2600,
    text: 'Cached the shell, streamed the data, deleted 4 loading booleans. Best PR of the quarter.',
  },
]

export const following: PostSeed[] = [
  {
    by: 'bcnFrontend',
    minutesAgo: 12,
    text: 'Next meetup: "Streaming HTML at the edge" 🎤\n\nThursday, 19:00, Poblenou. Pizza is on us.',
    media: { kind: 'photo', scene: 'city' },
  },
  {
    by: 'oscar',
    minutesAgo: 25,
    text: 'Coffee #3. The deploy is green. Nobody touch anything.',
  },
  {
    by: 'lucia',
    minutesAgo: 38,
    text: 'Our p99 TTFB after moving the shell to the edge cache:',
    media: { kind: 'benchmark' },
  },
  {
    by: 'dev',
    minutesAgo: 55,
    text: 'reading a 2014 blog post about pjax and realising we have come full circle and honestly? good.',
  },
  {
    by: 'mira',
    minutesAgo: 80,
    text: 'Did a talk today about removing state from the client. The best question I got: "where did it go?" — it went back to the server, where it always lived.',
  },
  {
    by: 'hana',
    minutesAgo: 110,
    text: 'Weekend project: a tiny RSS reader where each feed is fetched in parallel and streamed into the page as it arrives. ~200 lines total.',
    media: { kind: 'code' },
  },
  {
    by: 'jonas',
    minutesAgo: 150,
    text: 'Ran into a teammate who thought SSE meant "server side errors". Honestly not wrong for some of our endpoints.',
  },
  {
    by: 'priya',
    minutesAgo: 200,
    text: 'Fresh focaccia day 🫒',
    media: { kind: 'photo', scene: 'focaccia' },
  },
  {
    by: 'femi',
    minutesAgo: 260,
    text: 'Looking for a senior engineer who likes boring tech and fast pages. DMs open.',
  },
  {
    by: 'sofia',
    minutesAgo: 330,
    text: 'Request waterfall before vs after. Same data, same backend, one stream instead of six round trips.',
    media: { kind: 'waterfall' },
  },
  {
    by: 'tomas',
    minutesAgo: 400,
    text: 'whoever decided the default font size of terminal emulators should be 11px owes me new glasses',
  },
  {
    by: 'elena',
    minutesAgo: 500,
    text: 'Hiring update: we got 400 applications in 2 days. Reading every one. Please be patient 🙏',
  },
  {
    by: 'kai',
    minutesAgo: 640,
    text: 'night walk',
    media: { kind: 'photo', scene: 'night' },
  },
  {
    by: 'ines',
    minutesAgo: 780,
    text: 'Paris → Barcelona by train, 6h30, wifi worked the whole way. The future is good actually.',
  },
  {
    by: 'wes',
    minutesAgo: 960,
    text: 'Rewrote our settings page in plain HTML forms. It got faster and the bug count went down. Who knew.',
  },
  {
    by: 'noor',
    minutesAgo: 1200,
    text: 'Wrote up how we cut our bundle by 97%.',
    media: { kind: 'link', domain: 'noor.dev', title: 'We deleted our frontend (mostly)' },
  },
  {
    by: 'marco',
    minutesAgo: 1500,
    text: 'Gentle reminder that your users are on a 3-year-old Android phone on hotel wifi.',
  },
  {
    by: 'ada',
    minutesAgo: 1900,
    text: 'Shipping > planning. See you all on the other side of this release.',
  },
]
