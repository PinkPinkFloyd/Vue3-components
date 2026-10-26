import { computed, ref } from 'vue'
import { cloneTemplate, seedTemplates } from '@/data/printTemplates'
import type { PrintTemplate } from '@/types/print'
const storageKey = 'summer-print-studio-v1'
function readTemplates(): PrintTemplate[] {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || 'null')
    if (
      Array.isArray(value) &&
      value.every(
        (item) =>
          item.id &&
          item.settings &&
          Array.isArray(item.fields) &&
          Array.isArray(item.columns),
      )
    )
      return value.map((item) => ({
        ...item,
        settings: {
          ...item.settings,
          paymentRatio:
            item.settings.paymentRatio ?? (item.type === '0008' ? 30 : 100),
        },
        qr: item.qr ?? { url: '', x: 610, y: 30, width: 65, height: 65 },
      }))
  } catch {
    /* Fall back to examples when storage is unavailable or invalid. */
  }
  return seedTemplates.map(cloneTemplate)
}
const templates = ref<PrintTemplate[]>(readTemplates())
function persist(next: PrintTemplate[]) {
  localStorage.setItem(storageKey, JSON.stringify(next))
  templates.value = next
}
export function useTemplates() {
  function save(template: PrintTemplate) {
    const copy = cloneTemplate(template)
    copy.updatedAt = new Date().toLocaleDateString('sv-SE')
    const next = templates.value
      .filter((item) => item.id !== copy.id)
      .map(cloneTemplate)
    if (copy.isDefault)
      next.forEach((item) => {
        if (item.type === copy.type) item.isDefault = false
      })
    const index = templates.value.findIndex((item) => item.id === copy.id)
    next.splice(index < 0 ? next.length : index, 0, copy)
    persist(next)
  }
  function remove(ids: string[]) {
    persist(templates.value.filter((item) => !ids.includes(item.id)))
  }
  function reset() {
    persist(seedTemplates.map(cloneTemplate))
  }
  return {
    templates: computed(() => templates.value),
    save,
    remove,
    reset,
    find: (id: string) => templates.value.find((item) => item.id === id),
  }
}
