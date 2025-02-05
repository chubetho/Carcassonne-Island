import type { SendPayload } from '#shared/types'
import { destr } from 'destr'
import { Board } from '../game/board'

const ROOM_ID = 'room'
const board = Board.get()

// Create route to connect to this websocket
export default defineWebSocketHandler({
  async open(peer) {
    peer.subscribe(ROOM_ID)
  },

  async message(peer, message) {
    const msg = destr<SendPayload>(message.text())
    switch (msg.type) {
      case 'CHOOSE_CHARACTER':{
        board.characters[msg.content] = msg.uuid
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
    peer.publish(ROOM_ID, `left!`)
  },
})
