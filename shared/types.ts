import type { characters } from './constants'

export type Character = (typeof characters)[number]['value']

export type SendPayload = {
  type: 'CHOOSE_CHARACTER'
  content: Character
} |
{
  type: 'MOVE'
  content: {
    character: Character
    coord: [number, number]
  }
}
