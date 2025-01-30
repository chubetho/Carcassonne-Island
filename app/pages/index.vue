<script setup lang="ts">
import { characters as all } from '../../shared/constants'

const state = ref<'idle' | 'joining' | 'joined'>('idle')

const { open, send } = useSocket()

// If player has joined before
const {
  data: player,
  execute: executePlayer,
} = await useFetch('/api/player', { immediate: false })
watch(player, (v) => {
  if (!v)
    return

  state.value = 'joined'
  if (player.value?.id)
    navigateTo(`/private/${player.value.id}`)
}, { once: true })
onMounted(async () => {
  await executePlayer()
})

const {
  data: _characters,
  execute: executeCharacters,
} = await useFetch('/api/characters', { immediate: false })

const characters = computed(() => {
  if (_characters.value)
    return all.filter(c => _characters.value?.includes(c.value))

  return all
})

const character = ref<typeof characters.value[number]['value'] | ''>('')
const error = ref('')

async function join() {
  state.value = 'joining'
  open()
  await executeCharacters()
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
  await executePlayer()
  if (player.value?.id)
    navigateTo(`/private/${player.value.id}`)
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
          Please join
        </template>

        <template v-if="state === 'joining'">
          Select character
        </template>
      </template>

      <div>
        <URadioGroup
          v-model="character"
          :items="characters as any"
          :disabled="state === 'idle'"
        />
        <p v-if="error" class="text-[var(--ui-error)] text-sm mt-4">
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
