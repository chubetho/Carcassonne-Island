export default defineEventHandler(async (event) => {
  const body = await readBody<{ data: string }>(event)
  const storage = useStorage()
  await storage.set('map', body.data)
})
