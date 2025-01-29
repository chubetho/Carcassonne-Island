import { sessionConfig } from '../constants'

const ROOM_ID = 'room'

export default defineWebSocketHandler({
  async open(peer) {
    const session = await useSession(peer, sessionConfig)

    peer.send(`Hello, ${session.id}!`)
    peer.publish(ROOM_ID, `${session.id} joined`)
    peer.subscribe(ROOM_ID)
  },
  async message(peer, message) {
    const session = await useSession(peer, sessionConfig)

    peer.send(message)
    peer.publish(ROOM_ID, `${session.id}: ${message}`)
  },
  async upgrade(request) {
    await useSession(request, sessionConfig)
    return {}
  },
  async close(peer) {
    const session = await useSession(peer, sessionConfig)

    peer.publish(ROOM_ID, `${session.id} left!`)
  },
})
