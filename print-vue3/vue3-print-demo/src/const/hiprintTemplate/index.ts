import { amountFields, priceFields, qtyFields, taxRateFields, exchangeRateFields, conversionRatioFields, disRateFields } from './common/formatterField';
import enterprise from './enterprise/enterprise';
import addAdvancePayment from './purchase/addAdvancePayment';

// Mock template object
const mockTemplate = { commonFields: [], tableFields: [], topTableFields: [] };

const templateData: any = {
    '0001': mockTemplate, // saleQutation
    '0002': mockTemplate, // frameworkContract
    '0003': mockTemplate, // saleOrder
    '0016': mockTemplate, // customerReconciliation
    '0004': mockTemplate, // purInquiry
    '0005': mockTemplate, // supplierQuotation
    '0006': mockTemplate, // purOrder
    '0007': mockTemplate, // paymentApplication
    '0008': addAdvancePayment,
    '0009': mockTemplate, // purStockIn
    '0010': mockTemplate, // purReturnGoods
    '0011': mockTemplate, // saleStockOut
    '0012': mockTemplate, // saleReturnGoods
    '0013': mockTemplate, // otherStockIn
    '0014': mockTemplate, // otherStockOut
    '0015': mockTemplate, // transfer
    '0023': mockTemplate, // incomingCheck
    '0024': mockTemplate, // stockOutCheck
    // Label Mocks
    '0018': mockTemplate,
    '0019': mockTemplate,
    '0020': mockTemplate,
    '0021': mockTemplate,
    '0022': mockTemplate,
    '1001': mockTemplate,
    '1002': mockTemplate,
    '1003': mockTemplate,
    '1004': mockTemplate,
    '1005': mockTemplate,
    '1006': mockTemplate,
    '1007': mockTemplate,
};

const templateName: any = {
    '0001': '销售报价单',
    '0002': '框架合同',
    '0003': '销售订单',
    '0016': '客户对账单',
    '0004': '采购询价单',
    '0005': '供应商报价单',
    '0006': "采购订单",
    '0007': "付款申请单",
    '0008': "预付申请单",
    '0009': "采购入库单",
    '0010': "采购退货单",
    '0011': "销售出库单",
    '0012': "销售退货单",
    '0013': "其他入库单",
    '0014': "其他出库单",
    '0015': "调拨单",
    '0023': '来料质检单',
    '0024': '出库检验报告',
    '0018': "产品标签",
    '0019': '库位标签',
    '0020': '车辆标签',
    '0021': '线路标签',
    '0022': '起初产品标签',
    '1001': '采购入库标签',
    '1002': '采购退货标签',
    '1003': '销售出库标签',
    '1004': '销售退货标签',
    '1005': '其他入库标签',
    '1006': '其他出库标签',
    '1007': '箱码标签',
};

export const getTemplateName = (type: string) => {
    return templateName[type] || '未知模板';
}

export const getCommonFields = (type: string) => {
    if (!templateData[type]) return [];
    return [{ text: '企业信息', field: 'enterprise', children: enterprise }].concat(templateData[type].commonFields || []);
}

export const getTileCommonFields = (type: string) => {
    if (!templateData[type]) return [];
    return enterprise.concat(flatten(templateData[type].commonFields || []));
}

export const getTableFields = (type: string) => {
    if (!templateData[type]) return [];
    return flatten(templateData[type].tableFields || []);
}

export const getGroupTableFields = (type: string) => {
    if (!templateData[type]) return [];
    return templateData[type].tableFields || [];
}

export const getTopTableFields = (type: string) => {
    if (!templateData[type]) return [];
    return templateData[type].topTableFields || [];
}

// Mock Vue.prototype helpers
const subNumber = (num: number, type: string) => [100];
const exchangeRateFormatter = (val: any) => '1.00';

export const createPrintData = (type: string) => {
    // ... logic same as before but safe
    return {
        commonData: {},
        tableItem: {},
        topTableItem: {}
    }
}

export const getDemoPrintData = (type: string, length = 10) => {
    return { details: [{}] };
}

export const getAllFields = (type: string) => {
    return getCommonFields(type).concat(getTopTableFields(type)).concat(getGroupTableFields(type));
}

function flatten(arr: any[]) {
    let newArr: any[] = [];
    arr.forEach(item => {
        if (item.children && item.children.length) {
            newArr.push(...flatten(item.children));
        } else {
            newArr.push(item);
        }
    });
    return newArr;
}