import type { Trend } from '../types'
import type { PersonKey } from './people'

export const headlines = [
  { title: 'Edge Runtimes Hit Sub-Millisecond Cold Starts in New Benchmark', category: 'Technology' },
  { title: 'Developers Debate Ditching Client-Side Routers as Streaming HTML Matures', category: 'Technology' },
  { title: 'Hypermedia Frameworks See Record Downloads as Teams Shrink Bundles', category: 'Other' },
  { title: 'Browser Vendors Agree on Faster View Transitions Across Documents', category: 'Technology' },
  { title: 'Barcelona Tech Week Draws Thousands to Poblenou', category: 'Events' },
  { title: 'Open-Source Compiler Rewrite Claims 3x Faster Type Checking', category: 'Other' },
  { title: 'Study Finds Users Abandon Pages After 2.8 Seconds of Spinners', category: 'Science' },
]

export const trends: Omit<Trend, 'posts'>[] = [
  { context: 'Trending in Spain', name: 'Datastar' },
  { context: 'Trending', name: 'Server-Sent Events' },
  { context: 'Technology · Trending', name: '#EdgeCaching' },
  { context: 'Trending in Spain', name: 'Poblenou' },
  { context: 'Sports · Trending', name: 'Clásico' },
  { context: 'Trending', name: 'p99' },
  { context: 'Music · Trending', name: 'Primavera Sound' },
  { context: 'Trending in Spain', name: '#TechWeekBCN' },
  { context: 'Technology · Trending', name: 'Hypermedia' },
]

export const suggestions: PersonKey[] = ['mira', 'hana', 'systemsWeekly', 'femi', 'noor', 'elena', 'latencyClub', 'hypermedia']
