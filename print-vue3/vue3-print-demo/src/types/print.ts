export type Paper = '0001' | '0002' | '0003'
export type Section =
  | 'header'
  | 'fields'
  | 'orders'
  | 'table'
  | 'bottom'
  | 'terms'
  | 'settings'
export interface PrintField {
  id: string
  label: string
  value: string
  visible: boolean
  wide?: boolean
}
export interface PrintColumn {
  key: string
  label: string
  width: number
  visible: boolean
  align?: 'left' | 'center' | 'right'
}
export interface PrintAsset {
  url: string
  x: number
  y: number
  width: number
  height: number
}
export interface PrintTemplate {
  id: string
  name: string
  type: string
  paper: Paper
  isDefault: boolean
  updatedAt: string
  settings: {
    company: string
    address: string
    title: string
    accent: string
    fontSize: number
    margin: number
    showCompany: boolean
    showAddress: boolean
    showTotals: boolean
    showSignatures: boolean
    rowCount: number
    paymentRatio: number
    titleAlign: 'left' | 'center' | 'right'
  }
  fields: PrintField[]
  bottomFields: PrintField[]
  columns: PrintColumn[]
  orderColumns: PrintColumn[]
  terms: { id: string; title: string; text: string; visible: boolean }[]
  logo: PrintAsset
  seal: PrintAsset
  qr: PrintAsset
}
export interface ProductRow {
  index: number
  product: string
  model: string
  unit: string
  qty: number
  price: number
  amount: number
  delivery: string
  brand: string
}
