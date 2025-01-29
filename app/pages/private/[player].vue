<script setup lang="ts">
import type { ActionOptions } from '~/types/ActionOptions'

const route = useRoute<'private-player'>()
const player = route.params.player

const state = ref<
  'idle' |
  'ChooseStartingPosition' |
  'ChooseBurryLocation' |
  'ChooseAction'
>(player === 'LongJohn' ? 'ChooseBurryLocation' : 'ChooseStartingPosition')

const coord = shallowRef<[number, number]>([0, 0])
const range = ref()
const actionOpts = shallowRef<ActionOptions>()
const actionOpt = ref<ActionOptions[number]['action']>()
watch(actionOpt, (v) => {
  switch (v) {
    case 'MoveMax3':{
      range.value = 3
      break
    }
    case 'MoveMax6':{
      range.value = 6
      break
    }
    case 'SearchSmall':
    case 'SearchBig':
    case 'Validate':
    {
      // TODO
    }
  }
})

const { send, onData, status } = useSocket()
onData(({ type, payload }) => {
  if (type !== 'ChooseAction')
    return

  state.value = 'ChooseAction'
  actionOpts.value = payload as ActionOptions
})

function confirm() {
  if (state.value === 'ChooseStartingPosition' || state.value === 'ChooseBurryLocation') {
    state.value = 'idle'
    send(coord.value)
    return
  }

  if (state.value === 'ChooseAction' && actionOpt.value) {
    send(actionOpt.value)
  }
}
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
      <p class="font-bold">
        Player: {{ player }}
      </p>

      <div class="mt-4">
        <template v-if="state === 'idle'">
          <div class="flex items-center gap-1">
            <span>Wait...</span>
            <UIcon name="i-lucide-loader-circle" class="size-4 animate-spin" />
          </div>
        </template>

        <template v-if="state === 'ChooseStartingPosition' || state === 'ChooseBurryLocation'">
          <p>Please choose position: {{ coord }}</p>
          <UButton
            :ui="{ base: 'border' }"
            class="mt-2"
            @click="confirm"
          >
            Confirm
          </UButton>
        </template>

        <template v-if="state === 'ChooseAction'">
          <div class="flex gap-2">
            <UButton
              v-for="opt in actionOpts"
              :key="opt.action"
              :ui="{ base: 'border' }"
              :color="opt.action === actionOpt ? 'warning' : 'neutral'"
              @click="actionOpt = opt.action"
            >
              {{ opt.action }}
            </UButton>
          </div>

          <UButton
            :ui="{ base: 'border' }"
            class="mt-2"
            @click="confirm"
          >
            Confirm
          </UButton>
        </template>
      </div>

      <div class="mt-4 italic">
        <p>WS status: {{ status }}</p>
        <p>State: {{ state }}</p>
      </div>
    </div>
  </div>
</template>
