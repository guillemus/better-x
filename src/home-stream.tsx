import { ServerSentEventGenerator } from '@starfederation/datastar-sdk/web'
import type { JSX } from 'hono/jsx/jsx-runtime'
import { Account, NavBadges } from './components/account'
import { Timeline } from './components/post'
import { TodaysNews, WhatsHappening, WhoToFollow } from './components/sidebar'
import * as queries from './queries'
import { renderToString } from './render'

export function streamHome() {
  return ServerSentEventGenerator.stream(async (stream) => {
    const send = async (element: JSX.Element) => stream.patchElements(await renderToString(element))

    await Promise.all([
      queries.getViewer().then((viewer) => send(<Account viewer={viewer} />)),
      queries.getBadgeCounts().then((counts) => send(<NavBadges counts={counts} />)),
      queries.getNews().then((stories) => send(<TodaysNews stories={stories} />)),
      queries.getTrends().then((trends) => send(<WhatsHappening trends={trends} />)),
      queries.getWhoToFollow().then((people) => send(<WhoToFollow people={people} />)),
      queries.getForYou().then((timeline) => send(<Timeline id="for-you" timeline={timeline} />)),
      queries.getFollowing().then((timeline) => send(<Timeline id="following" timeline={timeline} />)),
    ])
  })
}
