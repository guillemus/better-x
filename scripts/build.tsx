import { readFileSync, writeFileSync } from 'node:fs'
import { Page } from '../src/page'
import { renderToString } from '../src/render'
import { fragments } from '../src/worker'

const css = readFileSync('.build/styles.css', 'utf8')
const html = <Page css={css} queryCount={fragments.length} />

writeFileSync('public/index.html', await renderToString(html))
