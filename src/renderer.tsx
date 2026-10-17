import type { Child } from 'hono/jsx'
import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

const Document = ({ children }: { children?: Child }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Home / Better X</title>
      <meta name="description" content="A cached HTML shell plus one Datastar SSE stream. Every panel streams in as its query resolves." />
      <link rel="icon" href="/favicon.svg" />
      <ViteClient />
      <Link href="/src/style.css" rel="stylesheet" />
      <script type="module" async src="/datastar.js" />
    </head>
    <body class="bg-black font-sans text-[15px]/5 text-ink antialiased">{children}</body>
  </html>
)

export const renderer = jsxRenderer(Document)

export const streamingRenderer = jsxRenderer(Document, { stream: true })
