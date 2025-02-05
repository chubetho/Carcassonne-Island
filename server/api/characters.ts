import { Board } from '../game/board'

// Get available characters to choose
export default defineEventHandler(() => {
  const board = Board.get()
  const characters = Object.entries(board.characters).flatMap(([k, v]) => v ? [] : [k])
  return characters
})
