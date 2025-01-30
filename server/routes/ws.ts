import type { SendPayload } from '#shared/types'
import type { Message, Peer } from 'crossws'
import { destr } from 'destr'
import { sessionConfig } from '../constants'
import { Board } from '../game/board'

const ROOM_ID = 'room'

const board = Board.get()

export default defineWebSocketHandler({
  async open(peer) {
    const id = await getId(peer)
    const player = Object.entries(board.players).find(([_, v]) => v === id)
    if (player) {
      peer.send(`You have selected ${player[0]}`)
    }

    peer.subscribe(ROOM_ID)
  },

  async message(peer, message) {
    const id = await getId(peer)

    const msg = destr<SendPayload>(message.text())
    board.players[msg.content] = id
    peer.publish(ROOM_ID, msg)

    console.log(board.players)
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
