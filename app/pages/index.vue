<script setup lang="ts">
import type { Character } from '~~/shared/types'
import { characters as all } from '~~/shared/constants'

const { open, send } = useSocket()
const state = ref<'idle' | 'joining' | 'joined'>('idle')

const { data: player } = await useFetch('/api/player')
// If player has joined before
if (player.value) {
  state.value = 'joined'
  navigateTo('/private')
}

const characters = ref(all)

const character = ref<Character | ''>('')
const error = ref('')

async function join() {
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
        <template v-if="state === 'idle'">
          Click button below to join.
        </template>

        <template v-if="state === 'joining'">
          Select a character.
        </template>
      </template>

      <div v-if="state === 'idle'">
        <ul class="grid gap-3">
          <li
            v-for="i in 5"
            :key="i"
            class="flex gap-2"
          >
            <USkeleton class="size-5 shrink-0 rounded-full" />
            <div class="grid gap-1 w-full">
              <USkeleton class="h-4 w-30" />
              <USkeleton class="h-4 w-full" />
            </div>
          </li>
        </ul>
      </div>

      <div v-if="state === 'joining'">
        <URadioGroup
          v-model="character"
          :items="characters as any"
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
