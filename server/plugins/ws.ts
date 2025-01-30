import { defineNitroPlugin } from 'nitropack/runtime'
import { sessionConfig } from '../constants'
import { Board } from '../game/board'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    await useSession(event, sessionConfig)
    Board.get()
  })
})
