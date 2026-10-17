export class Html {
  constructor(readonly value: string) {}

  toString() {
    return this.value
  }
}

export type Child = Html | string | number | boolean | null | undefined | Child[]

type Style = Record<string, string | number>

type Props = {
  children?: Child
  style?: string | Style
  [attribute: string]: unknown
}

type Component<P = any> = (props: P) => Html

const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'wbr'])

const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }

export function escape(value: string) {
  return value.replace(/[&<>"]/g, (char) => entities[char])
}

export function raw(value: string) {
  return new Html(value)
}

function renderChildren(child: Child): string {
  if (child == null || typeof child === 'boolean') return ''
  if (child instanceof Html) return child.value
  if (Array.isArray(child)) return child.map(renderChildren).join('')
  return escape(String(child))
}

function renderStyle(style: string | Style) {
  if (typeof style === 'string') return style
  return Object.entries(style)
    .map(([property, value]) => `${property}:${value}`)
    .join(';')
}

function renderAttributes(props: Props) {
  let out = ''
  for (const [name, value] of Object.entries(props)) {
    if (name === 'children' || value == null || value === false) continue
    if (value === true) {
      out += ` ${name}`
      continue
    }
    const text = name === 'style' ? renderStyle(value as string | Style) : String(value)
    out += ` ${name}="${escape(text)}"`
  }
  return out
}

export function jsx(type: string | Component, props: Props): Html {
  if (typeof type === 'function') return type(props)
  const open = `<${type}${renderAttributes(props)}>`
  if (voidTags.has(type)) return new Html(open)
  return new Html(`${open}${renderChildren(props.children)}</${type}>`)
}

export function Fragment({ children }: { children?: Child }) {
  return new Html(renderChildren(children))
}

export { jsx as jsxs, jsx as jsxDEV }

export namespace JSX {
  export type Element = Html

  export interface ElementChildrenAttribute {
    children: {}
  }

  export interface IntrinsicElements {
    [tag: string]: Props
  }
}
