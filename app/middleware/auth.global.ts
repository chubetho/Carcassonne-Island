export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/' || to.path === '/public')
    return

  const player = await $fetch('/api/player')
  if (player)
    return

  return navigateTo('/')
})
