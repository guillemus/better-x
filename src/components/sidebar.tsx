import type { Child } from 'hono/jsx'
import type { NewsStory, Person, Trend } from '../types'
import { cx } from './cx'
import { Avatar, compact, IconButton, Identity, togglePressed } from './ui'

const toggleFollow = `${togglePressed}; el.textContent = el.ariaPressed === 'true' ? 'Following' : 'Follow'`

export const rowClass = 'flex px-4 py-3 transition-colors'

type CardProps = {
  id: string
  title: string
  dismissible?: boolean
  children?: Child
}

export function Card({ id, title, dismissible, children }: CardProps) {
  return (
    <section
      id={id}
      class="mb-4 animate-fade-in overflow-hidden rounded-2xl border border-line"
      data-show={dismissible ? '!$newsDismissed' : undefined}
    >
      <header class="flex items-center justify-between px-4 py-3">
        <h2 class="text-xl/6 font-extrabold">{title}</h2>
        {dismissible && <IconButton icon="close" label="Dismiss" class="-my-1.5 -mr-2" onClick="$newsDismissed = true" />}
      </header>
      {children}
    </section>
  )
}

export function ShowMore() {
  return (
    <a class="block p-4 text-brand transition-colors hover:bg-ink/3" href="#">
      Show more
    </a>
  )
}

export function TodaysNews({ stories }: { stories: NewsStory[] }) {
  return (
    <Card id="news" title="Today’s News" dismissible>
      {stories.map((story) => (
        <a class={cx(rowClass, 'flex-col gap-1.5 hover:bg-ink/3')} href="#">
          <div class="font-bold">{story.title}</div>
          <div class="flex items-center gap-2 text-[13px] text-muted">
            <span class="flex">
              {story.faces.map((person) => (
                <Avatar person={person} size={20} showInitials={false} class="-mr-[7px] box-content border-2 border-black last:mr-0" />
              ))}
            </span>
            {story.age} · {story.category} · {compact(story.posts)} posts
          </div>
        </a>
      ))}
    </Card>
  )
}

export function WhatsHappening({ trends }: { trends: Trend[] }) {
  return (
    <Card id="trends" title="What’s happening">
      {trends.map((trend) => (
        <a class={cx(rowClass, 'items-start justify-between hover:bg-ink/3')} href="#">
          <div>
            <div class="text-[13px]/4 text-muted">{trend.context}</div>
            <div class="my-0.5 font-bold">{trend.name}</div>
            {trend.posts && <div class="text-[13px]/4 text-muted">{compact(trend.posts)} posts</div>}
          </div>
          <IconButton icon="dots" small />
        </a>
      ))}
      <ShowMore />
    </Card>
  )
}

export function WhoToFollow({ people }: { people: Person[] }) {
  return (
    <Card id="who-to-follow" title="Who to follow">
      {people.map((person) => (
        <div class={cx(rowClass, 'items-center gap-3')}>
          <Avatar person={person} />
          <div class="flex min-w-0 flex-1 flex-wrap items-center">
            <Identity person={person} stacked />
          </div>
          <button
            class="h-8 shrink-0 rounded-full bg-paper px-4 text-sm font-bold text-paper-ink hover:bg-paper-hover aria-pressed:border aria-pressed:border-[#536471] aria-pressed:bg-transparent aria-pressed:text-ink"
            aria-pressed="false"
            data-on:click={toggleFollow}
          >
            Follow
          </button>
        </div>
      ))}
      <ShowMore />
    </Card>
  )
}
