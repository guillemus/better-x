import { Hono } from 'hono'
import { streamHome } from './home-stream'
import { HomePage } from './page'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400')
  return c.render(<HomePage />)
})

app.get('/home/stream', () => streamHome())

export default app
