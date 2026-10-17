import type { Html } from './jsx/jsx-runtime'
import { Account, NavBadges } from './components/account'
import { Timeline } from './components/post'
import { TodaysNews, WhatsHappening, WhoToFollow } from './components/sidebar'
import { TraceProgress, TraceRow, TraceTotal } from './components/stream-log'
import * as queries from './queries'
import { run, type Query } from './queries'
import { DatastarStream } from './sse'

type Fragment = {
  name: string
  target: string
  render: () => Promise<Html>
}

function fragment<T>(query: Query<T>, target: string, view: (data: T) => Html): Fragment {
  return { name: query.name, target, render: async () => view(await run(query)) }
}

export const fragments: Fragment[] = [
  fragment(queries.Viewer, '#account, #composer-avatar', (viewer) => <Account viewer={viewer} />),
  fragment(queries.ViewerBadgeCounts, 'nav badges', (counts) => <NavBadges counts={counts} />),
  fragment(queries.StoryTopic, '#news', (stories) => <TodaysNews stories={stories} />),
  fragment(queries.ExploreSidebar, '#trends', (trends) => <WhatsHappening trends={trends} />),
  fragment(queries.SidebarUserRecommendations, '#who-to-follow', (people) => <WhoToFollow people={people} />),
  fragment(queries.HomeTimeline, '#for-you', (timeline) => <Timeline id="for-you" timeline={timeline} />),
  fragment(queries.HomeLatestTimeline, '#following', (timeline) => <Timeline id="following" timeline={timeline} />),
]

function streamHome(ctx: ExecutionContext) {
  const stream = new DatastarStream()
  const started = Date.now()
  let done = 0

  const jobs = fragments.map(async ({ name, target, render }) => {
    const html = await render()
    const ms = Date.now() - started
    done += 1
    await stream.patchElements(html)
    await stream.patchElements(<TraceRow name={name} target={target} ms={ms} bytes={html.value.length} />, {
      selector: '#trace',
      mode: 'append',
    })
    await stream.patchElements(<TraceProgress done={done} total={fragments.length} ms={ms} />)
  })

  ctx.waitUntil(
    Promise.all(jobs)
      .then(() => stream.patchElements(<TraceTotal ms={Date.now() - started} />))
      .finally(() => stream.close()),
  )

  return stream.response
}

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url)
    if (pathname === '/home/stream') return streamHome(ctx)
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<{ ASSETS: Fetcher }>
