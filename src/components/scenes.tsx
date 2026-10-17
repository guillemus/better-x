import type { JSX } from 'hono/jsx/jsx-runtime'
import type { Scene } from '../types'

const range = (n: number) => Array.from({ length: n }, (_, i) => i)

function Gradient({ id, stops, horizontal }: { id: string; stops: [number, string][]; horizontal?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={horizontal ? '1' : '0'} y2={horizontal ? '0' : '1'}>
      {stops.map(([offset, color]) => (
        <stop offset={offset} stop-color={color} />
      ))}
    </linearGradient>
  )
}

function Mountains() {
  return (
    <>
      <Gradient id="mountains-sky" stops={[[0, '#5b8def'], [0.6, '#f6c59c'], [1, '#f7e3c8']]} />
      <rect width="600" height="340" fill="url(#mountains-sky)" />
      <circle cx="430" cy="150" r="38" fill="#fff4d6" />
      <path d="M0 250 120 120 210 210 300 90 420 230 510 140 600 220V340H0z" fill="#5a6b91" />
      <path d="M0 290 90 200 190 270 320 170 450 280 560 210 600 240V340H0z" fill="#3b4a6b" />
      <ellipse cx="150" cy="235" rx="160" ry="18" fill="#fff" opacity="0.75" />
      <ellipse cx="470" cy="260" rx="190" ry="20" fill="#fff" opacity="0.7" />
      <path d="M0 320 140 260 260 310 400 250 600 315V340H0z" fill="#1f2a40" />
    </>
  )
}

function Sunset() {
  return (
    <>
      <Gradient id="sunset-sky" stops={[[0, '#2b1055'], [0.45, '#d53369'], [0.7, '#ff9a44']]} />
      <rect width="600" height="340" fill="url(#sunset-sky)" />
      <circle cx="300" cy="230" r="70" fill="#ffd56b" />
      <rect y="228" width="600" height="112" fill="#1b1a3a" />
      <g stroke="#ffb35c" stroke-width="3" stroke-linecap="round" opacity="0.8">
        {[100, 76, 56, 36, 16].map((width, i) => (
          <path d={`M${300 - width / 2} ${248 + i * 14}h${width}`} />
        ))}
      </g>
      <path d="M0 228c40-10 70-6 90-30 18 18 30 26 60 30z" fill="#120f26" />
      <path d="M470 228c20-30 50-50 70-40 20 4 40 24 60 40z" fill="#120f26" />
    </>
  )
}

function Aurora() {
  return (
    <>
      <Gradient id="aurora-sky" stops={[[0, '#050816'], [1, '#0d1b3d']]} />
      <filter id="aurora-blur">
        <feGaussianBlur stdDeviation="18" />
      </filter>
      <rect width="600" height="340" fill="url(#aurora-sky)" />
      <g filter="url(#aurora-blur)" fill="none" opacity="0.9">
        <path d="M-20 200C100 80 220 220 340 110S560 60 640 140" stroke="#33ffa8" stroke-width="46" />
        <path d="M-20 140C120 60 260 170 380 70S560 40 640 70" stroke="#8a5cff" stroke-width="36" />
        <path d="M60 260C200 180 300 260 420 190S580 160 640 210" stroke="#1de9ff" stroke-width="22" />
      </g>
      <path d="M0 300 80 270 150 295 230 262 330 300 420 268 510 296 600 275V340H0z" fill="#02040b" />
    </>
  )
}

function Datacenter() {
  const ledColor = (rack: number, slot: number) => {
    if ((rack + slot) % 5 === 0) return '#ff4d6d'
    return (rack * slot) % 3 ? '#1de9b6' : '#3d8bff'
  }
  return (
    <>
      <Gradient id="datacenter-glow" horizontal stops={[[0, 'rgba(29,155,240,0.25)'], [0.5, 'rgba(0,0,0,0)'], [1, 'rgba(138,92,255,0.25)']]} />
      <rect width="600" height="340" fill="#060b18" />
      {range(7).map((rack) => (
        <g>
          <rect x={20 + rack * 82} y="40" width="64" height="270" rx="4" fill="#0f1a33" stroke="#1f3566" />
          {range(12).map((slot) => (
            <>
              <rect x={28 + rack * 82} y={52 + slot * 21} width="48" height="12" rx="2" fill="#13244a" />
              <circle cx={70 + rack * 82} cy={58 + slot * 21} r="2.2" fill={ledColor(rack, slot)} />
            </>
          ))}
        </g>
      ))}
      <rect width="600" height="340" fill="url(#datacenter-glow)" />
    </>
  )
}

function Storm() {
  return (
    <>
      <Gradient id="storm-sky" stops={[[0, '#1c1f26'], [1, '#3c4250']]} />
      <rect width="600" height="340" fill="url(#storm-sky)" />
      <ellipse cx="150" cy="70" rx="160" ry="50" fill="#555c6b" />
      <ellipse cx="400" cy="60" rx="200" ry="55" fill="#555c6b" />
      <ellipse cx="300" cy="100" rx="180" ry="40" fill="#4a505d" />
      <path d="M330 110 290 190h34l-28 90 70-110h-38l30-60z" fill="#fff6b0" />
      <g stroke="#8b94a6" stroke-width="2" opacity="0.6">
        {range(40).map((i) => (
          <path d={`M${(i * 37) % 600} ${130 + ((i * 53) % 150)}l-8 18`} />
        ))}
      </g>
    </>
  )
}

function City() {
  const towers = [
    [0, 160, 70],
    [70, 120, 50],
    [120, 190, 80],
    [200, 90, 46],
    [246, 150, 70],
    [316, 60, 40],
    [356, 140, 90],
    [446, 110, 60],
    [506, 170, 94],
  ]
  return (
    <>
      <Gradient id="city-sky" stops={[[0, '#1a1340'], [1, '#f06b5b']]} />
      <rect width="600" height="340" fill="url(#city-sky)" />
      <g fill="#0d0a1f">
        {towers.map(([x, y, width]) => (
          <rect x={x} y={y} width={width} height={340 - y} />
        ))}
      </g>
      <g fill="#ffd27a">
        {range(70).map((i) => (
          <rect x={((i * 89) % 590) + 6} y={200 + ((i * 47) % 130)} width="5" height="7" opacity={0.4 + ((i * 7) % 6) / 10} />
        ))}
      </g>
    </>
  )
}

function Night() {
  return (
    <>
      <rect width="600" height="340" fill="#070b1d" />
      <g fill="#fff">
        {range(60).map((i) => (
          <circle cx={(i * 97) % 600} cy={(i * 61) % 220} r={(i % 3) * 0.6 + 0.6} opacity={0.4 + (i % 5) / 8} />
        ))}
      </g>
      <circle cx="470" cy="80" r="34" fill="#f4f1de" />
      <circle cx="484" cy="72" r="32" fill="#070b1d" />
      <rect y="300" width="600" height="40" fill="#11162b" />
      <path d="M120 300V150" stroke="#2a3150" stroke-width="6" />
      <circle cx="120" cy="148" r="10" fill="#ffd27a" />
      <circle cx="120" cy="148" r="60" fill="#ffd27a" opacity="0.12" />
    </>
  )
}

function Focaccia() {
  return (
    <>
      <rect width="600" height="340" fill="#3b2416" />
      <ellipse cx="300" cy="180" rx="240" ry="130" fill="#d9a441" />
      <ellipse cx="300" cy="170" rx="225" ry="115" fill="#e8b850" />
      <g fill="#8d5a1e" opacity="0.8">
        {range(34).map((i) => (
          <ellipse cx={110 + ((i * 71) % 380)} cy={80 + ((i * 43) % 180)} rx="9" ry="6" />
        ))}
      </g>
      <g fill="#4a6b2a">
        {range(9).map((i) => {
          const x = 150 + ((i * 113) % 300)
          const y = 110 + ((i * 67) % 120)
          return <ellipse cx={x} cy={y} rx="7" ry="12" transform={`rotate(${i * 40} ${x} ${y})`} />
        })}
      </g>
    </>
  )
}

const scenes: Record<Scene, () => JSX.Element> = {
  mountains: Mountains,
  sunset: Sunset,
  aurora: Aurora,
  datacenter: Datacenter,
  storm: Storm,
  city: City,
  night: Night,
  focaccia: Focaccia,
}

export function SceneArt({ scene }: { scene: Scene }) {
  const Art = scenes[scene]
  return (
    <svg class="block aspect-video w-full" viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
      <Art />
    </svg>
  )
}
