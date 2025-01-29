<script setup>
const { status, data, send, open, close } = useWebSocket('/ws', {
  immediate: false,
})

watch(data, async (v) => {
  if (typeof v === 'string') {
    console.log(v)
    return
  }

  // @ts-expect-error bug?
  console.log(await v.text())
})
</script>

<template>
  <div>
    <p>Status: {{ status }}</p>
    <p>Data: {{ data }}</p>
    <div class="flex gap-2">
      <button class="btn" @click="open">
        Open
      </button>
      <button class="btn" @click="close(1000, 'Closing')">
        Close
      </button>
      <button class="btn" @click="send('hello')">
        Send hello
      </button>
    </div>
  </div>
</template>
