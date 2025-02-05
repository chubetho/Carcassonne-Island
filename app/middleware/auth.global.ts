const whitelist = ['/', '/public', '/playground']

export default defineNuxtRouteMiddleware(async (to) => {
  if (whitelist.includes(to.path))
    return

  const player = await $fetch('/api/player')
  if (player)
    return

  return navigateTo('/')
})
