import { Hono } from 'hono'
import { Timeline } from './components/post'
import { streamHome } from './home-stream'
import { HomePage } from './page'
import { getFollowing, getForYou } from './queries'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  c.header('Cache-Control', 'public, max-age=300, stale-while-revalidate=86400')
  return c.render(<HomePage />)
})

app.get('/home/stream', () => streamHome())
app.get('/home/timeline/for-you', async (c) => c.html(<Timeline id="for-you" timeline={await getForYou()} />))
app.get('/home/timeline/following', async (c) => c.html(<Timeline id="following" timeline={await getFollowing()} />))

export default app
