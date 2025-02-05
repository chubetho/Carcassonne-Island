import type { SendPayload } from '#shared/types'
import type { Peer } from 'crossws'
import { destr } from 'destr'
import { sessionConfig } from '../constants'
import { Board } from '../game/board'

const ROOM_ID = 'room'
const board = Board.get()
let count = 0

// Create route to connect to this websocket
export default defineWebSocketHandler({
  async open(peer) {
    peer.subscribe(ROOM_ID)
  },

  async upgrade(request) {
    const session = await useSession(request, sessionConfig)
    console.log({ id: session.id, data: session.data })
  },

  async message(peer, message) {
    const id = await getId(peer)
    const msg = destr<SendPayload>(message.text())
    switch (msg.type) {
      case 'CHOOSE_CHARACTER':{
        const _id = id ?? count.toString()
        count++
        board.characters[msg.content] = _id
        console.log(board.characters)
        break
      }

      case 'MOVE':{
        peer.publish(ROOM_ID, msg)
        break
      }
    }
  },

  async close(peer) {
    const id = await getId(peer)
    peer.publish(ROOM_ID, `${id} left!`)
  },
})

async function getId(peer: Peer) {
  try {
    const session = await useSession(peer, sessionConfig)
    return session.id as string
  }
  catch {
    return undefined
  }
}
