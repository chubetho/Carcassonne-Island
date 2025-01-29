<script setup lang="ts">
import type { BoardState } from '~/types/BoardState'
import PublicHints from '~/components/PublicHints.vue'

const store = useBoardStore()
const { open, onData, status } = useSocket({ beamer: true })
onData(({ type, payload }) => {
  if (type !== 'UpdateBoard')
    return

  const bs = payload as BoardState
  store.players = bs.player_positions
  store.hints = bs.hints
  store.current_day = bs.current_day
  store.treasure_coord = bs.burried_items[0][0]
})

onMounted(() => {
  open()
})
</script>

<template>
  <div
    class="aspect-4/3 max-h-screen overflow-hidden bg-[url(/bg.png)] bg-cover bg-center bg-no-repeat p-2 relative"
  >
    <div class="absolute top-0 right-0 italic text-red-500 bg-white p-2">
      <p>WS status: {{ status }}</p>
    </div>

    <div class="grid grid-cols-16 grid-rows-12 size-full gap-2">
      <div class="col-span-2 row-span-10">
        <PublicPlayers />
      </div>

      <div class="col-span-10 row-span-10 overflow-hidden border border-black rounded">
        <PublicMap />
      </div>

      <div class="col-span-4 row-span-10">
        <PublicHints />
      </div>

      <div class="col-span-16 row-span-2">
        <PublicCalendar />
      </div>
    </div>
  </div>
</template>
