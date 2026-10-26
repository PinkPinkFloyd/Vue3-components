<script setup lang="ts">
import { computed } from 'vue'
import UploadImg from '@/components/UploadImg.vue'
import StudioIcon from '@/components/StudioIcon.vue'
import { isPayment, papers } from '@/data/printTemplates'
import type { PrintField, PrintTemplate, Section } from '@/types/print'
const template = defineModel<PrintTemplate>({ required: true })
const section = defineModel<Section>('section', { required: true })
const selectedField = defineModel<string>('selectedField', { default: '' })
const sections = computed<{ id: Section; name: string }[]>(() => [
  { id: 'header', name: '抬头与品牌' },
  { id: 'fields', name: '顶部信息' },
  ...(isPayment(template.value.type)
    ? [{ id: 'orders' as Section, name: '关联订单' }]
    : []),
  { id: 'table', name: '产品明细' },
  { id: 'bottom', name: '底部信息' },
  { id: 'terms', name: '条款与签章' },
  { id: 'settings', name: '版式设置' },
])
const fields = computed(() =>
  section.value === 'bottom'
    ? template.value.bottomFields
    : template.value.fields,
)
const currentField = computed(() =>
  fields.value.find((field) => field.id === selectedField.value),
)
const columns = computed(() =>
  section.value === 'orders'
    ? template.value.orderColumns
    : template.value.columns,
)
const maxRows = computed(() =>
  template.value.paper === '0003' ? 1 : template.value.paper === '0002' ? 2 : 6,
)
function addField() {
  const field: PrintField = {
    id: `custom-${Date.now()}`,
    label: '自定义字段',
    value: '请编辑字段内容',
    visible: true,
  }
  fields.value.push(field)
  selectedField.value = field.id
}
function selectSection(id: Section) {
  section.value = id
  selectedField.value = ''
}
function removeField(id: string) {
  const list =
    section.value === 'bottom'
      ? template.value.bottomFields
      : template.value.fields
  list.splice(
    list.findIndex((item) => item.id === id),
    1,
  )
  selectedField.value = ''
}
function paperChange() {
  template.value.settings.rowCount = Math.min(
    template.value.settings.rowCount,
    maxRows.value,
  )
  template.value.settings.margin = template.value.paper === '0001' ? 12 : 5
  template.value.settings.fontSize = template.value.paper === '0001' ? 11 : 10
}
</script>
<template>
  <aside class="template-inspector">
    <div class="inspector-heading">
      <span class="inspector-icon"><StudioIcon name="settings" /></span>
      <h2>模板配置</h2>
    </div>
    <div class="inspector-sections">
      <section
        v-for="item in sections"
        :key="item.id"
        class="inspector-section"
        :class="{ active: section === item.id }"
      >
        <button
          class="inspector-section-button"
          type="button"
          :aria-expanded="section === item.id"
          @click="selectSection(item.id)"
        >
          <span>{{ item.name }}</span
          ><StudioIcon name="chevron" :size="14" />
        </button>
        <div v-if="section === item.id" class="inspector-body">
          <template v-if="section === 'header'">
            <div class="setting-line">
              <label>企业抬头</label
              ><el-switch
                v-model="template.settings.showCompany"
                size="small"
              />
            </div>
            <el-input
              v-model="template.settings.company"
              aria-label="企业抬头"
              maxlength="60"
            />
            <div class="setting-line">
              <label>地址与联系方式</label
              ><el-switch
                v-model="template.settings.showAddress"
                size="small"
              />
            </div>
            <el-input
              v-model="template.settings.address"
              aria-label="企业地址"
              type="textarea"
              :rows="2"
              maxlength="100"
            />
            <label class="setting-label">单据标题</label
            ><el-input
              v-model="template.settings.title"
              aria-label="单据标题"
              maxlength="30"
            />
            <label class="setting-label">标题对齐</label
            ><el-radio-group v-model="template.settings.titleAlign" size="small"
              ><el-radio-button label="left">居左</el-radio-button
              ><el-radio-button label="center">居中</el-radio-button
              ><el-radio-button label="right"
                >居右</el-radio-button
              ></el-radio-group
            >
            <div class="upload-box">
              <UploadImg @return-src="template.logo.url = $event[0]"
                ><el-button size="small"
                  ><StudioIcon name="plus" :size="14" />上传企业 LOGO</el-button
                ></UploadImg
              >
              <p>支持 PNG / JPG，添加后可拖动与缩放</p>
              <el-button
                v-if="template.logo.url"
                link
                type="danger"
                @click="template.logo.url = ''"
                >移除 LOGO</el-button
              >
            </div>
            <div class="upload-box">
              <UploadImg @return-src="template.qr.url = $event[0]"
                ><el-button size="small">上传单据二维码</el-button></UploadImg
              >
              <p>使用已有二维码图片，添加后可拖动与缩放</p>
              <el-button
                v-if="template.qr.url"
                link
                type="danger"
                @click="template.qr.url = ''"
                >移除二维码</el-button
              >
            </div>
          </template>
          <template v-else-if="section === 'fields' || section === 'bottom'">
            <div class="field-picker">
              <div
                v-for="field in fields"
                :key="field.id"
                class="field-picker-row"
                :class="{ chosen: selectedField === field.id }"
              >
                <el-checkbox
                  v-model="field.visible"
                  :aria-label="`显示${field.label}`"
                /><button type="button" @click="selectedField = field.id">
                  {{ field.label }}<span>编辑</span>
                </button>
              </div>
            </div>
            <div v-if="currentField" class="field-edit-form">
              <label class="setting-label">字段名称</label
              ><el-input
                v-model="currentField.label"
                aria-label="字段名称"
                maxlength="20"
              />
              <label class="setting-label">示例内容</label
              ><el-input
                v-model="currentField.value"
                aria-label="示例内容"
                type="textarea"
                :rows="2"
                maxlength="200"
              />
              <el-checkbox v-model="currentField.wide">独占一行</el-checkbox>
              <el-button
                v-if="currentField.id.startsWith('custom-')"
                link
                type="danger"
                @click="removeField(currentField.id)"
                >删除字段</el-button
              >
            </div>
            <el-button
              class="add-field-button"
              plain
              size="small"
              @click="addField"
              ><StudioIcon name="plus" :size="14" />添加自定义字段</el-button
            >
            <template v-if="section === 'fields' && isPayment(template.type)"
              ><label class="setting-label">本次申请比例 / %</label
              ><el-input-number
                v-model="template.settings.paymentRatio"
                :min="1"
                :max="100"
                size="small"
                aria-label="付款申请比例"
              />
              <p class="inspector-tip" style="margin-top: 8px">
                调整比例后，请同步核对付款说明中的约定。
              </p></template
            >
          </template>
          <template v-else-if="section === 'table' || section === 'orders'">
            <div
              v-for="column in columns"
              :key="column.key"
              class="column-picker-row"
            >
              <el-checkbox v-model="column.visible">{{
                column.label
              }}</el-checkbox
              ><el-input-number
                v-if="column.visible"
                v-model="column.width"
                :min="30"
                :max="360"
                :step="5"
                size="small"
                controls-position="right"
                :aria-label="`${column.label}列宽`"
              />
            </div>
            <template v-if="section === 'table'"
              ><label class="setting-label">示例明细行数</label
              ><el-input-number
                v-model="template.settings.rowCount"
                :min="1"
                :max="maxRows"
                size="small"
                aria-label="示例明细行数" />
              <div class="setting-line">
                <label>显示金额汇总</label
                ><el-switch
                  v-model="template.settings.showTotals"
                  size="small"
                /></div
            ></template>
          </template>
          <template v-else-if="section === 'terms'">
            <p v-if="template.paper !== '0001'" class="inspector-tip">
              联单使用紧凑版式，省略长条款区；完整条款在 A4 中展示。
            </p>
            <div
              v-for="term in template.terms"
              :key="term.id"
              class="term-form"
            >
              <el-checkbox v-model="term.visible">显示此条款</el-checkbox
              ><el-input
                v-model="term.title"
                aria-label="条款标题"
                maxlength="30"
              /><el-input
                v-model="term.text"
                aria-label="条款内容"
                type="textarea"
                :rows="3"
                maxlength="500"
              />
            </div>
            <el-button
              size="small"
              plain
              @click="
                template.terms.push({
                  id: String(Date.now()),
                  title: '补充条款',
                  text: '请输入条款内容',
                  visible: true,
                })
              "
              ><StudioIcon name="plus" :size="14" />添加条款</el-button
            >
            <div class="setting-line">
              <label>显示签字确认区</label
              ><el-switch
                v-model="template.settings.showSignatures"
                size="small"
              />
            </div>
            <div class="upload-box">
              <UploadImg @return-src="template.seal.url = $event[0]"
                ><el-button size="small">上传印章图片</el-button></UploadImg
              >
              <p>推荐透明 PNG，可在签字区拖动与缩放</p>
              <el-button
                v-if="template.seal.url"
                link
                type="danger"
                @click="template.seal.url = ''"
                >移除印章</el-button
              >
            </div>
          </template>
          <template v-else-if="section === 'settings'">
            <label class="setting-label first">纸张规格</label
            ><el-select
              v-model="template.paper"
              aria-label="纸张规格"
              @change="paperChange"
              ><el-option
                v-for="paper in papers"
                :key="paper.value"
                :value="paper.value"
                :label="paper.label"
            /></el-select>
            <label class="setting-label">单据主题色</label>
            <div class="color-options">
              <button
                v-for="color in ['#234d71', '#176b5b', '#424958', '#85502b']"
                :key="color"
                type="button"
                :aria-label="`使用主题色 ${color}`"
                :aria-pressed="template.settings.accent === color"
                :style="{ background: color }"
                @click="template.settings.accent = color"
              >
                <StudioIcon
                  v-if="template.settings.accent === color"
                  name="check"
                  :size="15"
                />
              </button>
            </div>
            <label class="setting-label">正文字号 / px</label
            ><el-input-number
              v-model="template.settings.fontSize"
              :min="9"
              :max="14"
              size="small"
              aria-label="正文字号"
            />
            <label class="setting-label">页边距 / mm</label
            ><el-input-number
              v-model="template.settings.margin"
              :min="3"
              :max="20"
              size="small"
              aria-label="页边距"
            />
          </template>
        </div>
      </section>
    </div>
  </aside>
</template>
