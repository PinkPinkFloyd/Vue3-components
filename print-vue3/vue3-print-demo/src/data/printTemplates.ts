import type {
  Paper,
  PrintColumn,
  PrintField,
  PrintTemplate,
  ProductRow,
} from '@/types/print'

export const documentTypes = [
  {
    code: '0001',
    name: '销售报价单',
    category: '销售管理',
    english: 'QUOTATION',
    prefix: 'QT',
  },
  {
    code: '0003',
    name: '销售订单',
    category: '销售管理',
    english: 'SALES ORDER',
    prefix: 'SO',
  },
  {
    code: '0006',
    name: '采购订单',
    category: '采购管理',
    english: 'PURCHASE ORDER',
    prefix: 'PO',
  },
  {
    code: '0007',
    name: '付款申请单',
    category: '财务管理',
    english: 'PAYMENT REQUEST',
    prefix: 'PA',
  },
  {
    code: '0008',
    name: '预付申请单',
    category: '财务管理',
    english: 'ADVANCE PAYMENT',
    prefix: 'AP',
  },
  {
    code: '0011',
    name: '销售出库单',
    category: '仓储管理',
    english: 'DELIVERY NOTE',
    prefix: 'DN',
  },
]
export const papers: {
  value: Paper
  label: string
  width: number
  height: number
}[] = [
  { value: '0001', label: 'A4 · 210 × 297 mm', width: 210, height: 297 },
  { value: '0002', label: '二等分 · 241 × 140 mm', width: 241, height: 140 },
  { value: '0003', label: '三等分 · 241 × 93 mm', width: 241, height: 93 },
]
export const products: ProductRow[] = [
  {
    index: 1,
    product: '深沟球轴承',
    model: '6205-2RS / 内径 25mm',
    unit: '套',
    qty: 12,
    price: 86,
    amount: 1032,
    delivery: '2026-11-02',
    brand: 'SKF',
  },
  {
    index: 2,
    product: '三相异步电动机',
    model: 'YE3-90L-4 / 1.5kW',
    unit: '台',
    qty: 2,
    price: 1680,
    amount: 3360,
    delivery: '2026-11-02',
    brand: '皖南电机',
  },
  {
    index: 3,
    product: '光电传感器',
    model: 'E3Z-D61 / DC 12-24V',
    unit: '只',
    qty: 8,
    price: 245,
    amount: 1960,
    delivery: '2026-11-03',
    brand: 'OMRON',
  },
  {
    index: 4,
    product: '标准型气缸',
    model: 'SC32 × 100-S',
    unit: '支',
    qty: 4,
    price: 320,
    amount: 1280,
    delivery: '2026-11-03',
    brand: '亚德客',
  },
  {
    index: 5,
    product: '小型中间继电器',
    model: 'MY2N-GS / AC 220V',
    unit: '只',
    qty: 20,
    price: 32,
    amount: 640,
    delivery: '2026-11-04',
    brand: 'OMRON',
  },
  {
    index: 6,
    product: '梅花弹性联轴器',
    model: 'ML3 / Φ25 × Φ28',
    unit: '套',
    qty: 6,
    price: 118,
    amount: 708,
    delivery: '2026-11-04',
    brand: '联优',
  },
]
export const money = (value: number) =>
  value.toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
export const cloneTemplate = (template: PrintTemplate): PrintTemplate =>
  JSON.parse(JSON.stringify(template))
export const isPayment = (type: string) => ['0007', '0008'].includes(type)
const field = (
  id: string,
  label: string,
  value: string,
  visible = true,
  wide = false,
): PrintField => ({ id, label, value, visible, wide })

export function createTemplate(
  type = '0001',
  name?: string,
  paper: Paper = '0001',
): PrintTemplate {
  const definition =
    documentTypes.find((item) => item.code === type) ?? documentTypes[0]
  const payment = isPayment(type)
  const purchase = type === '0006' || payment
  const columns: PrintColumn[] = [
    { key: 'index', label: '序号', width: 36, visible: true, align: 'center' },
    { key: 'product', label: '产品名称', width: 120, visible: true },
    { key: 'model', label: '规格型号', width: 150, visible: true },
    { key: 'unit', label: '单位', width: 38, visible: true, align: 'center' },
    { key: 'qty', label: '数量', width: 48, visible: true, align: 'right' },
    {
      key: 'price',
      label: '含税单价',
      width: 76,
      visible: type !== '0011',
      align: 'right',
    },
    {
      key: 'amount',
      label: '含税金额',
      width: 88,
      visible: type !== '0011',
      align: 'right',
    },
    {
      key: 'delivery',
      label: '交付日期',
      width: 80,
      visible: true,
      align: 'center',
    },
    { key: 'brand', label: '品牌', width: 80, visible: false },
  ]
  return {
    id: `template-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name || `${definition.name} · 标准商务版`,
    type,
    paper,
    isDefault: false,
    updatedAt: '2026-10-26',
    settings: {
      company: '夏日工业科技有限公司',
      address: '苏州市工业园区星湖街 328 号 · 0512-6800 2688',
      title: definition.name,
      accent: '#234d71',
      fontSize: paper === '0001' ? 11 : 10,
      margin: paper === '0001' ? 12 : 5,
      showCompany: true,
      showAddress: true,
      showTotals: type !== '0011',
      showSignatures: true,
      rowCount: paper === '0001' ? 6 : paper === '0002' ? 2 : 1,
      paymentRatio: type === '0008' ? 30 : 100,
      titleAlign: 'center',
    },
    fields: payment
      ? [
          field('vendor', '供应商名称', '苏州联创机电设备有限公司'),
          field('code', '单据编号', `${definition.prefix}-20261026-008`),
          field('bank', '收款银行', '中国工商银行苏州工业园区支行'),
          field('date', '申请日期', '2026-10-26'),
          field('account', '收款账号', '6222 **** **** 8006（示例）'),
          field('applicant', '申请人', '林夏 / 采购部'),
          field('payment', '支付方式', '银行转账'),
          field('currency', '币种', '人民币 CNY'),
        ]
      : [
          field(
            'customer',
            purchase ? '供应商名称' : '客户名称',
            purchase ? '苏州联创机电设备有限公司' : '苏州远行智能制造有限公司',
          ),
          field('code', '单据编号', `${definition.prefix}-20261026-001`),
          field(
            'contact',
            '联系人',
            purchase ? '王先生 / 138 **** 2068' : '陈女士 / 139 **** 6028',
          ),
          field('date', '单据日期', '2026-10-26'),
          field('address', '交付地址', '苏州市工业园区星港街 88 号一号仓'),
          field(
            'validity',
            type === '0011' ? '发货方式' : '有效期',
            type === '0011' ? '物流配送 / 运费预付' : '报价后 15 日内有效',
          ),
          field(
            'sales',
            purchase ? '采购员' : '业务员',
            '林夏 / 0512-6800 2688',
            false,
          ),
          field('project', '项目名称', '智能产线设备维护项目', false),
        ],
    bottomFields: [
      field(
        'remark',
        '单据备注',
        payment
          ? '产线维护备件采购，按合同约定申请付款。'
          : '请按约定交期交付，随货附产品合格证。',
        true,
        true,
      ),
      field('creator', '制单人', '林夏'),
      field('created', '制单时间', '2026-10-26 09:30'),
      field('reviewer', '审核人', '周远', false),
    ],
    columns,
    orderColumns: [
      {
        key: 'index',
        label: '序号',
        width: 36,
        visible: true,
        align: 'center',
      },
      { key: 'code', label: '订单编号', width: 160, visible: true },
      {
        key: 'date',
        label: '订单日期',
        width: 100,
        visible: true,
        align: 'center',
      },
      {
        key: 'total',
        label: '订单含税金额',
        width: 110,
        visible: true,
        align: 'right',
      },
      {
        key: 'paid',
        label: '已付款金额',
        width: 100,
        visible: true,
        align: 'right',
      },
      {
        key: 'requested',
        label: '本次申请金额',
        width: 110,
        visible: true,
        align: 'right',
      },
    ],
    terms: [
      {
        id: 'delivery',
        title: payment ? '付款说明' : '交付与验收',
        text: payment
          ? type === '0008'
            ? '按合同金额的 30% 申请预付款，余款在验收合格后结清。\n付款前请核对供应商名称、收款账户及合同约定。'
            : '产品已完成验收，本次按订单全额申请付款。\n付款前请核对发票、收款账户及合同约定。'
          : '产品以双方确认的规格型号为准，收货后 7 个工作日内完成数量与质量验收。\n如有异常，请保留包装并及时联系业务负责人。',
        visible: true,
      },
      {
        id: 'settlement',
        title: payment ? '附件清单' : '结算与服务',
        text: payment
          ? '采购合同 1 份、订单明细 1 份、供应商收款信息 1 份。'
          : '以上价格含 13% 增值税，支持开具增值税专用发票。\n本单经双方确认后生效，未尽事宜另行协商。',
        visible: true,
      },
    ],
    logo: { url: '', x: 0, y: 0, width: 100, height: 40 },
    seal: { url: '', x: 440, y: 0, width: 70, height: 70 },
    qr: { url: '', x: 610, y: 30, width: 65, height: 65 },
  }
}
export const seedTemplates: PrintTemplate[] = documentTypes.map(
  (type, index) => {
    const template = createTemplate(type.code)
    template.id = String(index + 1)
    template.isDefault = true
    return template
  },
)
