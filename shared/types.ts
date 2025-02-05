export type Character = 'p1' | 'p2' | 'p3' | 'p4' | 'lj'

export type SendPayload = { uuid: string } &
  ({
    type: 'CHOOSE_CHARACTER'
    content: Character
  } |
  {
    type: 'MOVE'
    content: {
      character: Character
      coord: [number, number]
    }
  })
