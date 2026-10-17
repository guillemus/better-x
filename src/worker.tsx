import { ServerSentEventGenerator } from '@starfederation/datastar-sdk/web'
import type { JSX } from 'hono/jsx/jsx-runtime'
import { Account, NavBadges } from './components/account'
import { Timeline } from './components/post'
import { TodaysNews, WhatsHappening, WhoToFollow } from './components/sidebar'
import { TraceProgress, TraceRow, TraceTotal } from './components/stream-log'
import * as queries from './queries'
import { run, type Query } from './queries'
import { renderToString } from './render'

type Fragment = {
  name: string
  target: string
  render: () => Promise<string>
}

function fragment<T>(query: Query<T>, target: string, view: (data: T) => JSX.Element): Fragment {
  return { name: query.name, target, render: async () => renderToString(view(await run(query))) }
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

function streamHome() {
  return ServerSentEventGenerator.stream(async (stream) => {
    const started = Date.now()
    let done = 0

    await Promise.all(
      fragments.map(async ({ name, target, render }) => {
        const html = await render()
        const ms = Date.now() - started
        const count = ++done
        stream.patchElements(html)
        stream.patchElements(await renderToString(<TraceRow name={name} target={target} ms={ms} bytes={html.length} />), {
          selector: '#trace',
          mode: 'append',
        })
        stream.patchElements(await renderToString(<TraceProgress done={count} total={fragments.length} ms={ms} />))
      }),
    )

    stream.patchElements(await renderToString(<TraceTotal ms={Date.now() - started} />))
  })
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url)
    if (pathname === '/home/stream') return streamHome()
    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<{ ASSETS: Fetcher }>
