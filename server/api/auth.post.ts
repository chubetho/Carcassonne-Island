import { Board } from '../game/board'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const uuid = body.uuid
  const board = Board.get()
  return board.players.includes(uuid)
})
