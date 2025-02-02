import { getPlayer } from '../utils/player'

// Get current player in session
export default defineEventHandler(async (event) => {
  const player = await getPlayer(event)
  return player
})
