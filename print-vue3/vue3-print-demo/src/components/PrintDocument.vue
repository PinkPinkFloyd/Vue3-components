<script setup lang="ts">
import { computed } from 'vue'
import DocumentFields from '@/components/DocumentFields.vue'
import DocumentTable from '@/components/DocumentTable.vue'
import DocumentAsset from '@/components/DocumentAsset.vue'
import { isPayment, money, papers, products } from '@/data/printTemplates'
import type { PrintTemplate, Section } from '@/types/print'
const template = defineModel<PrintTemplate>({ required: true })
withDefaults(
  defineProps<{
    sample?: boolean
    editable?: boolean
    activeSection?: Section
    zoom?: number
  }>(),
  { sample: true, zoom: 1 },
)
const emit = defineEmits<{
  select: [section: Section]
  editField: [section: 'fields' | 'bottom', id: string]
}>()
const paper = computed(
  () => papers.find((item) => item.value === template.value.paper) || papers[0],
)
const payment = computed(() => isPayment(template.value.type))
const compact = computed(() => template.value.paper !== '0001')
const rowLimit = computed(() =>
  template.value.paper === '0003' ? 1 : template.value.paper === '0002' ? 2 : 6,
)
const selectedProducts = computed(() =>
  products.slice(0, Math.min(rowLimit.value, template.value.settings.rowCount)),
)
const rows = computed(() =>
  selectedProducts.value.map((row) => ({
    ...row,
    price: money(row.price),
    amount: money(row.amount),
  })),
)
const total = computed(() =>
  selectedProducts.value.reduce((sum, row) => sum + row.amount, 0),
)
const paymentRate = computed(() => template.value.settings.paymentRatio / 100)
const orders = computed(() => [
  {
    index: 1,
    code: 'PO-20261020-012',
    date: '2026-10-20',
    total: money(total.value),
    paid: '0.00',
    requested: money(total.value * paymentRate.value),
  },
])
const style = computed(() => ({
  width: `${paper.value.width}mm`,
  minHeight: `${paper.value.height}mm`,
  padding: `${template.value.settings.margin}mm`,
  '--document-accent': template.value.settings.accent,
  '--document-font': `${template.value.settings.fontSize}px`,
}))
</script>
<template>
  <article
    class="print-document"
    :class="{
      'document-compact': compact,
      'document-third': template.paper === '0003',
      'is-editable': editable,
    }"
    :style="style"
  >
    <header
      class="document-heading document-region"
      :class="{ selected: editable && activeSection === 'header' }"
      :style="{ textAlign: template.settings.titleAlign }"
      @click="editable && emit('select', 'header')"
    >
      <p v-if="template.settings.showCompany" class="document-company">
        {{ template.settings.company }}
      </p>
      <p v-if="template.settings.showAddress" class="document-address">
        {{ template.settings.address }}
      </p>
      <h1 class="document-title">{{ template.settings.title }}</h1>
      <DocumentAsset
        v-if="template.logo.url"
        :key="`${editable}-logo`"
        v-model="template.logo"
        :editable="!!editable"
        :zoom="zoom"
        label="企业 LOGO"
      />
      <DocumentAsset
        v-if="template.qr.url"
        :key="`${editable}-qr`"
        v-model="template.qr"
        :editable="!!editable"
        :zoom="zoom"
        label="单据二维码"
      />
    </header>

    <div
      class="document-region document-info"
      :class="{ selected: editable && activeSection === 'fields' }"
      @click="editable && emit('select', 'fields')"
    >
      <DocumentFields
        v-model="template.fields"
        :sample="sample"
        :editable="editable"
        @edit="emit('editField', 'fields', $event)"
      />
    </div>
    <div v-if="payment && !compact" class="approval-line">
      <b>审批流程</b><span>采购申请</span><i>→</i><span>部门审核</span><i>→</i
      ><span>财务复核</span><i>→</i><span>出纳付款</span>
    </div>

    <section
      v-if="payment && template.paper !== '0003'"
      class="document-region"
      :class="{ selected: editable && activeSection === 'orders' }"
      @click="editable && emit('select', 'orders')"
    >
      <h2 class="document-section-title">关联订单</h2>
      <DocumentTable
        v-model="template.orderColumns"
        :rows="orders"
        :sample="sample"
        :editable="editable"
        :zoom="zoom"
      />
    </section>

    <section
      class="document-region document-details"
      :class="{ selected: editable && activeSection === 'table' }"
      @click="editable && emit('select', 'table')"
    >
      <h2 class="document-section-title">产品明细</h2>
      <DocumentTable
        v-model="template.columns"
        :rows="rows"
        :sample="sample"
        :editable="editable"
        :zoom="zoom"
      />
      <div v-if="template.settings.showTotals" class="document-totals">
        <div>
          <span>{{ payment ? '订单合计' : '未税金额' }}</span
          ><b
            >¥ {{ sample ? money(payment ? total : total / 1.13) : '@金额' }}</b
          >
        </div>
        <div>
          <span>{{ payment ? '申请比例' : '税额（13%）' }}</span
          ><b>{{
            payment
              ? `${template.settings.paymentRatio}%`
              : `¥ ${sample ? money(total - total / 1.13) : '@税额'}`
          }}</b>
        </div>
        <div class="total-highlight">
          <span>{{ payment ? '本次付款申请' : '价税合计 CNY' }}</span
          ><strong
            >¥
            {{
              sample
                ? money(payment ? total * paymentRate : total)
                : '@合计金额'
            }}</strong
          >
        </div>
      </div>
    </section>

    <div
      class="document-region document-bottom"
      :class="{ selected: editable && activeSection === 'bottom' }"
      @click="editable && emit('select', 'bottom')"
    >
      <DocumentFields
        v-model="template.bottomFields"
        :sample="sample"
        :editable="editable"
        @edit="emit('editField', 'bottom', $event)"
      />
    </div>
    <section
      v-if="!compact && template.terms.some((term) => term.visible)"
      class="document-region document-terms"
      :class="{ selected: editable && activeSection === 'terms' }"
      @click="editable && emit('select', 'terms')"
    >
      <h2 class="document-section-title">
        {{ payment ? '付款说明' : '商务条款' }}
      </h2>
      <div
        v-for="term in template.terms.filter((item) => item.visible)"
        :key="term.id"
        class="document-term"
      >
        <b>{{ term.title }}</b>
        <p>{{ term.text }}</p>
      </div>
    </section>
    <div
      v-if="template.settings.showSignatures || template.seal.url"
      class="document-signatures"
    >
      <template v-if="template.settings.showSignatures"
        ><div>
          <span>{{ payment ? '申请人签字' : '供方确认 / 盖章' }}</span
          ><i></i><small>日期：</small>
        </div>
        <div>
          <span>{{ payment ? '财务审核 / 盖章' : '需方确认 / 盖章' }}</span
          ><i></i><small>日期：</small>
        </div></template
      >
      <DocumentAsset
        v-if="template.seal.url"
        :key="`${editable}-seal`"
        v-model="template.seal"
        :editable="!!editable"
        :zoom="zoom"
        label="印章"
      />
    </div>
  </article>
</template>
