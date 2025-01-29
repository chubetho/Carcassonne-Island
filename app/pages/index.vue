<script setup lang="ts">
const characters = ref([
  {
    label: 'Pirate1',
    description: 'This is the description for Pirate1.',
    value: 'Pirate1',
    disabled: false,
  },
  {
    label: 'Pirate2',
    description: 'This is the description for Pirate2.',
    value: 'Pirate2',
    disabled: false,
  },
  {
    label: 'Pirate3',
    description: 'This is the description for Pirate3.',
    value: 'Pirate3',
    disabled: false,
  },
  {
    label: 'Pirate4',
    description: 'This is the description for Pirate4.',
    value: 'Pirate4',
    disabled: false,
  },
  {
    label: 'LongJohn',
    description: 'This is the description for LongJohn.',
    value: 'LongJohn',
    disabled: false,
  },
])
const character = ref('')
const error = ref('')
const state = ref<'idle' | 'waiting' | 'joined' | 'joined_waiting'>('idle')

function confirm() {
  if (!character.value) {
    error.value = 'Please select a character.'
    return
  }

  // send(character.value)
  error.value = ''
  state.value = 'waiting'
}

function join() {
  // open()
  state.value = 'waiting'
}
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <template v-if="state === 'idle'">
      <UButton size="xl" @click="join">
        Join
      </UButton>
    </template>

    <div v-else-if="state === 'waiting'" class="flex flex-col justify-center items-center gap-2">
      <UIcon name="i-lucide-loader-circle" class="size-16 animate-spin" />
      <span> Waiting for other players </span>
    </div>

    <UCard
      v-else-if="state === 'joined' || state === 'joined_waiting'"
      class="min-w-[500px]"
      :ui="{ footer: 'flex justify-end' }"
    >
      <template #header>
        Select character
      </template>

      <div>
        <URadioGroup v-model="character" :items="characters" :disabled="state === 'joined_waiting'" />
        <p v-if="error" class="text-[var(--ui-error)] text-sm mt-4">
          {{ error }}
        </p>

        <p v-if="character && state === 'joined_waiting'" class="text-sm mt-4">
          You have selected {{ character }}.
        </p>
      </div>

      <template #footer>
        <UButton @click="confirm">
          Confirm
        </UButton>
      </template>
    </UCard>
  </div>
</template>
