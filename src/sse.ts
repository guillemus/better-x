import type { JSX } from 'hono/jsx/jsx-runtime'
import { renderToString } from './render'

type PatchOptions = {
  selector?: string
  mode?: 'outer' | 'inner' | 'replace' | 'prepend' | 'append' | 'before' | 'after' | 'remove'
}

const encoder = new TextEncoder()

export class DatastarStream {
  readonly response: Response
  private readonly writer: WritableStreamDefaultWriter<Uint8Array>

  constructor() {
    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    this.writer = writable.getWriter()
    this.response = new Response(readable, {
      headers: {
        'content-type': 'text/event-stream; charset=utf-8',
        'cache-control': 'no-store',
      },
    })
  }

  async patchElements(elements: JSX.Element | string, { selector, mode }: PatchOptions = {}) {
    const html = await renderToString(elements)
    const lines = ['event: datastar-patch-elements']
    if (selector) lines.push(`data: selector ${selector}`)
    if (mode) lines.push(`data: mode ${mode}`)
    for (const line of html.split('\n')) lines.push(`data: elements ${line}`)
    return this.writer.write(encoder.encode(`${lines.join('\n')}\n\n`))
  }

  close() {
    return this.writer.close()
  }
}
