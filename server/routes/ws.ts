import type { SendPayload } from '#shared/types'
import type { Peer } from 'crossws'
import { destr } from 'destr'
import { sessionConfig } from '../constants'
import { Board } from '../game/board'

const ROOM_ID = 'room'
const board = Board.get()

export default defineWebSocketHandler({
  async open(peer) {
    peer.subscribe(ROOM_ID)
  },

  async message(peer, message) {
    const id = await getId(peer)
    const msg = destr<SendPayload>(message.text())
    switch (msg.type) {
      case 'CHOOSE_CHARACTER':{
        board.players[msg.content] = id
        console.log(board.players)
        break
      }

      case 'MOVE':{
        console.log(msg)
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
  const session = await useSession(peer, sessionConfig)
  return session.id
}
