import { cx } from './cx'
import type { Verified as VerifiedKind } from '../types'

const glyphs = {
  home: <path fill="currentColor" stroke="none" d="M12 1.7 1.6 9.6l1.2 1.6L4 10.3V21a1 1 0 0 0 1 1h5v-6.5h4V22h5a1 1 0 0 0 1-1V10.3l1.2.9 1.2-1.6z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7.5" />
      <path d="m21 21-4.6-4.6" />
    </>
  ),
  bell: (
    <>
      <path d="M10.27 21a2 2 0 0 0 3.46 0" />
      <path d="M3.26 15.33A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.67C19.41 13.96 18 12.5 18 8A6 6 0 0 0 6 8c0 4.5-1.41 5.96-2.74 7.33" />
    </>
  ),
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  spark: (
    <>
      <path d="M12 2.5c.6 4.6 2.9 6.9 7.5 7.5-4.6.6-6.9 2.9-7.5 7.5-.6-4.6-2.9-6.9-7.5-7.5 4.6-.6 6.9-2.9 7.5-7.5z" />
      <path d="M19 15.5c.25 1.9 1.1 2.75 3 3-1.9.25-2.75 1.1-3 3-.25-1.9-1.1-2.75-3-3 1.9-.25 2.75-1.1 3-3z" />
    </>
  ),
  subscription: (
    <>
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  bookmark: <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />,
  article: (
    <>
      <path d="M12.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v9.5" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M13.38 15.63a1 1 0 1 0-3-3l-5.01 5a2 2 0 0 0-.51.86l-.84 2.87a.5.5 0 0 0 .62.62l2.87-.84a2 2 0 0 0 .86-.5z" />
    </>
  ),
  profile: (
    <>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </>
  ),
  more: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M7.5 12h.01M12 12h.01M16.5 12h.01" stroke-width="2.6" />
    </>
  ),
  image: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21" />
    </>
  ),
  gif: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M10 9.5H8a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h1.5a.5.5 0 0 0 .5-.5V12H8.8M12.5 9.5v5M15 14.5v-5h2.5M15 12h2" />
    </>
  ),
  list: <path d="M3 6h.01M3 12h.01M3 18h.01M8 6h13M8 12h13M8 18h13" />,
  emoji: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
    </>
  ),
  schedule: (
    <>
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5M16 2v4M8 2v4M3 10h5" />
      <path d="M17.5 17.5 16 16.3V14" />
      <circle cx="16" cy="16" r="6" />
    </>
  ),
  location: (
    <>
      <path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  flag: <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />,
  reply: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  repost: (
    <>
      <path d="m17 2 4 4-4 4" />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      <path d="m7 22-4-4 4-4" />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </>
  ),
  like: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  views: <path d="M4 21v-7M9.33 21V9M14.67 21V3M20 21v-10" />,
  share: (
    <>
      <path d="M12 3v12" />
      <path d="m16.5 7.5-4.5-4.5-4.5 4.5" />
      <path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
    </>
  ),
  dots: (
    <g fill="currentColor" stroke="none">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </g>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  plus: <path d="M5 12h14M12 5v14" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  bolt: <path d="M13 2 3 14h9l-1 8 10-12h-9z" />,
  explain: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M5 19 19 5" />
    </>
  ),
}

export type IconName = keyof typeof glyphs

export function Icon({ name, class: className = 'size-5' }: { name: IconName; class?: string }) {
  return (
    <svg
      class={cx('shrink-0', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {glyphs[name]}
    </svg>
  )
}

export function VerifiedBadge({ kind }: { kind: VerifiedKind }) {
  return (
    <svg class={cx('ml-0.5 size-[18px] shrink-0', kind === 'gold' ? 'text-gold' : 'text-brand')} viewBox="0 0 24 24" aria-label="Verified">
      <path
        fill="currentColor"
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
      />
      <path d="m8.5 12.2 2.4 2.4 4.6-4.9" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export function Logo() {
  return (
    <svg class="size-8" viewBox="0 0 40 40" aria-label="Better X">
      <rect x="1" y="1" width="38" height="38" rx="11" fill="none" stroke="currentColor" stroke-width="2.2" />
      <path d="M11.5 12.5 28.5 27.5M28.5 12.5 11.5 27.5" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" />
      <circle cx="31" cy="9" r="4.2" fill="#1d9bf0" stroke="#000" stroke-width="2" />
    </svg>
  )
}
