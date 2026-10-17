import type { JSX } from 'hono/jsx/jsx-runtime'
import { Suspense } from 'hono/jsx/streaming'
import { AccountCard, ComposerAvatar, NavBadge, type BadgeId } from './components/account'
import { cx } from './components/cx'
import { Icon, Logo, type IconName } from './components/icons'
import { Timeline } from './components/post'
import { TodaysNews, WhatsHappening, WhoToFollow } from './components/sidebar'
import { AccountSkeleton, ComposerAvatarSkeleton, NewsSkeleton, TimelineSkeleton, TrendsSkeleton, WhoToFollowSkeleton } from './components/skeletons'
import type { HomeQueries } from './queries'

type DeferredProps<T> = {
  value?: Promise<T>
  fallback: JSX.Element
  render: (value: T) => JSX.Element
}

function Deferred<T>({ value, fallback, render }: DeferredProps<T>) {
  if (!value) return fallback
  const Resolved = async () => render(await value)
  return (
    <Suspense fallback={fallback}>
      <Resolved />
    </Suspense>
  )
}

const navigation: { label: string; icon: IconName; badge?: BadgeId; active?: boolean }[] = [
  { label: 'Home', icon: 'home', badge: 'badge-home', active: true },
  { label: 'Explore', icon: 'search' },
  { label: 'Notifications', icon: 'bell', badge: 'badge-notifications' },
  { label: 'Chat', icon: 'chat', badge: 'badge-chat' },
  { label: 'Calls', icon: 'phone' },
  { label: 'Spark', icon: 'spark' },
  { label: 'Subscription', icon: 'subscription' },
  { label: 'History', icon: 'bookmark' },
  { label: 'Articles', icon: 'article' },
  { label: 'Profile', icon: 'profile' },
  { label: 'More', icon: 'more' },
]

const composerTools: IconName[] = ['image', 'gif', 'spark', 'list', 'emoji', 'schedule', 'location', 'flag']

const footerLinks = ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility', 'Ads info', 'More ···']

const paperButton = 'rounded-full bg-paper font-bold text-paper-ink transition-colors hover:bg-paper-hover disabled:opacity-50'

function Sidebar({ data }: { data?: HomeQueries }) {
  return (
    <header class="hidden flex-auto justify-end md:flex">
      <nav class="sticky top-0 flex h-screen w-[88px] flex-col items-center overflow-y-auto px-2 xl:w-[275px] xl:items-stretch">
        <a class="my-0.5 flex size-[52px] items-center justify-center rounded-full transition-colors hover:bg-ink/10" href="/" aria-label="Better X">
          <Logo />
        </a>
        {navigation.map((item) => (
          <a
            class={cx(
              'my-0.5 flex items-center gap-5 self-center rounded-full p-3 text-xl/6 transition-colors hover:bg-ink/10 xl:self-start xl:pr-6',
              item.active && 'font-bold',
            )}
            href={item.active ? '/' : '#'}
          >
            <span class="relative">
              <Icon name={item.icon} class={cx('size-[26px]', item.active && '[&_*]:stroke-[2.2]')} />
              {item.badge && (
                <Deferred
                  value={data?.counts}
                  fallback={<span id={item.badge} />}
                  render={(counts) => <NavBadge id={item.badge!} counts={counts} />}
                />
              )}
            </span>
            <span class="hidden xl:inline">{item.label}</span>
          </a>
        ))}
        <button class="my-4 flex size-[52px] items-center justify-center self-center rounded-full bg-paper text-[17px] font-bold text-paper-ink transition-colors hover:bg-paper-hover xl:h-[52px] xl:w-[90%]">
          <span class="hidden xl:inline">Post</span>
          <Icon name="plus" class="size-6 xl:hidden" />
        </button>
        <Deferred value={data?.viewer} fallback={<AccountSkeleton />} render={(viewer) => <AccountCard viewer={viewer} />} />
      </nav>
    </header>
  )
}

function Tab({ id, label, chevron, onOpen = '' }: { id: string; label: string; chevron?: boolean; onOpen?: string }) {
  return (
    <button
      class="group flex flex-1 justify-center text-muted transition-colors hover:bg-ink/10 aria-selected:font-bold aria-selected:text-ink"
      role="tab"
      aria-selected={id === 'for-you' ? 'true' : 'false'}
      data-attr:aria-selected={`$tab == '${id}' ? 'true' : 'false'`}
      data-on:click={`$tab = '${id}'; window.scrollTo(0, 0); ${onOpen}`}
    >
      <span class="relative flex h-full items-center gap-1">
        {label}
        {chevron && <Icon name="chevron" class="size-4" />}
        <span class="absolute inset-x-0 bottom-0 hidden h-1 min-w-14 rounded-full bg-brand group-aria-selected:block" />
      </span>
    </button>
  )
}

function Composer({ data }: { data?: HomeQueries }) {
  return (
    <div class="flex gap-3 border-b border-line px-4 pt-3 pb-2">
      <Deferred value={data?.viewer} fallback={<ComposerAvatarSkeleton />} render={(viewer) => <ComposerAvatar viewer={viewer} />} />
      <div class="min-w-0 flex-1">
        <div class="py-2 text-xl/7 text-muted">What’s happening?</div>
        <div class="mt-2 flex items-center justify-between">
          <div class="-ml-2 flex">
            {composerTools.map((tool) => (
              <button class="flex size-[34px] items-center justify-center rounded-full text-brand transition-colors hover:bg-brand/10">
                <Icon name={tool} class="size-5" />
              </button>
            ))}
          </div>
          <button class={cx(paperButton, 'h-9 px-4')} disabled>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

function Home({ data }: { data?: HomeQueries }) {
  return (
    <div class="min-h-screen w-full border-line md:w-[600px] md:border-x">
      <div class="sticky top-0 z-10 flex h-[53px] border-b border-line bg-black/65 backdrop-blur-md" role="tablist">
        <Tab id="for-you" label="For you" chevron />
        <Tab
          id="following"
          label="Following"
          onOpen={`
            if (!$following_requested) {
              $following_requested = true;
              @get('/home/timeline/following')
            }`}
        />
        <button class="flex w-[53px] items-center justify-center transition-colors hover:bg-ink/10" aria-label="Add timeline">
          <Icon name="plus" class="size-5" />
        </button>
      </div>
      <Composer data={data} />
      <div data-show="$tab == `for-you`" data-init={data ? undefined : '@get(`/home/timeline/for-you`)'}>
        <Deferred
          value={data?.forYou}
          fallback={<TimelineSkeleton id="for-you" />}
          render={(timeline) => <Timeline id="for-you" timeline={timeline} />}
        />
      </div>
      <div data-show="$tab == `following`" style="display: none">
        <TimelineSkeleton id="following" />
      </div>
    </div>
  )
}

function Aside({ data }: { data?: HomeQueries }) {
  return (
    <aside class="mr-2.5 ml-[30px] hidden w-[350px] shrink-0 pb-16 lg:block">
      <div class="sticky top-0 z-10 mb-1 bg-black py-1.5">
        <label class="flex h-[42px] items-center gap-3 rounded-full border border-line px-4 text-muted focus-within:border-brand focus-within:text-brand">
          <Icon name="search" class="size-[18px]" />
          <input class="min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted" placeholder="Search" />
        </label>
      </div>
      <Deferred value={data?.news} fallback={<NewsSkeleton />} render={(stories) => <TodaysNews stories={stories} />} />
      <Deferred value={data?.trends} fallback={<TrendsSkeleton />} render={(trends) => <WhatsHappening trends={trends} />} />
      <Deferred value={data?.whoToFollow} fallback={<WhoToFollowSkeleton />} render={(people) => <WhoToFollow people={people} />} />
      <footer class="flex flex-wrap gap-x-3 gap-y-1 px-4 text-[13px] text-muted">
        {footerLinks.map((link) => (
          <a class="hover:underline" href="#">
            {link}
          </a>
        ))}
        <span>© 2026 Better X</span>
      </footer>
    </aside>
  )
}

function FloatingButton({ icon, label }: { icon: IconName; label: string }) {
  return (
    <button
      class="flex size-[50px] items-center justify-center rounded-2xl border border-line bg-black/80 shadow-[0_0_15px_rgb(255_255_255/0.1)] backdrop-blur-md transition-colors hover:bg-skeleton"
      aria-label={label}
    >
      <Icon name={icon} class="size-6" />
    </button>
  )
}

const versions = [
  { href: '/', label: 'Shell + SSE' },
  { href: '/streamed', label: 'Streamed HTML' },
]

function VersionSwitcher({ current }: { current: string }) {
  return (
    <nav class="fixed bottom-5 left-5 z-20 flex gap-1 rounded-full border border-line bg-black/80 p-1 text-[13px] font-bold shadow-[0_0_15px_rgb(255_255_255/0.1)] backdrop-blur-md">
      {versions.map((version) => (
        <a
          class="rounded-full px-3 py-1.5 text-muted transition-colors hover:text-ink aria-[current=page]:bg-paper aria-[current=page]:text-paper-ink"
          href={version.href}
          aria-current={version.href === current ? 'page' : undefined}
        >
          {version.label}
        </a>
      ))}
    </nav>
  )
}

export function HomePage({ data }: { data?: HomeQueries }) {
  return (
    <div data-signals="{tab: `for-you`, news_dismissed: false}" data-init={data ? undefined : '@get(`/home/stream`)'}>
      <div class="flex min-h-screen justify-center">
        <Sidebar data={data} />
        <main class="flex flex-auto">
          <Home data={data} />
          <Aside data={data} />
        </main>
      </div>
      <VersionSwitcher current={data ? '/streamed' : '/'} />
      <div class="fixed right-7 bottom-5 z-10 hidden flex-col gap-3.5 md:flex">
        <FloatingButton icon="spark" label="Spark" />
        <FloatingButton icon="chat" label="Chat" />
      </div>
    </div>
  )
}
