import { Hono } from 'hono'
import { Timeline } from './components/post'
import { streamHome } from './home-stream'
import { HomePage } from './page'
import { getFollowing, getForYou, startHomeQueries } from './queries'
import { renderer, streamingRenderer } from './renderer'

const app = new Hono()

app.get('/', renderer, (c) => {
  c.header('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400')
  return c.render(<HomePage />)
})

app.get('/streamed', streamingRenderer, (c) => {
  c.header('Cache-Control', 'private, no-store')
  return c.render(<HomePage data={startHomeQueries()} />)
})

app.get('/home/stream', () => streamHome())
app.get('/home/timeline/for-you', async (c) => c.html(<Timeline id="for-you" timeline={await getForYou()} />))
app.get('/home/timeline/following', async (c) => c.html(<Timeline id="following" timeline={await getFollowing()} />))

export default app
