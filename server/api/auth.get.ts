import { randomUUID } from 'node:crypto'
import { Board } from '../game/board'

export default defineEventHandler(async () => {
  const board = Board.get()
  const uuid = randomUUID()
  board.players.push(uuid)
  return uuid
})
