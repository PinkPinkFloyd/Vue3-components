<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  useRoute,
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
} from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import StudioIcon from '@/components/StudioIcon.vue'
import PrintDocument from '@/components/PrintDocument.vue'
import TemplateInspector from '@/components/TemplateInspector.vue'
import {
  cloneTemplate,
  createTemplate,
  documentTypes,
  papers,
} from '@/data/printTemplates'
import { useTemplates } from '@/composables/useTemplates'
import type { PrintTemplate, Section } from '@/types/print'

const props = defineProps<{ payment?: boolean }>()
const route = useRoute()
const router = useRouter()
const catalog = useTemplates()
const template = ref<PrintTemplate>(
  createTemplate(props.payment ? '0008' : '0001'),
)
const savedSnapshot = ref('')
const activeSection = ref<Section>('fields')
const selectedField = ref('')
const sample = ref(true)
const zoom = ref(0.85)
const previewOpen = ref(false)
const error = ref('')
const documentWrap = ref<HTMLElement>()
const documentHeight = ref(0)
let observer: ResizeObserver | undefined
const dirty = computed(
  () => savedSnapshot.value !== JSON.stringify(template.value),
)
const definition = computed(() =>
  documentTypes.find((item) => item.code === template.value.type),
)
const paper = computed(
  () => papers.find((item) => item.value === template.value.paper) || papers[0],
)
const previewStyle = computed(() => ({
  width: `${((paper.value.width * 96) / 25.4) * zoom.value}px`,
  minHeight: `${Math.max((paper.value.height * 96) / 25.4, documentHeight.value) * zoom.value}px`,
}))
const paperOverflow = computed(
  () => documentHeight.value > (paper.value.height * 96) / 25.4 + 2,
)
function fitCanvas() {
  const canvas = documentWrap.value?.parentElement?.parentElement
  if (!canvas) return
  const availableWidth = canvas.clientWidth - 40
  const paperWidth = (paper.value.width * 96) / 25.4
  const fittedZoom = Math.floor((availableWidth / paperWidth) * 100) / 100
  zoom.value = Math.max(0.5, Math.min(0.85, fittedZoom))
}
onMounted(() => {
  const page = documentWrap.value?.firstElementChild
  if (!page) return
  fitCanvas()
  observer = new ResizeObserver(() => {
    documentHeight.value = (page as HTMLElement).offsetHeight
  })
  observer.observe(page)
})
onBeforeUnmount(() => observer?.disconnect())
watch(
  () => template.value.paper,
  () => nextTick(fitCanvas),
)

watch(
  () => route.query.id,
  (id) => {
    const existing = catalog.find(String(id ?? (props.payment ? '5' : '1')))
    error.value = id && !existing ? '没有找到这个模板，可能已被删除。' : ''
    template.value = existing
      ? cloneTemplate(existing)
      : createTemplate(props.payment ? '0008' : '0001')
    savedSnapshot.value = JSON.stringify(template.value)
    activeSection.value = 'fields'
    selectedField.value = ''
  },
  { immediate: true },
)

function save() {
  if (!template.value.name.trim() || !template.value.settings.title.trim()) {
    ElMessage.warning('请填写模板名称和单据标题')
    return
  }
  try {
    catalog.save(template.value)
    savedSnapshot.value = JSON.stringify(template.value)
    ElMessage.success('模板已保存到当前浏览器')
  } catch {
    ElMessage.error('本地保存失败，请检查浏览器存储空间，或减小上传图片后重试')
  }
}
function editField(section: 'fields' | 'bottom', id: string) {
  activeSection.value = section
  selectedField.value = id
}
async function print() {
  const style = document.createElement('style')
  style.textContent = `@page { size: ${paper.value.width}mm ${paper.value.height}mm; margin: 0; }`
  document.head.appendChild(style)
  try {
    await nextTick()
    window.print()
  } finally {
    style.remove()
  }
}
function beforeUnload(event: BeforeUnloadEvent) {
  if (dirty.value) event.preventDefault()
}
window.addEventListener('beforeunload', beforeUnload)
onBeforeUnmount(() => window.removeEventListener('beforeunload', beforeUnload))
async function confirmLeave() {
  if (!dirty.value) return true
  try {
    await ElMessageBox.confirm(
      '当前修改尚未保存，离开后将丢失这些修改。',
      '离开编辑器',
      {
        confirmButtonText: '放弃修改并离开',
        cancelButtonText: '继续编辑',
        type: 'warning',
      },
    )
    return true
  } catch {
    return false
  }
}
onBeforeRouteLeave(confirmLeave)
onBeforeRouteUpdate(
  (to, from) => to.query.id === from.query.id || confirmLeave(),
)
</script>
<template>
  <main class="editor-page no-print">
    <div class="editor-heading">
      <div class="editor-title">
        <button
          class="back-button"
          type="button"
          aria-label="返回模板中心"
          @click="router.push('/')"
        >
          <StudioIcon name="arrow" />
        </button>
        <div>
          <h1>
            {{ definition?.name
            }}<span class="editor-status" :class="{ unsaved: dirty }">{{
              dirty ? '未保存修改' : '已保存'
            }}</span>
          </h1>
        </div>
      </div>
      <div class="editor-actions">
        <el-button @click="previewOpen = true"
          ><StudioIcon name="eye" :size="16" />打印预览</el-button
        ><el-button @click="print"
          ><StudioIcon name="print" :size="16" />打印 / PDF</el-button
        ><el-button type="primary" @click="save"
          ><StudioIcon name="save" :size="16" />保存模板</el-button
        >
      </div>
    </div>
    <div v-if="error" class="template-error">
      <h2>{{ error }}</h2>
      <el-button @click="router.push('/')">返回模板中心</el-button>
    </div>
    <template v-else>
      <div class="editor-metadata">
        <label
          >模板名称<el-input
            v-model="template.name"
            aria-label="模板名称"
            maxlength="50" /></label
        ><span class="metadata-divider"></span
        ><label
          >纸张<span class="paper-tag">{{ paper.label }}</span></label
        >
        <div class="view-toggle" aria-label="画布显示模式">
          <button
            type="button"
            :class="{ active: sample }"
            :aria-pressed="sample"
            @click="sample = true"
          >
            示例数据
          </button>
          <button
            type="button"
            :class="{ active: !sample }"
            :aria-pressed="!sample"
            @click="sample = false"
          >
            字段模式
          </button>
        </div>
        <div class="zoom-control">
          <button
            type="button"
            aria-label="缩小画布"
            :disabled="zoom <= 0.5"
            @click="zoom = Math.max(0.5, +(zoom - 0.1).toFixed(2))"
          >
            −
          </button>
          <span>{{ Math.round(zoom * 100) }}%</span>
          <button
            type="button"
            aria-label="放大画布"
            :disabled="zoom >= 1.2"
            @click="zoom = Math.min(1.2, +(zoom + 0.1).toFixed(2))"
          >
            ＋
          </button>
          <button class="reset-zoom" type="button" @click="fitCanvas">
            适应
          </button>
        </div>
        <label class="default-setting"
          ><el-switch
            v-model="template.isDefault"
            size="small"
          />设为默认模板</label
        >
      </div>
      <div class="editor-workspace">
        <div class="canvas-panel">
          <div class="canvas-scroll">
            <div class="paper-size-holder" :style="previewStyle">
              <div
                ref="documentWrap"
                class="paper-transform"
                :style="{ transform: `scale(${zoom})` }"
              >
                <PrintDocument
                  v-model="template"
                  :sample="sample"
                  editable
                  :active-section="activeSection"
                  :zoom="zoom"
                  @select="activeSection = $event"
                  @edit-field="editField"
                />
              </div>
            </div>
            <p
              v-if="paperOverflow"
              class="canvas-help"
              role="status"
              style="color: #b57d36"
            >
              内容超过单页，建议减少字段、条款或页边距后打印。
            </p>
          </div>
        </div>
        <TemplateInspector
          v-model="template"
          v-model:section="activeSection"
          v-model:selected-field="selectedField"
        />
      </div>
    </template>
    <el-dialog
      v-model="previewOpen"
      title="打印预览"
      width="min(1080px, 96vw)"
      top="3vh"
      class="print-preview-dialog"
      destroy-on-close
    >
      <div class="preview-toolbar">
        <el-button type="primary" @click="print"
          ><StudioIcon name="print" :size="16" />打印 / 另存为 PDF</el-button
        >
      </div>
      <div class="preview-scroll">
        <PrintDocument v-model="template" sample />
      </div>
    </el-dialog>
  </main>
  <div v-if="!error" class="print-output">
    <PrintDocument v-model="template" sample />
  </div>
</template>
