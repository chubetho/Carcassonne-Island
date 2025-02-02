<script setup lang="ts">
const dates = [
  { date: 1, weekday: 'Friday' },
  { date: 2, weekday: 'Saturday' },
  { date: 3, weekday: 'Sunday' },
  { date: 4, weekday: 'Monday' },
  { date: 5, weekday: 'Tuesday' },
  { date: 6, weekday: 'Wednesday' },
  { date: 7, weekday: 'Thursday' },
  { date: 8, weekday: 'Friday' },
  { date: 9, weekday: 'Saturday' },
  { date: 10, weekday: 'Sunday' },
  { date: 11, weekday: 'Monday' },
  { date: 12, weekday: 'Tuesday' },
  { date: 13, weekday: 'Wednesday' },
  { date: 14, weekday: 'Thursday' },
  { date: 15, weekday: 'Friday' },
  { date: 16, weekday: 'Saturday' },
  { date: 17, weekday: 'Sunday' },
  { date: 18, weekday: 'Monday' },
  { date: 19, weekday: 'Tuesday' },
]
</script>

<template>
  <ul class="grid grid-cols-10 h-full gap-2">
    <li
      class="h-full overflow-hidden border border-black rounded"
    />

    <li
      v-for="(d) in dates"
      :key="d.date"
      class="h-full overflow-hidden border border-black rounded bg-white"
    >
      <div class="relative h-full flex flex-col">
        <div
          class="flex items-center justify-center text-white font-bold"
          :data-date="d.date"
          :class="d.date > 7 ? 'bg-black' : 'bg-gray-400'"
        >
          {{ d.weekday.substring(0, 3) }}
        </div>

        <div
          class="flex grow items-center justify-center text-2xl"
          :class="true ? 'text-[var(--ui-error)]' : 'text-black'"
        >
          {{ d.date }}
        </div>

        <div v-if="true" class="absolute left-1/2 top-1/2 size-12 overflow-hidden border border-black rounded-full -translate-x-1/2 -translate-y-1/2">
          <img :src="`/players/player_sm_${1}.png`">
        </div>
      </div>
    </li>
  </ul>
</template>
