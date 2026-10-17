import { cx } from './cx'
import { Icon } from './icons'

const scaleMs = 2000

const navigationEnd = "performance.getEntriesByType('navigation')[0].responseEnd"

const traceGrid = 'grid grid-cols-[170px_1fr_52px_56px] items-center gap-x-2 gap-y-0.5'

type TraceRowProps = {
  name: string
  meta: string
  server: string
  browserInit: string
  bar: { width?: string; init?: string; color: string }
}

function Row({ name, meta, server, browserInit, bar }: TraceRowProps) {
  return (
    <li class={cx(traceGrid, 'animate-fade-in border-t border-[#1c1f23] py-[5px]')}>
      <span class="truncate">{name}</span>
      <span class="h-1.5 overflow-hidden rounded-full bg-skeleton">
        <b class={cx('block h-full rounded-full', bar.color)} style={bar.width && { width: bar.width }} data-init={bar.init} />
      </span>
      <span class="text-right">{server}</span>
      <span class="text-right text-repost" data-init={browserInit} />
      <span class="col-span-4 text-[11px] text-muted">{meta}</span>
    </li>
  )
}

export function TraceRow({ name, target, ms, bytes }: { name: string; target: string; ms: number; bytes: number }) {
  return (
    <Row
      name={name}
      meta={`→ ${target} · ${(bytes / 1024).toFixed(1)}KB`}
      server={`${ms}ms`}
      browserInit="el.textContent = Math.round(performance.now()) + 'ms'"
      bar={{ width: `${Math.min(100, (ms / scaleMs) * 100).toFixed(1)}%`, color: 'bg-brand' }}
    />
  )
}

function ShellRow() {
  return (
    <Row
      name="index.html (cached)"
      meta="static asset · no data"
      server="—"
      browserInit={`el.textContent = Math.round(${navigationEnd}) + 'ms'`}
      bar={{ init: `el.style.width = Math.min(100, ${navigationEnd} / ${scaleMs / 100}) + '%'`, color: 'bg-repost' }}
    />
  )
}

export function TraceProgress({ done, total, ms }: { done: number; total: number; ms?: number }) {
  return (
    <span id="trace-progress">
      {done}/{total}
      {ms !== undefined && ` · ${ms}ms`}
    </span>
  )
}

export function TraceTotal({ ms }: { ms?: number }) {
  return (
    <div id="trace-total" class="mt-2 text-muted">
      {ms === undefined ? 'streaming…' : `stream closed after ${ms}ms`}
    </div>
  )
}

export function StreamLog({ queryCount }: { queryCount: number }) {
  return (
    <div class="fixed bottom-4 left-3 z-20 font-mono text-xs/4">
      <div
        class="absolute bottom-[42px] left-0 w-[440px] max-w-[calc(100vw-32px)] rounded-[14px] border border-line bg-[#0b0d10]/95 px-3.5 py-3 shadow-[0_10px_40px_rgb(0_0_0/0.7)] backdrop-blur-md"
        data-show="$streamLogOpen"
        style="display: none"
      >
        <header class="mb-1 flex items-center justify-between font-sans text-[13px]">
          <strong>Stream log</strong>
          <button class="rounded-full border border-brand/30 px-2 py-0.5 text-brand hover:bg-brand/10" data-on:click="location.reload()">
            reload
          </button>
        </header>
        <p class="mb-2.5 font-sans text-muted">
          The shell is a static, edge-cached file. One <code>@get('/home/stream')</code> then runs {queryCount} fake queries in parallel on the
          Worker, and each HTML fragment is pushed over SSE the moment its query resolves.
        </p>
        <div class={cx(traceGrid, 'pb-1 text-[11px] text-muted')}>
          <span>query</span>
          <span />
          <span class="text-right">server</span>
          <span class="text-right">browser</span>
        </div>
        <ol id="trace">
          <ShellRow />
        </ol>
        <TraceTotal />
      </div>
      <button
        class="flex h-[30px] items-center gap-1.5 rounded-full border border-brand/30 bg-[#0a1a2a] px-2.5 text-[#8ecdf8] shadow-[0_4px_20px_rgb(0_0_0/0.6)]"
        data-on:click="$streamLogOpen = !$streamLogOpen"
      >
        <Icon name="bolt" class="size-3.5 text-brand" />
        <TraceProgress done={0} total={queryCount} />
      </button>
    </div>
  )
}
