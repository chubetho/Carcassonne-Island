<script setup lang="ts">
const { data: player } = await useFetch('/api/player')

const { open, status } = useSocket()
const coord = shallowRef<[number, number]>([0, 0])
const range = ref<number>()

onMounted(open)
</script>

<template>
  <div
    class="size-full flex gap-2 overflow-hidden bg-[url(/bg.png)] bg-cover bg-center bg-no-repeat p-2"
  >
    <PrivateMap
      class="shrink-0"
      :range="range"
      @update-coord="v => coord = v"
    />

    <div class="grow border border-black p-2 text-black">
      <pre>
        {{ player }}
      </pre>

      <div class="mt-4" />

      <div class="mt-4 italic">
        <p>WS status: {{ status }}</p>
      </div>
    </div>
  </div>
</template>
