export default defineEventHandler(async () => {
  const storage = useStorage()
  const url = await storage.get('map')
  return url
})
