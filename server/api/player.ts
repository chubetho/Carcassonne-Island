import { getPlayer } from '../utils/player'

export default defineEventHandler(async (event) => {
  const player = await getPlayer(event)
  return player
})
