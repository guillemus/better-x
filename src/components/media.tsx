import type { Child } from 'hono/jsx'
import type { Media as MediaData, Scene } from '../types'
import { cx } from './cx'
import { SceneArt } from './scenes'

const overlayLabel = 'absolute bottom-3 left-3 max-w-[calc(100%-24px)] truncate rounded bg-black/75 px-2 py-0.5 text-[13px]'

function Frame({ flush, class: className, children }: { flush?: boolean; class?: string; children?: Child }) {
  return <div class={cx('relative overflow-hidden', !flush && 'mt-3 rounded-2xl border border-line', className)}>{children}</div>
}

function Photo({ scene, caption, flush }: { scene: Scene; caption?: string; flush?: boolean }) {
  return (
    <Frame flush={flush}>
      <SceneArt scene={scene} />
      {caption && <div class={overlayLabel}>{caption}</div>}
    </Frame>
  )
}

const benchmarkRows = [
  { label: 'Better X (cached shell)', speedup: '3x', before: '1.92 s', after: '0.64 s' },
  { label: 'Better X (cold edge)', speedup: '2.8x', before: '3.10 s', after: '1.11 s' },
  { label: 'Timeline stream', speedup: '1.5x', before: '1.36 s', after: '0.91 s' },
  { label: 'Sidebar fragments', speedup: '1.5x', before: '0.82 s', after: '0.55 s', note: 'time to fragment, including query time · p50' },
]

function Benchmark({ flush }: { flush?: boolean }) {
  return (
    <Frame flush={flush} class="bg-[#f7f7f5] px-7 pt-[26px] pb-[18px] text-[#1a1a1a]">
      <div class="text-center font-serif text-2xl/[1.2] tracking-[-0.01em]">
        <em class="text-[#d1542f] not-italic">3x</em> faster first paint, <em class="text-[#d1542f] not-italic">1.5x</em> faster data
      </div>
      <div class="mt-2 text-center text-xs font-semibold">Wait before the first meaningful paint, excluding query time</div>
      <div class="mt-0.5 mb-3.5 text-center text-[9px] text-[#666]">p90 · August → October 2026</div>
      {benchmarkRows.map((row) => (
        <div class="flex items-center justify-between border-t border-[#e3e2dd] py-[9px]">
          <div>
            <div class="font-medium">{row.label}</div>
            {row.note && <div class="text-[9px] text-[#666]">{row.note}</div>}
          </div>
          <div class="text-right">
            <div class="text-[22px]/[26px] font-semibold text-[#d1542f]">{row.speedup} faster</div>
            <div class="text-[9px] text-[#555]">
              {row.before} → {row.after}
            </div>
          </div>
        </div>
      ))}
    </Frame>
  )
}

const snippet = `const jobs = queries.map(async (query) => {
  const data = await run(query)
  await stream.patchElements(render(data))
})
ctx.waitUntil(Promise.all(jobs).then(() => stream.close()))
return stream.response`

const syntax = /\b(const|async|await|return)\b|\b(\w+)(?=\()/g

function highlight(code: string) {
  const out: Child[] = []
  let last = 0
  for (const match of code.matchAll(syntax)) {
    out.push(code.slice(last, match.index))
    out.push(<span class={match[1] ? 'text-[#ff7b72]' : 'text-[#d2a8ff]'}>{match[0]}</span>)
    last = match.index + match[0].length
  }
  out.push(code.slice(last))
  return out
}

function CodeSample({ flush }: { flush?: boolean }) {
  return (
    <Frame flush={flush}>
      <pre class="overflow-x-auto bg-[#0d1117] p-4 font-mono text-[12.5px]/[1.6] text-[#c9d1d9]">{highlight(snippet)}</pre>
    </Frame>
  )
}

function LinkCard({ domain, title }: { domain: string; title: string }) {
  return (
    <>
      <Frame>
        <div class="hue-gradient aspect-[1.91]" style={{ '--hue': String((domain.length * 37) % 360) }}>
          <span class={overlayLabel}>{title}</span>
        </div>
      </Frame>
      <div class="mt-1 text-[13px] text-muted">From {domain}</div>
    </>
  )
}

function ChartTitle({ children, spaced }: { children?: Child; spaced?: boolean }) {
  return <div class={cx('mb-2.5 text-[13px] text-muted', spaced && 'mt-3.5')}>{children}</div>
}

function BundleRow({ label, value, width, color }: { label: string; value: string; width: string; color: string }) {
  return (
    <div class="my-2 grid grid-cols-[54px_1fr_64px] items-center gap-2.5 text-[13px]">
      <span>{label}</span>
      <b class={cx('block h-[22px] rounded-md', color)} style={{ width }} />
      <strong class="text-right">{value}</strong>
    </div>
  )
}

function BundleChart({ flush }: { flush?: boolean }) {
  return (
    <Frame flush={flush} class="bg-[#0b0d10] p-[18px]">
      <ChartTitle>JavaScript shipped to the client</ChartTitle>
      <BundleRow label="Before" value="1.9 MB" width="100%" color="bg-[#f4212e]" />
      <BundleRow label="After" value="41 KB" width="2.2%" color="bg-repost" />
    </Frame>
  )
}

type Bar = [start: number, width: number, color: string]

const waterfallBefore: Bar[] = [
  [0, 22, 'bg-[#f4212e]'],
  [22, 18, 'bg-[#ff7a45]'],
  [40, 26, 'bg-[#ffad1f]'],
  [66, 14, 'bg-like'],
  [80, 20, 'bg-[#a970ff]'],
]

const waterfallAfter: Bar[] = [
  [0, 6, 'bg-brand'],
  [6, 10, 'bg-repost'],
  [6, 18, 'bg-repost'],
  [6, 26, 'bg-repost'],
  [6, 32, 'bg-repost'],
  [6, 44, 'bg-repost'],
]

function WaterfallBars({ bars }: { bars: Bar[] }) {
  return (
    <>
      {bars.map(([start, width, color]) => (
        <div class="my-[5px] h-3.5">
          <b class={cx('block h-full rounded', color)} style={{ 'margin-left': `${start}%`, width: `${width}%` }} />
        </div>
      ))}
    </>
  )
}

function Waterfall({ flush }: { flush?: boolean }) {
  return (
    <Frame flush={flush} class="bg-[#0b0d10] p-[18px]">
      <ChartTitle>Waterfall of JSON fetches</ChartTitle>
      <WaterfallBars bars={waterfallBefore} />
      <ChartTitle spaced>One cached shell + one SSE stream</ChartTitle>
      <WaterfallBars bars={waterfallAfter} />
    </Frame>
  )
}

export function Media({ media, flush }: { media: MediaData; flush?: boolean }) {
  switch (media.kind) {
    case 'photo':
      return <Photo scene={media.scene} caption={media.caption} flush={flush} />
    case 'link':
      return <LinkCard domain={media.domain} title={media.title} />
    case 'benchmark':
      return <Benchmark flush={flush} />
    case 'code':
      return <CodeSample flush={flush} />
    case 'bundle':
      return <BundleChart flush={flush} />
    case 'waterfall':
      return <Waterfall flush={flush} />
  }
}
