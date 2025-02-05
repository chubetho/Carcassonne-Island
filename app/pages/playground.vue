<script setup lang="ts">
import Croppie from 'croppie'
import 'croppie/croppie.css'

const croppie = shallowRef<Croppie>()
const img = useTemplateRef('img')
const url = ref('')

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
      enableResize: false,
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

async function crop() {
  const result = await croppie.value?.result({
    circle: false,
    format: 'png',
    quality: 1,
    size: 'viewport',
    type: 'base64',
  })
  if (result)
    url.value = result
}

async function done() {
  await $fetch('/api/map', {
    method: 'POST',
    body: {
      data: url.value,
    },
  })
}
</script>

<template>
  <div class="h-[100lvh] p-6 overflow-y-scroll">
    <h1 class="text-2xl tracking-wide underline mb-6">
      Playground
    </h1>

    <div class="h-full flex flex-col gap-4">
      <div class="flex gap-2">
        <UButton>
          <label>
            Upload a photo
            <input
              type="file"
              accept="image/*"
              class="sr-only"
              @change="change"
            >
          </label>
        </UButton>

        <UButton @click="crop">
          Crop
        </UButton>

        <UButton
          v-if="url"
          color="warning"
          @click="done"
        >
          Done
        </UButton>
      </div>

      <div class="grow -mx-6">
        <img
          ref="img"
          alt="Preview"
          class="sr-only"
        >
      </div>

      <img src="" alt="">
    </div>
  </div>
</template>
