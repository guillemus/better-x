import type { BadgeCounts, Person } from '../types'
import { Icon } from './icons'
import { Avatar, Identity } from './ui'

export const accountClass =
  'mt-auto mb-3 flex animate-fade-in cursor-pointer items-center gap-3 rounded-full p-2 transition-colors hover:bg-ink/10 xl:p-3'

export function AccountCard({ viewer }: { viewer: Person }) {
  return (
    <div id="account" class={accountClass}>
      <Avatar person={viewer} />
      <div class="hidden min-w-0 flex-1 flex-wrap items-center xl:flex">
        <Identity person={viewer} stacked />
      </div>
      <Icon name="dots" class="hidden size-[18px] xl:block" />
    </div>
  )
}

export function ComposerAvatar({ viewer }: { viewer: Person }) {
  return (
    <div id="composer-avatar">
      <Avatar person={viewer} />
    </div>
  )
}

export function Account({ viewer }: { viewer: Person }) {
  return (
    <>
      <AccountCard viewer={viewer} />
      <ComposerAvatar viewer={viewer} />
    </>
  )
}

function Count({ id, value }: { id: string; value: number }) {
  if (!value) return <span id={id} />
  return (
    <span
      id={id}
      class="absolute -top-1.5 -right-2 h-[18px] min-w-[18px] rounded-full border border-black bg-brand px-[5px] text-center text-[11px]/4 font-bold text-white"
    >
      {value}
    </span>
  )
}

export type BadgeId = 'badge-home' | 'badge-notifications' | 'badge-chat'

export function NavBadge({ id, counts }: { id: BadgeId; counts: BadgeCounts }) {
  if (id === 'badge-notifications') return <Count id={id} value={counts.notifications} />
  if (id === 'badge-chat') return <Count id={id} value={counts.messages} />
  return <span id={id} class="absolute -top-0.5 -right-px box-content size-2 rounded-full border-[1.5px] border-black bg-brand" />
}

export function NavBadges({ counts }: { counts: BadgeCounts }) {
  return (
    <>
      <NavBadge id="badge-home" counts={counts} />
      <NavBadge id="badge-notifications" counts={counts} />
      <NavBadge id="badge-chat" counts={counts} />
    </>
  )
}
