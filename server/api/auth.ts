import { randomUUID } from 'node:crypto'

export default defineEventHandler(async () => {
  const uuid = randomUUID()
  console.log(uuid)
})
