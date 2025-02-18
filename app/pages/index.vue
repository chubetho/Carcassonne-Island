<script setup lang="ts">
import type { Character } from '~~/shared/types'
import { characters as all } from '~~/shared/constants'

const { open, send } = useSocket()
const uuid = useSessionStorage('auth', '')
const state = ref<'idle' | 'joining' | 'joined'>('idle')
const dialogOpen = ref(false)

onMounted(async () => {
  const authenticated = await $fetch('/api/auth', {
    method: 'POST',
    body: { uuid: uuid.value },
  })

  if (authenticated) {
    navigateTo('/private')
  }
})

const characters = ref(all)

const character = ref<Character | ''>('')
const error = ref('')

async function join() {
  const _uuid = await $fetch('/api/auth')
  uuid.value = _uuid

  state.value = 'joining'
  open()

  const data = await $fetch('/api/characters')
  if (data) {
    characters.value = all.filter(c => data.includes(c.value))
  }
}

async function confirm() {
  if (!character.value) {
    error.value = 'Please select a character.'
    return
  }

  error.value = ''
  send({
    uuid: uuid.value,
    type: 'CHOOSE_CHARACTER',
    content: character.value,
  })
  state.value = 'joined'
  navigateTo(`/private`)
}
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <UCard
      v-if="state !== 'joined'"
      class="min-w-[500px]"
      :ui="{ footer: 'flex justify-end' }"
    >
      <template #header>
        <div class="flex justify-between items-center">
          <span>
            <template v-if="state === 'idle'">
              Click button below to join.
            </template>

            <template v-if="state === 'joining'">
              Select a character.
            </template>
          </span>

          <UModal v-model:open="dialogOpen" fullscreen title="Custom map">
            <UButton
              icon="i-lucide-settings"
              color="neutral"
              variant="subtle"
              size="sm"
            />

            <template #body>
              <MapUploader @set="dialogOpen = false" />
            </template>
          </UModal>
        </div>
      </template>

      <div v-if="state === 'idle'">
        <ul class="grid grid-cols-2 gap-y-3 gap-x-10">
          <li
            v-for="i in 5"
            :key="i"
            class="flex gap-2"
          >
            <USkeleton class="size-5 shrink-0 rounded-full" />
            <div class="grid gap-1 w-full">
              <USkeleton class="h-3 w-30" />
              <USkeleton class="h-3 w-full" />
            </div>
          </li>
        </ul>
      </div>

      <div v-if="state === 'joining'">
        <URadioGroup
          v-model="character"
          :items="characters as any"
          :ui="{
            fieldset: 'grid grid-cols-2 gap-3',
          }"
        />

        <p class="text-[var(--ui-error)] text-sm mt-4">
          {{ error }}
        </p>
      </div>

      <template #footer>
        <UButton
          v-if="state === 'idle'"
          @click="join"
        >
          Join
        </UButton>

        <UButton
          v-if="state === 'joining'"
          color="warning"
          @click="confirm"
        >
          Confirm
        </UButton>
      </template>
    </UCard>
  </div>
</template>
