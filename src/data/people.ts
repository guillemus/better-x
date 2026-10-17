import type { Person } from '../types'

export const viewer: Person = { name: 'Guillem Garcia', handle: 'g2sans', verified: 'blue', hue: 200 }

export const people = {
  ada: { name: 'Ada Okonkwo', handle: 'adaships', verified: 'blue', hue: 18 },
  marco: { name: 'Marco Bellini', handle: 'marcob', verified: 'blue', hue: 210 },
  hypermedia: { name: 'Hypermedia Daily', handle: 'hypermediadaily', verified: 'gold', hue: 265, org: true },
  sofia: { name: 'Sofia Nakamura', handle: 'sofnak', verified: 'blue', hue: 330 },
  edgeworks: { name: 'Edgeworks', handle: 'edgeworks', verified: 'gold', hue: 28, org: true },
  jonas: { name: 'Jonas Weber', handle: 'jweber_dev', hue: 150 },
  priya: { name: 'Priya Raman', handle: 'priyaraman', verified: 'blue', hue: 290 },
  latencyClub: { name: 'Latency Club', handle: 'latencyclub', verified: 'gold', hue: 190, org: true },
  tomas: { name: 'Tomás Ruiz', handle: 'tomasruiz', hue: 45 },
  noor: { name: 'Noor Haddad', handle: 'noorbuilds', verified: 'blue', hue: 120 },
  betterX: { name: 'Better X', handle: 'betterx', verified: 'gold', hue: 205, org: true },
  kai: { name: 'Kai Lindgren', handle: 'kailind', hue: 240 },
  elena: { name: 'Elena Petrova', handle: 'elenap', verified: 'blue', hue: 0 },
  femi: { name: 'Femi Adebayo', handle: 'femiadebayo', verified: 'blue', hue: 95 },
  ines: { name: 'Inès Moreau', handle: 'inesmoreau', hue: 310 },
  wes: { name: 'Wes Carter', handle: 'wescarter', verified: 'blue', hue: 170 },
  northwind: { name: 'Northwind Compute', handle: 'northwind', verified: 'gold', hue: 220, org: true },
  lucia: { name: 'Lucía Ferrer', handle: 'luciaferrer', verified: 'blue', hue: 350 },
  dev: { name: 'Dev Patel', handle: 'devonthewire', hue: 60 },
  mira: { name: 'Mira Solberg', handle: 'mirasol', verified: 'blue', hue: 275 },
  oscar: { name: 'Óscar Vidal', handle: 'oscarvidal', hue: 15 },
  hana: { name: 'Hana Kim', handle: 'hanakim', verified: 'blue', hue: 185 },
  systemsWeekly: { name: 'Systems Weekly', handle: 'systemsweekly', verified: 'gold', hue: 10, org: true },
  bcnFrontend: { name: 'BCN Frontend', handle: 'bcnfrontend', hue: 50, org: true },
} satisfies Record<string, Person>

export type PersonKey = keyof typeof people
