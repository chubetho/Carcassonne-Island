<script setup lang="ts">
</script>

<template>
  <ul class="h-full flex flex-col gap-1">
    <li
      v-for="i in 4"
      :key="i"
      class="h-full flex justify-center items-center grow"
    >
      <div
        class="overflow-hidden border-2 rounded"
        :class="true ? 'opacity-100 border-[var(--ui-primary)]' : 'opacity-50 border-black'"
      >
        <img :src="`/players/player_${i}.png`">
      </div>
    </li>

    <li
      class="h-full flex justify-center items-center grow"
    >
      <div class="overflow-hidden border-2 border-[var(--ui-primary)] rounded">
        <img src="/players/john.png">
      </div>
    </li>
  </ul>
</template>
