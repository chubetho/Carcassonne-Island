import { defineNitroPlugin } from 'nitropack/runtime'
import { sessionConfig } from '../constants'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('request', async (event) => {
    await useSession(event, sessionConfig)
  })
})
