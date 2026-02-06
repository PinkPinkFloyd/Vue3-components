// 金额
export const amountFields = [
    'untaxedAmount',
    'taxAmount',
    'taxedAmount',
    'untaxedTotalAmount',
    'taxedTotal',
    'taxedTotalAmount',
    'advancedAmount',
    'paymentAmount',
    'canPaymentAmount',
    'currentAddPrepayAmount',
    'paymentAmount', //header
    'invoiceAmount',
    'currentAmount',
    'mainUnitUntaxedAmount',
    'stockOutCost',
    // 'creditLine',//信用额度
    'quoDisAmount',//折扣金额
    'wholeDocAssesAmount',//整单折扣分摊金额
    'wholeDocDisAmount',//整单折扣额
    'totalUntaxedAmount',//整单未税金额
    'totalTaxAmount',//整单税额
    'totalTaxedAmount',//整单含税金额
];

// 单价
export const priceFields = [
    'taxedUnitPrice',
    'untaxedUnitPrice',
    'untaxedPrice',
    'taxedPrice',
    'customerUntaxedUnitPrice',
    'customerTaxedUnitPrice',
    'mainUnitUntaxedPrice',
    'mainUnitTaxedPrice',
    'mainUntaxedPrice',
    'mainTaxedPrice',
    'mainUnitUntaxedUnitPrice',
    'unitCost',
    'totalCost',
    'taxedQuotationPrice',//含税报价
];

// 数量
export const qtyFields = [
    'orderQty',
    'unitQty',
    'minMiniQty',
    'currentStockOutQty',
    'accountStatementQty',
    'contractQty',
    'contractMainQty',
    'productQty',
    'customerProductQty',
    'originalQty',
    'invoicedQty',
    'mainInquiryQty',
    'inquiryQty',
    'mainOrderQty',
    'mainQuotationNum',
    'quotationNum',
    'mainUnitCurrentStockOutQty',
    'mainUnitCurrentStockInQty',
    'mainOriginalQty',
    'currentStockInQty',
    'transferQty',
    'stockQty',
    'acNum',
    'reNum',
    'inspectionQty',
    'samplingQty',
    'samplingQualifiedQty',
    'samplingDefectiveProductQty',
    'indicatorQualifiedQty',
    'indicatorUnqualifiedQty',
    'sampleValueQty'
];

// 税率
export const taxRateFields = ['taxRate', 'taxedRate','slsTaxRate'];

// 汇率
export const exchangeRateFields = ['exchangeRate']

// 转换率
export const conversionRatioFields = ['conversionRatio']

// 折扣率
export const disRateFields = ['quoDisRate', 'wholeDocDisRate'];
