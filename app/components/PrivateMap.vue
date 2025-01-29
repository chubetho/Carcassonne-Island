<script setup lang="ts">
const props = defineProps<{
  range?: number
}>()

const emit = defineEmits<{
  updateCoord: [v: [number, number]]
}>()

const edge = 24
const coord = ref<[number, number]>([0, 0])

const hints = computed<[number, number][]>(() => {
  if (!props.range)
    return []

  const _range = props.range
  const peak = _range - 1
  const [x, y] = coord.value

  const arr: [number, number][] = []
  for (let i = x - peak; i <= x + peak; i++) {
    for (let j = y - peak; j <= y + peak; j++) {
      if (
        peak > 1
        && (
          (i === x - peak && j === y - peak)
          || (i === x - peak && j === y + peak)
          || (i === x + peak && j === y - peak)
          || (i === x + peak && j === y + peak)
        )
      ) {
        continue
      }

      arr.push([i, j])
    }
  }

  arr.push([x, y - _range])
  arr.push([x, y + _range])
  arr.push([x - _range, y])
  arr.push([x + _range, y])

  return arr.filter(a => a[0] >= 0 && a[1] >= 0)
})

const coords = computed(() => {
  const _coords: ('off' | 'hint' | 'player')[][] = []
  for (let y = 0; y < edge; y++) {
    for (let x = 0; x < edge; x++) {
      _coords[y] ??= []

      let set = false

      if (coord.value[0] === x && coord.value[1] === y) {
        _coords[y][x] = 'player'
        set = true
      }

      if (!set) {
        const p = hints.value.find(p => p[0] === x && p[1] === y)
        if (p) {
          _coords[y][x] = 'hint'
          set = true
        }
      }

      if (!set)
        _coords[y][x] = 'off'
    }
  }

  return _coords
})

function setCoord(_coord: [number, number]) {
  if (!props.range) {
    coord.value = _coord
    return
  }

  const hint = hints.value.find(h => h[0] === _coord[0] && h[1] === _coord[1])
  if (hint)
    coord.value = _coord
}

watch(coord, (v) => {
  emit('updateCoord', v)
}, { deep: true })
</script>

<template>
  <div class="relative h-full w-fit">
    <img src="/map.png" alt="map" class="h-full object-contain">

    <ul
      class="group absolute inset-0 z-1 grid size-full"
      :style="{
        gridTemplateColumns: `repeat(${edge},minmax(0,1fr))`,
        gridTemplateRows: `repeat(${edge},minmax(0,1fr))`,
      }"
    >
      <template v-for="y in edge" :key="`y:${y}`">
        <template v-for="x in edge" :key="`x:${x}`">
          <li
            class="cursor-pointer border-[0.5px] border-black/50"
            :class="coords?.[y - 1]?.[x - 1] === 'player' ? 'bg-[var(--ui-error)]/90' : coords?.[y - 1]?.[x - 1] === 'hint' ? 'bg-[var(--ui-info)]/80' : 'hover:bg-white/50'"
            @click="setCoord([x - 1, y - 1])"
          />
        </template>
      </template>
    </ul>
  </div>
</template>
