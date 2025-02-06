<script setup lang="ts">
const { open, onData } = useSocket()
const coord = shallowRef<[number, number]>([0, 0])
const range = ref<number>(0)
const uuid = useSessionStorage('auth', '')

onMounted(async () => {
  const authenticated = await $fetch('/api/auth', {
    method: 'POST',
    body: { uuid: uuid.value },
  })

  if (!authenticated) {
    navigateTo('/')
    return
  }

  open()
})

onData((d) => {
  console.log(d)
})
</script>

<template>
  <div
    class="size-full flex gap-2 overflow-hidden bg-[url(/bg.png)] bg-cover bg-center bg-no-repeat"
    style="
      padding-top: env(safe-area-inset-top);
      padding-right: env(safe-area-inset-right);
      padding-bottom: env(safe-area-inset-bottom);
      padding-left: env(safe-area-inset-left);
    "
  >
    <PrivateMap
      class="shrink-0"
      :range="range"
      @update-coord="v => coord = v"
    />

    <div class="grow border border-black p-2 text-black" />
  </div>
</template>
