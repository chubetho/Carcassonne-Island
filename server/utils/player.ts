import type { H3Event } from 'h3'
import type { Character } from '~~/shared/types'
import { sessionConfig } from '../constants'
import { Board } from '../game/board'

export async function getPlayer(event: H3Event) {
  const board = Board.get()
  const session = await useSession(event, sessionConfig)
  const player = Object.entries(board.players).find(([_, v]) => v === session.id)
  if (!player)
    return

  return {
    character: player[0] as Character,
    id: player[1],
  }
}
