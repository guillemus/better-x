import { accountClass } from './account'
import { cx } from './cx'
import { Card, rowClass } from './sidebar'

function Line({ width, height = 12 }: { width: string; height?: number }) {
  return <span class="skeleton block rounded-md" style={{ width, height: `${height}px` }} />
}

function Circle() {
  return <span class="skeleton block size-10 shrink-0 rounded-full" />
}

function Pill() {
  return <span class="skeleton block h-8 w-[76px] shrink-0 rounded-full" />
}

function PostSkeleton({ withMedia, short }: { withMedia: boolean; short: boolean }) {
  return (
    <div class="flex gap-2 border-b border-line px-4 py-3">
      <Circle />
      <div class="flex min-w-0 flex-1 flex-col gap-2 pt-[3px]">
        <Line width="38%" height={14} />
        <Line width="92%" />
        <Line width={short ? '64%' : '80%'} />
        {withMedia && <span class="skeleton mt-1 block h-[220px] w-full rounded-2xl" />}
        <div class="mt-2 flex justify-between pr-[20%]">
          {[0, 1, 2, 3].map(() => (
            <Line width="10%" height={10} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function TimelineSkeleton({ id }: { id: string }) {
  return (
    <div id={id}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <PostSkeleton withMedia={i % 3 === 0} short={i % 2 === 1} />
      ))}
    </div>
  )
}

export function AccountSkeleton() {
  return (
    <div id="account" class={accountClass}>
      <Circle />
      <div class="hidden flex-col gap-1.5 xl:flex">
        <Line width="120px" height={14} />
        <Line width="80px" />
      </div>
    </div>
  )
}

export function ComposerAvatarSkeleton() {
  return (
    <div id="composer-avatar">
      <Circle />
    </div>
  )
}

function ShowMoreSkeleton() {
  return (
    <div class="p-4">
      <Line width="80px" height={13} />
    </div>
  )
}

export function NewsSkeleton() {
  return (
    <Card id="news" title="Today’s News" dismissible>
      {[0, 1, 2].map(() => (
        <div class={cx(rowClass, 'flex-col gap-1.5')}>
          <Line width="95%" height={14} />
          <Line width="70%" height={14} />
          <Line width="55%" height={11} />
        </div>
      ))}
    </Card>
  )
}

export function TrendsSkeleton() {
  return (
    <Card id="trends" title="What’s happening">
      {[0, 1, 2, 3].map(() => (
        <div class={cx(rowClass, 'flex-col gap-1.5')}>
          <Line width="40%" height={11} />
          <Line width="55%" height={14} />
        </div>
      ))}
      <ShowMoreSkeleton />
    </Card>
  )
}

export function WhoToFollowSkeleton() {
  return (
    <Card id="who-to-follow" title="Who to follow">
      {[0, 1, 2].map(() => (
        <div class={cx(rowClass, 'items-center gap-3')}>
          <Circle />
          <div class="flex flex-1 flex-col gap-1.5">
            <Line width="60%" height={13} />
            <Line width="40%" height={11} />
          </div>
          <Pill />
        </div>
      ))}
      <ShowMoreSkeleton />
    </Card>
  )
}
