import type { Person } from '../types'
import { cx } from './cx'
import { Icon, VerifiedBadge, type IconName } from './icons'

const token = /(?<=^|\s)([@#][\p{L}_][\p{L}\w]*)/u

export const togglePressed = "el.ariaPressed = String(el.ariaPressed !== 'true')"

export function compact(n: number) {
  if (n < 1_000) return String(n)
  if (n < 10_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K`
  if (n < 1_000_000) return `${Math.round(n / 1_000)}K`
  return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => [
        i > 0 && <br />,
        line.split(token).map((part, j) =>
          j % 2 ? (
            <a class="text-brand hover:underline" href="#">
              {part}
            </a>
          ) : (
            part
          ),
        ),
      ])}
    </>
  )
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

type AvatarProps = {
  person: Person
  size?: number
  showInitials?: boolean
  class?: string
}

export function Avatar({ person, size = 40, showInitials = true, class: className }: AvatarProps) {
  return (
    <span
      class={cx(
        'avatar-gradient inline-flex shrink-0 items-center justify-center font-bold tracking-tight text-white text-shadow-xs',
        person.org ? 'rounded-[22%]' : 'rounded-full',
        className,
      )}
      style={{ '--hue': String(person.hue), width: size, height: size, fontSize: size * 0.36 }}
    >
      {showInitials && initials(person.name)}
    </span>
  )
}

export function Identity({ person, stacked }: { person: Person; stacked?: boolean }) {
  return (
    <>
      <span class="truncate font-bold">{person.name}</span>
      {person.verified && <VerifiedBadge kind={person.verified} />}
      <span class={cx('truncate text-muted', stacked && 'basis-full')}>@{person.handle}</span>
    </>
  )
}

type IconButtonProps = {
  icon: IconName
  label?: string
  small?: boolean
  class?: string
  onClick?: string
}

export function IconButton({ icon, label, small, class: className, onClick }: IconButtonProps) {
  return (
    <button
      class={cx(
        'inline-flex items-center justify-center rounded-full transition-colors',
        small ? '-mx-1 -my-1.5 size-[30px] text-muted hover:bg-brand/10 hover:text-brand' : 'size-[34px] hover:bg-ink/10',
        className,
      )}
      aria-label={label}
      data-on:click={onClick}
    >
      <Icon name={icon} class={small ? 'size-[18px]' : 'size-5'} />
    </button>
  )
}
