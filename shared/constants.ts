import type { Character } from './types'

export const appName = 'Treasure Island'
export const appDescription = appName

export const characters: {
  label: string
  description: string
  value: Character
  disabled: boolean
}[] = [
  {
    label: 'Pirate1',
    description: 'This is the description for Pirate1.',
    value: 'p1',
    disabled: false,
  },
  {
    label: 'Pirate2',
    description: 'This is the description for Pirate2.',
    value: 'p2',
    disabled: false,
  },
  {
    label: 'Pirate3',
    description: 'This is the description for Pirate3.',
    value: 'p3',
    disabled: false,
  },
  {
    label: 'Pirate4',
    description: 'This is the description for Pirate4.',
    value: 'p4',
    disabled: false,
  },
  {
    label: 'LongJohn',
    description: 'This is the description for LongJohn.',
    value: 'lj',
    disabled: false,
  },
]
