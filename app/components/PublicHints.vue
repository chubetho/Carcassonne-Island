<script setup lang="ts">
</script>

<template>
  <ul class="h-full flex flex-wrap gap-4">
    <li
      v-for="i in 6"
      :key="i"
      class="h-fit basis-[calc(50%-8px)]"
    >
      <div class="h-full flex flex-col items-center gap-1">
        <div class="size-full min-h-[150px] overflow-hidden border border-black rounded">
          <span class="text-[var(--color-black)]">hint</span>
        </div>
      </div>
    </li>
  </ul>
</template>
