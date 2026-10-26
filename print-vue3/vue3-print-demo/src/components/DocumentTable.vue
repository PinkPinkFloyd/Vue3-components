<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import draggable from 'vuedraggable'
import type { PrintColumn } from '@/types/print'
const columns = defineModel<PrintColumn[]>({ required: true })
const props = withDefaults(
  defineProps<{
    rows: Record<string, string | number>[]
    sample: boolean
    editable?: boolean
    zoom?: number
  }>(),
  { zoom: 1 },
)
const editingKey = ref('')
let stopResize: (() => void) | undefined
function resize(event: PointerEvent, column: PrintColumn) {
  const start = event.clientX
  const startWidth = column.width
  const move = (current: PointerEvent) => {
    column.width = Math.max(
      30,
      Math.min(360, startWidth + (current.clientX - start) / props.zoom),
    )
  }
  stopResize?.()
  stopResize = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', end)
  }
  const end = () => stopResize?.()
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', end, { once: true })
}
onBeforeUnmount(() => stopResize?.())
</script>
<template>
  <draggable
    v-model="columns"
    item-key="key"
    class="document-table"
    :disabled="!editable"
    :animation="150"
    handle=".column-title"
    role="table"
    aria-label="单据明细"
  >
    <template #item="{ element: column }">
      <div
        v-show="column.visible"
        class="document-column"
        :style="{
          flexGrow: column.width,
          flexBasis: '0px',
          textAlign: column.align || 'left',
        }"
        role="rowgroup"
      >
        <div
          class="column-title"
          role="columnheader"
          @dblclick="editable && (editingKey = column.key)"
        >
          <input
            v-if="editingKey === column.key && editable"
            v-model="column.label"
            aria-label="列标题"
            @blur="editingKey = ''"
            @keyup.enter="editingKey = ''"
          />
          <span v-else>{{ column.label }}</span>
        </div>
        <div
          v-for="(row, index) in rows"
          :key="index"
          class="document-cell"
          role="cell"
        >
          {{
            sample
              ? row[column.key]
              : column.key === 'index'
                ? index + 1
                : `@${column.label}`
          }}
        </div>
        <span
          v-if="editable"
          class="column-resize"
          @pointerdown.stop.prevent="resize($event, column)"
        ></span>
      </div>
    </template>
  </draggable>
</template>
