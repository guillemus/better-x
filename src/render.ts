import type { JSX } from 'hono/jsx/jsx-runtime'

export async function renderToString(element: JSX.Element) {
  return (await element).toString()
}
