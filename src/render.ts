import type { JSX } from 'hono/jsx/jsx-runtime'

export async function renderToString(element: JSX.Element | string) {
  return (await element).toString()
}
