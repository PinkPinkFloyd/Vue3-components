<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import interact from 'interactjs'
import type { PrintAsset } from '@/types/print'
const asset = defineModel<PrintAsset>({ required: true })
const props = withDefaults(
  defineProps<{ editable: boolean; label: string; zoom?: number }>(),
  { zoom: 1 },
)
const element = ref<HTMLElement>()
let interaction: ReturnType<typeof interact> | undefined
function bounds() {
  const parent = element.value?.parentElement
  return {
    width: parent?.clientWidth || 600,
    height: parent?.clientHeight || 120,
  }
}
function constrain() {
  const parent = bounds()
  asset.value.width = Math.min(parent.width, Math.max(24, asset.value.width))
  asset.value.height = Math.min(parent.height, Math.max(24, asset.value.height))
  asset.value.x = Math.max(
    0,
    Math.min(parent.width - asset.value.width, asset.value.x),
  )
  asset.value.y = Math.max(
    0,
    Math.min(parent.height - asset.value.height, asset.value.y),
  )
}
onMounted(() => {
  if (!element.value || !props.editable) return
  constrain()
  interaction = interact(element.value)
    .draggable({
      listeners: {
        move(event: { dx: number; dy: number }) {
          asset.value.x += event.dx / props.zoom
          asset.value.y += event.dy / props.zoom
          constrain()
        },
      },
    })
    .resizable({
      edges: { left: false, top: false, right: true, bottom: true },
      listeners: {
        move(event: { deltaRect: { width: number; height: number } }) {
          asset.value.width += event.deltaRect.width / props.zoom
          asset.value.height += event.deltaRect.height / props.zoom
          constrain()
        },
      },
    })
})
onBeforeUnmount(() => interaction?.unset())
</script>
<template>
  <div
    ref="element"
    class="document-asset"
    :class="{ editable }"
    :style="{
      left: `${asset.x}px`,
      top: `${asset.y}px`,
      width: `${asset.width}px`,
      height: `${asset.height}px`,
    }"
  >
    <img :src="asset.url" :alt="label" draggable="false" />
    <button
      v-if="editable"
      class="asset-remove no-print"
      type="button"
      :aria-label="`移除${label}`"
      @click.stop="asset.url = ''"
    >
      ×
    </button>
  </div>
</template>
