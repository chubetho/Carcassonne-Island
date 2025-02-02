<script setup lang="ts">
const edge = 15
</script>

<template>
  <div class="relative size-full">
    <img src="/map.png" alt="map" class="aspect-square size-full">

    <ul
      class="group absolute inset-0 z-1 grid size-full"
      :style="{
        gridTemplateColumns: `repeat(${edge},minmax(0,1fr))`,
        gridTemplateRows: `repeat(${edge},minmax(0,1fr))`,
      }"
    >
      <template v-for="y in edge" :key="`y:${y}`">
        <template v-for="x in edge" :key="`x:${x}`">
          <!-- <li
            v-if="store.treasure_coord"
            class="cursor-pointer border-[0.5px] border-black/50"
            :class="{
              'bg-[var(--ui-warning)]': store.treasure_coord[0] === x && store.treasure_coord[1] === y,
            }"
          />

          <li
            v-else-if="players.find(p => p[0] === x && p[1] === y)"
            class="cursor-pointer border-[0.5px] border-black/50 bg-[var(--ui-info)]"
          /> -->

          <li class="cursor-pointer border-[0.5px] border-black/50" />
        </template>
      </template>
    </ul>
  </div>
</template>
