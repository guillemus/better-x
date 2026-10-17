import type { Counts, Post as PostData, Quote, Timeline as TimelineData } from '../types'
import { cx } from './cx'
import { Icon, type IconName } from './icons'
import { Media } from './media'
import { Avatar, compact, IconButton, Identity, RichText, togglePressed } from './ui'

const tones = {
  brand: 'hover:text-brand [&:hover>svg]:bg-brand/10',
  bookmark: 'hover:text-brand aria-pressed:text-brand [&:hover>svg]:bg-brand/10 aria-pressed:[&>svg]:fill-current',
  repost: 'hover:text-repost aria-pressed:text-repost [&:hover>svg]:bg-repost/10',
  like: 'hover:text-like aria-pressed:text-like [&:hover>svg]:bg-like/10 aria-pressed:[&>svg]:fill-current',
}

type ActionProps = {
  icon: IconName
  tone: keyof typeof tones
  count?: number
  toggles?: boolean
}

function Action({ icon, tone, count, toggles }: ActionProps) {
  return (
    <button
      class={cx('inline-flex items-center gap-0.5 text-muted transition-colors', tones[tone])}
      aria-pressed={toggles ? 'false' : undefined}
      data-on:click={toggles ? togglePressed : undefined}
    >
      <Icon name={icon} class="-my-2 -mr-0.5 -ml-2 size-[34px] rounded-full p-2 stroke-[1.6] transition-colors" />
      {count !== undefined && <span class="px-1">{compact(count)}</span>}
    </button>
  )
}

function Actions({ counts }: { counts: Counts }) {
  return (
    <div class="mt-3 flex items-center justify-between text-[13px]/4">
      <Action icon="reply" tone="brand" count={counts.replies} />
      <Action icon="repost" tone="repost" count={counts.reposts} toggles />
      <Action icon="like" tone="like" count={counts.likes} toggles />
      <Action icon="views" tone="brand" count={counts.views} />
      <div class="flex gap-2.5">
        <Action icon="bookmark" tone="bookmark" toggles />
        <Action icon="share" tone="brand" />
      </div>
    </div>
  )
}

function QuotedPost({ quote }: { quote: Quote }) {
  return (
    <div class="mt-3 overflow-hidden rounded-2xl border border-line transition-colors hover:bg-ink/3">
      <div class="flex min-w-0 items-center gap-1 px-3 pt-3 pb-0.5">
        <Avatar person={quote.author} size={20} class="mr-0.5" />
        <Identity person={quote.author} />
        <span class="text-muted">· {quote.age}</span>
      </div>
      <div class="px-3 pb-3">
        <RichText text={quote.text} />
      </div>
      {quote.media && (
        <div class="border-t border-line">
          <Media media={quote.media} flush />
        </div>
      )}
    </div>
  )
}

export function Post({ post }: { post: PostData }) {
  return (
    <article id={post.id} class="flex cursor-pointer gap-2 border-b border-line px-4 py-3 transition-colors hover:bg-ink/3">
      <Avatar person={post.author} />
      <div class="min-w-0 flex-1">
        <header class="flex min-w-0 items-center gap-1">
          <Identity person={post.author} />
          {post.age && <span class="shrink-0 text-muted">· {post.age}</span>}
          <div class="ml-auto flex items-center gap-1 pl-2">
            {post.ad ? <span class="text-muted">Ad</span> : <IconButton icon="explain" small />}
            <IconButton icon="dots" small />
          </div>
        </header>
        <div class="mt-px wrap-anywhere">
          <RichText text={post.text} />
        </div>
        {post.media && <Media media={post.media} />}
        {post.quote && <QuotedPost quote={post.quote} />}
        <Actions counts={post.counts} />
      </div>
    </article>
  )
}

export function Timeline({ id, timeline }: { id: string; timeline: TimelineData }) {
  return (
    <div id={id} class="animate-fade-in" aria-live="polite">
      <button class="block h-[49px] w-full border-b border-line text-brand transition-colors hover:bg-ink/3">
        Show {timeline.newPosts} posts
      </button>
      {timeline.posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  )
}
