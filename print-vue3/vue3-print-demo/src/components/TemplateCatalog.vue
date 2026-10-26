<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import StudioIcon from '@/components/StudioIcon.vue'
import { useTemplates } from '@/composables/useTemplates'
import {
  cloneTemplate,
  createTemplate,
  documentTypes,
  isPayment,
  papers,
} from '@/data/printTemplates'
import type { Paper, PrintTemplate } from '@/types/print'
const router = useRouter()
const catalog = useTemplates()
const activeCategory = ref('全部模板')
const search = ref('')
const selected = ref<PrintTemplate[]>([])
const page = ref(1)
const dialogOpen = ref(false)
const copySource = ref<PrintTemplate>()
const form = reactive({ name: '', type: '0001', paper: '0001' as Paper })
const categories = ['全部模板', '销售管理', '采购管理', '财务管理', '仓储管理']
const nameFor = (type: string) =>
  documentTypes.find((item) => item.code === type)?.name || '业务单据'
const categoryFor = (type: string) =>
  documentTypes.find((item) => item.code === type)?.category || '其他'
const countFor = (category: string) =>
  catalog.templates.value.filter(
    (item) => category === '全部模板' || categoryFor(item.type) === category,
  ).length
const filtered = computed(() =>
  catalog.templates.value.filter(
    (item) =>
      (activeCategory.value === '全部模板' ||
        categoryFor(item.type) === activeCategory.value) &&
      `${item.name}${nameFor(item.type)}`.includes(search.value.trim()),
  ),
)
const pageItems = computed(() =>
  filtered.value.slice((page.value - 1) * 8, page.value * 8),
)
const defaultCount = computed(
  () => catalog.templates.value.filter((item) => item.isDefault).length,
)
const categoryCount = computed(
  () =>
    new Set(catalog.templates.value.map((item) => categoryFor(item.type))).size,
)

function edit(template: PrintTemplate) {
  router.push({
    path: `/systemSet/printTemplate/${isPayment(template.type) ? 'editPayment' : 'edit'}`,
    query: { id: template.id },
  })
}
function selectCategory(category: string) {
  activeCategory.value = category
  page.value = 1
  selected.value = []
}
function create() {
  copySource.value = undefined
  Object.assign(form, { name: '', type: '0001', paper: '0001' })
  dialogOpen.value = true
}
function copy(template: PrintTemplate) {
  copySource.value = template
  Object.assign(form, {
    name: `${template.name} · 副本`,
    type: template.type,
    paper: template.paper,
  })
  dialogOpen.value = true
}
function submit() {
  if (!form.name.trim()) {
    ElMessage.warning('请填写模板名称')
    return
  }
  const template = copySource.value
    ? cloneTemplate(copySource.value)
    : createTemplate(form.type, form.name.trim(), form.paper)
  if (copySource.value) {
    template.id = createTemplate().id
    template.name = form.name.trim()
    template.isDefault = false
  }
  try {
    catalog.save(template)
    dialogOpen.value = false
    ElMessage.success(copySource.value ? '模板已复制' : '模板已创建')
    edit(template)
  } catch {
    ElMessage.error('本地保存失败，请检查浏览器存储空间')
  }
}
async function remove(items: PrintTemplate[]) {
  if (!items.length) return
  try {
    await ElMessageBox.confirm(
      `将删除选中的 ${items.length} 个模板，此操作可通过“恢复示例”重新获得初始样例。`,
      '删除模板',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
  } catch {
    return
  }
  try {
    catalog.remove(items.map((item) => item.id))
    selected.value = []
    page.value = 1
    ElMessage.success('模板已删除')
  } catch {
    ElMessage.error('删除失败，浏览器存储不可用')
  }
}
function setDefault(template: PrintTemplate) {
  try {
    catalog.save({ ...cloneTemplate(template), isDefault: true })
    ElMessage.success('已设为该单据类型的默认模板')
  } catch {
    ElMessage.error('设置失败，浏览器存储不可用')
  }
}
async function reset() {
  try {
    await ElMessageBox.confirm(
      '将恢复初始的 6 个示例模板，并替换当前浏览器中保存的模板。',
      '恢复示例',
      {
        confirmButtonText: '恢复示例',
        cancelButtonText: '取消',
        type: 'warning',
      },
    )
  } catch {
    return
  }
  try {
    catalog.reset()
    page.value = 1
    selected.value = []
    ElMessage.success('已恢复示例模板')
  } catch {
    ElMessage.error('恢复失败，浏览器存储不可用')
  }
}
</script>
<template>
  <main class="catalog-page">
    <aside class="catalog-sidebar">
      <div class="sidebar-label">WORKSPACE</div>
      <h2>模板中心</h2>
      <div class="sidebar-label category-label">单据分类</div>
      <nav class="category-nav">
        <button
          v-for="(category, index) in categories"
          :key="category"
          type="button"
          :class="{ active: activeCategory === category }"
          @click="selectCategory(category)"
        >
          <StudioIcon
            :name="index === 0 ? 'grid' : 'file'"
            :size="17"
          /><span>{{ category }}</span
          ><b>{{ countFor(category) }}</b>
        </button>
      </nav>
      <div class="sidebar-note">
        <StudioIcon name="print" :size="24" />
        <h3>从配置到一张好单据</h3>
        <p>字段、明细、条款和签章，<br />在同一画布完成编排。</p>
        <span>VUE 3 / PRINT STUDIO</span>
      </div>
      <button class="restore-button" type="button" @click="reset">
        恢复初始示例 ↺
      </button>
    </aside>
    <div class="catalog-main">
      <div class="catalog-stats">
        <div>
          <span>模板总数</span
          ><strong
            >{{ String(catalog.templates.value.length).padStart(2, '0')
            }}<small>份业务模板</small></strong
          >
        </div>
        <div>
          <span>覆盖场景</span
          ><strong
            >{{ String(categoryCount).padStart(2, '0')
            }}<small>类业务流程</small></strong
          >
        </div>
        <div>
          <span>默认模板</span
          ><strong
            >{{ String(defaultCount).padStart(2, '0')
            }}<small>按单据类型配置</small></strong
          >
        </div>
      </div>

      <section class="catalog-table-panel">
        <div class="catalog-table-toolbar">
          <h2>
            {{ activeCategory }}<span>{{ filtered.length }}</span>
          </h2>
          <div class="catalog-table-actions">
            <el-input
              v-model="search"
              class="catalog-search"
              placeholder="搜索模板名称或单据类型"
              clearable
              aria-label="搜索模板"
              @input="page = 1"
            >
              <template #prefix><StudioIcon name="search" :size="16" /></template>
            </el-input>
            <el-button type="primary" @click="create">
              <StudioIcon name="plus" :size="16" />新建模板
            </el-button>
          </div>
        </div>
        <div v-if="selected.length" class="batch-toolbar">
          <span>已选择 {{ selected.length }} 份模板</span
          ><el-button
            v-if="selected.length === 1"
            link
            type="primary"
            @click="copy(selected[0])"
            >复制模板</el-button
          ><el-button
            v-if="selected.length === 1"
            link
            type="primary"
            @click="setDefault(selected[0])"
            >设为默认</el-button
          ><el-button link type="danger" @click="remove(selected)"
            >删除</el-button
          >
        </div>
        <el-table
          :key="`${activeCategory}-${page}-${search}`"
          :data="pageItems"
          row-key="id"
          class="template-list-table"
          @selection-change="selected = $event"
        >
          <el-table-column type="selection" width="48" />
          <el-table-column label="模板名称" min-width="270"
            ><template #default="{ row }"
              ><div class="template-name-cell">
                <span
                  class="template-file-icon"
                  :class="{ payment: isPayment(row.type) }"
                  ><StudioIcon name="file" :size="21"
                /></span>
                <div>
                  <button type="button" @click="edit(row)">
                    {{ row.name }}</button
                  ><span
                    >{{ categoryFor(row.type) }}<i> / </i
                    >{{
                      documentTypes.find((item) => item.code === row.type)
                        ?.english
                    }}</span
                  >
                </div>
              </div></template
            ></el-table-column
          >
          <el-table-column label="单据类型" min-width="110"
            ><template #default="{ row }"
              ><span class="document-type-tag">{{
                nameFor(row.type)
              }}</span></template
            ></el-table-column
          >
          <el-table-column label="纸张" width="85"
            ><template #default="{ row }"
              ><span class="table-muted">{{
                row.paper === '0001'
                  ? 'A4'
                  : row.paper === '0002'
                    ? '二等分'
                    : '三等分'
              }}</span></template
            ></el-table-column
          >
          <el-table-column label="状态" width="90"
            ><template #default="{ row }"
              ><span class="default-badge" v-if="row.isDefault"
                ><i></i>默认</span
              ><span class="table-muted" v-else>自定义</span></template
            ></el-table-column
          >
          <el-table-column prop="updatedAt" label="更新时间" width="115" />
          <el-table-column label="操作" width="165" fixed="right"
            ><template #default="{ row }"
              ><el-button link type="primary" @click="edit(row)">设计</el-button
              ><el-dropdown trigger="click"
                ><button
                  class="more-button"
                  type="button"
                  aria-label="更多模板操作"
                >
                  •••</button
                ><template #dropdown
                  ><el-dropdown-menu
                    ><el-dropdown-item @click="copy(row)"
                      >复制模板</el-dropdown-item
                    ><el-dropdown-item @click="setDefault(row)"
                      >设为默认</el-dropdown-item
                    ><el-dropdown-item divided @click="remove([row])"
                      >删除模板</el-dropdown-item
                    ></el-dropdown-menu
                  ></template
                ></el-dropdown
              ></template
            ></el-table-column
          >
          <template #empty
            ><div class="catalog-empty">
              <StudioIcon name="search" :size="28" />
              <h3>没有找到匹配的模板</h3>
              <p>试试其他关键词，或新建一份模板。</p>
            </div></template
          >
        </el-table>
        <div class="catalog-table-footer">
          <span>共 {{ filtered.length }} 份模板 · 点击名称开始设计</span
          ><el-pagination
            v-model:current-page="page"
            :page-size="8"
            :total="filtered.length"
            layout="prev, pager, next"
          />
        </div>
      </section>
      <div class="catalog-bottom-note">
        <span><i></i>所有示例数据均为虚构，可放心调整</span
        ><span>数据仅保存在当前浏览器</span>
      </div>
    </div>
    <el-dialog
      v-model="dialogOpen"
      :title="copySource ? '复制模板' : '创建打印模板'"
      width="460px"
      destroy-on-close
      ><p class="dialog-intro">
        {{
          copySource
            ? '保留现有版式和字段，快速创建新的模板。'
            : '从完整的业务样例开始，再按需要调整单据版式。'
        }}
      </p>
      <el-form label-position="top"
        ><el-form-item label="模板名称" required
          ><el-input
            v-model="form.name"
            placeholder="例如：客户报价 · 标准商务版"
            maxlength="50"
            aria-label="新模板名称" /></el-form-item
        ><el-form-item label="单据类型"
          ><el-select
            v-model="form.type"
            :disabled="!!copySource"
            aria-label="单据类型"
            ><el-option
              v-for="type in documentTypes"
              :key="type.code"
              :value="type.code"
              :label="type.name" /></el-select></el-form-item
        ><el-form-item label="纸张规格"
          ><el-select
            v-model="form.paper"
            :disabled="!!copySource"
            aria-label="新模板纸张"
            ><el-option
              v-for="paper in papers"
              :key="paper.value"
              :value="paper.value"
              :label="paper.label" /></el-select></el-form-item></el-form
      ><template #footer
        ><el-button @click="dialogOpen = false">取消</el-button
        ><el-button type="primary" @click="submit">{{
          copySource ? '复制并设计' : '创建并设计'
        }}</el-button></template
      ></el-dialog
    >
  </main>
</template>
