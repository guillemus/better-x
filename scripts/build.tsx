import { readFileSync, writeFileSync } from 'node:fs'
import { Page } from '../src/page'
import { fragments } from '../src/worker'

const css = readFileSync('.build/styles.css', 'utf8')
const html = <Page css={css} queryCount={fragments.length} />

writeFileSync('public/index.html', html.toString())
