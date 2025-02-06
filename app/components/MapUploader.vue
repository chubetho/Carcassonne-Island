<script setup lang="ts">
import Croppie from 'croppie'
import 'croppie/croppie.css'

const emit = defineEmits<{
  set: []
}>()

const croppie = shallowRef<Croppie>()
const img = useTemplateRef('img')

function change(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (e) => {
    if (typeof e.target?.result !== 'string')
      return

    if (!img.value)
      return

    img.value.src = e.target.result
    croppie.value = new Croppie(img.value, {
      enableResize: true,
      showZoomer: false,
      viewport: {
        width: 400,
        height: 400,
        type: 'square',
      },
    })
  }
  reader.readAsDataURL(file)
}

async function set() {
  const result = await croppie.value?.result({
    circle: false,
    format: 'png',
    quality: 1,
    size: 'viewport',
    type: 'base64',
  })

  if (!result)
    return

  await $fetch('/api/map', {
    method: 'POST',
    body: { data: result },
  })

  emit('set')
}
</script>

<template>
  <div class="h-full flex flex-col gap-4">
    <div class="flex gap-2">
      <UButton>
        <label>
          Upload
          <input
            type="file"
            accept="image/*"
            class="sr-only"
            @change="change"
          >
        </label>
      </UButton>

      <UButton
        v-if="croppie"
        color="warning"
        @click="set"
      >
        Set
      </UButton>
    </div>

    <div class="grow">
      <img ref="img" alt="" class="sr-only">
    </div>
  </div>
</template>
