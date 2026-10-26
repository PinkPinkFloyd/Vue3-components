<script setup lang="ts">
import draggable from 'vuedraggable'
import type { PrintField } from '@/types/print'
const fields = defineModel<PrintField[]>({ required: true })
defineProps<{ sample: boolean; editable?: boolean }>()
defineEmits<{ edit: [id: string] }>()
</script>
<template>
  <draggable
    v-model="fields"
    item-key="id"
    class="document-fields"
    :disabled="!editable"
    :animation="150"
    handle=".field-label"
  >
    <template #item="{ element: field }">
      <div
        v-show="field.visible"
        class="document-field"
        :class="{ wide: field.wide }"
        @dblclick="$emit('edit', field.id)"
      >
        <span class="field-label">{{ field.label }}：</span
        ><span :class="{ 'field-token': !sample }">{{
          sample ? field.value : `@${field.label}`
        }}</span>
      </div>
    </template>
  </draggable>
</template>
