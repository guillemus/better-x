import { jsxRenderer } from 'hono/jsx-renderer'
import { Link, ViteClient } from 'vite-ssr-components/hono'

const favicon =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'><rect width='40' height='40' rx='11'/><path d='M12 12 28 28M28 12 12 28' stroke='white' stroke-width='3.6' stroke-linecap='round'/></svg>"

export const renderer = jsxRenderer(({ children }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Home / Better X</title>
      <meta name="description" content="A cached HTML shell plus one Datastar SSE stream. Every panel streams in as its query resolves." />
      <link rel="icon" href={favicon} />
      <ViteClient />
      <Link href="/src/style.css" rel="stylesheet" />
      <script type="module" src="/datastar.js" />
    </head>
    <body class="bg-black font-sans text-[15px]/5 text-ink antialiased">{children}</body>
  </html>
))
