/*
 * @Author: sunsumin
 * @Date: 2024-07-09 13:46:32
 * @LastEditTime: 2024-11-26 15:09:41
 * @LastEditors: sunsumin
 * @Description: 单据字段总览
 * @FilePath: index.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
import _ from 'lodash'
import Vue from 'vue'
import { amountFields, priceFields, qtyFields, taxRateFields, exchangeRateFields, conversionRatioFields, disRateFields } from './common/formatterField.js';
// 企业信息
import enterprise from './enterprise/enterprise'

//  销售报价单
import saleQutation from './sale/saleQutation';
// 框架合同
import frameworkContract from './sale/frameworkContract';
// 销售订单
import saleOrder from './sale/saleOrder';
// 客户对账单
import customerReconciliation from './sale/customerReconciliation';


// 采购询价单
import purInquiry from './purchase/purInquiry';
// 供应商报价单
import supplierQuotation from './purchase/supplierQuotation';
// 采购订单模板
import purOrder from './purchase/purOrder';
// 付款申请单
import paymentApplication from './purchase/paymentApplication';
// 预付申请单
import addAdvancePayment from './purchase/addAdvancePayment';

// 仓库
// 采购入库单
import purStockIn from './warehouse/purStockIn';
// 采购退货单
import purReturnGoods from './warehouse/purReturnGoods';
// 销售出库单
import saleStockOut from './warehouse/saleStockOut';
// 销售退货单
import saleReturnGoods from './warehouse/saleReturnGoods';
// 其他入库单
import otherStockIn from './warehouse/otherStockIn';
// 其他出库单
import otherStockOut from './warehouse/otherStockOut';
// 调拨单
import transfer from './warehouse/transfer';

// 质检管理
// 来料质检单
import incomingCheck from './qualityCheck/incomingCheck.js';
// 出库检验报告
import stockOutCheck from './qualityCheck/stockOutCheck.js';

// PRINT_CONFIG_XSBJD("0001", "销售报价单"),
// 	PRINT_CONFIG_XSHT("0002", "框架合同"),
// 	PRINT_CONFIG_XSDD("0003", "销售订单"),
// 	PRINT_CONFIG_CGXJD("0004", "采购询价单"),
// 	PRINT_CONFIG_GYSBJD("0005", "供应商报价单"),
// 	PRINT_CONFIG_CGDD("0006", "采购订单"),
// 	PRINT_CONFIG_FKSQD("0007", "付款申请单"),
// 	PRINT_CONFIG_YFSQD("0008", "预付申请单"),
// 	PRINT_CONFIG_CCRKD("0009", "采购入库单"),
// 	PRINT_CONFIG_CCTHD("0010", "采购退货单"),
// 	PRINT_CONFIG_XSCKD("0011", "销售出库单"),
// 	PRINT_CONFIG_XSTHD("0012", "销售退货单"),
// 	PRINT_CONFIG_QTRKD("0013", "其他入库单"),
// 	PRINT_CONFIG_QTCKD("0014", "其他出库单"),
// 	PRINT_CONFIG_DBD("0015", "调拨单"),
// 	PRINT_CONFIG_KHDZD("0016", "客户对账单"),
// 	PRINT_CONFIG_QYXX("0017", "企业信息"),
// 0023：来料质检单
// 0024：出库检验报告

// 条码
// PRINT_CONFIG_CPBQ("0018", "产品标签"),
// PRINT_CONFIG_KWBQ("0019", "库位标签"),
// PRINT_CONFIG_CLBQ("0020", "车辆标签"),
// PRINT_CONFIG_XLBQ("0021", "线路标签"),
// PRINT_CONFIG_QCCPBQ("0022", "期初产品标签"),

// PRINT_CONFIG_CGRKBQ("1001", "采购入库标签"),
// PRINT_CONFIG_CGTBQ("1002", "采购退标签"),
// PRINT_CONFIG_XSCKBQ("1003", "销售出库标签"),
// PRINT_CONFIG_XSTBQ("1004", "销售退标签"),
// PRINT_CONFIG_QTRBQ("1005", "其他入标签"),
// PRINT_CONFIG_QTCKBQ("1006", "其他出标签"),

// 产品标签
import product from './label/product.js';
// 库位标签
import warehouseLocation from './label/warehouseLocation.js';
// 车辆标签
import vehicle from './label/vehicle.js';
// 线路标签
import line from './label/line.js';
// 起初产品标签
import beginningProduct from './label/beginningProduct.js';
// 采购入库标签
import purStockInLabel from './label/purStockIn.js';
// 箱码标签
import caseCode from './label/caseCode.js';
// 采购退货标签
import purReturnGoodsLabel from './label/purReturnGoods.js';
// 销售出库标签
import saleStockOutLabel from './label/saleStockOut.js';
// 销售退货标签
import saleReturnGoodsLabel from './label/saleReturnGoods.js';
// 其他入库标签
import otherStockInLabel from './label/otherStockIn.js';
// 其他出库标签
import otherStockOutLabel from './label/otherStockOut.js';

const templateData = {
    '0001': saleQutation,
    '0002': frameworkContract,
    '0003': saleOrder,
    '0016': customerReconciliation,
    '0004': purInquiry,
    '0005': supplierQuotation,
    '0006': purOrder,
    '0007': paymentApplication,
    '0008': addAdvancePayment,
    '0009': purStockIn,
    '0010': purReturnGoods,
    '0011': saleStockOut,
    '0012': saleReturnGoods,
    '0013': otherStockIn,
    '0014': otherStockOut,
    '0015': transfer,
    '0023': incomingCheck,
    '0024': stockOutCheck,
    // 条码
    '0018': product,
    '0019': warehouseLocation,
    '0020': vehicle,
    '0021': line,
    '0022': beginningProduct,

    '1001': purStockInLabel,
    '1002': purReturnGoodsLabel,
    '1003': saleStockOutLabel,
    '1004': saleReturnGoodsLabel,
    '1005': otherStockInLabel,
    '1006': otherStockOutLabel,
    '1007': caseCode,

};
const templateName = {
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
    // 条码
    // '0017': "企业信息标签",
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
export const getTemplateName = (type) => {
    return templateName[type]
}




// 普通字段(分组)
export const getCommonFields = (type) => {
    if (!templateData[type]) {
        return []
    }
    return [{ text: '企业信息', field: 'enterprise', children: enterprise }].concat(templateData[type].commonFields)

}
// 普通字段(平铺)
export const getTileCommonFields = (type) => {
    if (!templateData[type]) {
        return []
    }
    return enterprise.concat(flatten(templateData[type].commonFields))

}

// 表格字段(平铺)
export const getTableFields = (type) => {
    if (!templateData[type]) {
        return []
    }
    return flatten(templateData[type].tableFields)
}

// 表格字段(分组)
export const getGroupTableFields = (type) => {
    if (!templateData[type]) {
        return []
    }
    return templateData[type].tableFields
}

// 表格字段(表头)
export const getTopTableFields = (type) => {
    if (!templateData[type]) {
        return []
    }
    return templateData[type].topTableFields
}

//  生成模拟数据
export const createPrintData = (type) => {
    let commonData = {};
    getTileCommonFields(type).forEach(item => {
        if (amountFields.includes(item.field)) {
            commonData[item.field] = Vue.prototype.subNumber(1, 'amount')[0];
        } else if (priceFields.includes(item.field)) {
            commonData[item.field] = Vue.prototype.subNumber(1, 'price')[0];
        } else if (qtyFields.includes(item.field)) {
            commonData[item.field] = Vue.prototype.subNumber(1, 'qty')[0];
        } else if (taxRateFields.includes(item.field)) {
            commonData[item.field] = '0%'
        } else if (disRateFields.includes(item.field)) {
            commonData[item.field] = '0%'
        } else if (exchangeRateFields.includes(item.field)) {
            commonData[item.field] = Vue.prototype.exchangeRateFormatter(1)
        } else if (item.field == 'barCode') {
            commonData[item.field] = '6922468401176'
        } else if (item.field == 'warehouseLocationCode') {
            commonData[item.field] = 'WL00001'
        } else if (item.field == 'carCode') {
            commonData[item.field] = 'VF0001'
        } else if (item.field == 'routeCode') {
            commonData[item.field] = 'LF0001'
        } else if (item.field == 'packageCode') {
            commonData[item.field] = 'DR2202020001-1'
        } else if (item.text.includes('码')) {
            commonData[item.field] = '123456789'
        } else {
            commonData[item.field] = `@` + item.text;
        }
    })
    let tableItem = {};
    getTableFields(type).forEach(item => {
        if (amountFields.includes(item.field)) {
            tableItem[item.field] = window.Vue.prototype.subNumber(1, 'amount')[0];
        } else if (priceFields.includes(item.field)) {
            tableItem[item.field] = window.Vue.prototype.subNumber(1, 'price')[0];
        } else if (qtyFields.includes(item.field)) {
            tableItem[item.field] = window.Vue.prototype.subNumber(1, 'quantity')[0];
        } else if (taxRateFields.includes(item.field)) {
            tableItem[item.field] = '0%';
        } else if (exchangeRateFields.includes(item.field)) {
            tableItem[item.field] = window.Vue.prototype.exchangeRateFormatter(1)
        } else if (conversionRatioFields.includes(item.field)) {
            tableItem[item.field] = '1@主计量单位 / @单位';
        } else if (disRateFields.includes(item.field)) {
            tableItem[item.field] = '0%';
        } else if (item.field == 'barCode') {
            tableItem[item.field] = '123456789'
        } else {
            tableItem[item.field] = `@` + item.text;
        }
    })

    let topTableItem = {}
    if (type == '0007' || type == '0008') {
        getTopTableFields(type).forEach(item => {
            if (amountFields.includes(item.field)) {
                topTableItem[item.field] = window.Vue.prototype.subNumber(1, 'amount')[0];
            } else if (priceFields.includes(item.field)) {
                topTableItem[item.field] = window.Vue.prototype.subNumber(1, 'price')[0];
            } else if (qtyFields.includes(item.field)) {
                topTableItem[item.field] = window.Vue.prototype.subNumber(1, 'quantity')[0];
            } else if (taxRateFields.includes(item.field)) {
                topTableItem[item.field] = '0%';
            } else if (exchangeRateFields.includes(item.field)) {
                topTableItem[item.field] = window.Vue.prototype.exchangeRateFormatter(1)
            } else if (conversionRatioFields.includes(item.field)) {
                topTableItem[item.field] = '1@主计量单位 / @单位';
            } else if (disRateFields.includes(item.field)) {
                tableItem[item.field] = '0%';
            } else {
                topTableItem[item.field] = `@` + item.text;
            }

        })
    }
    return {
        commonData,
        tableItem,
        topTableItem
    }

}
// 获取模拟数据
export const getDemoPrintData = (type, length = 10) => {
    if (!templateData[type]) {
        return { details: [{}] }
    }
    let data = createPrintData(type);
    if (type == '0007' || type == '0008') {
        let obj = data.commonData;
        let topItem = data.topTableItem;
        topItem.index = 1;
        obj.topDetails = [topItem];
        obj.bottomDetails = Array.from({
            length: length
        }, (item, index) => {
            let bottomTableItem = _.cloneDeep(data.tableItem);
            bottomTableItem.index = index + 1;
            return bottomTableItem;
        })
        return obj;

    } else {
        let obj = data.commonData;
        obj.details = Array.from({
            length: length
        }, (item, index) => {
            let tableItem = _.cloneDeep(data.tableItem);
            tableItem.index = index + 1;
            return tableItem;
        })
        return obj;
    }


}






// 所有字段
export const getAllFields = (type) => {
    return getCommonFields(type).concat(getTopTableFields(type)).concat(getGroupTableFields(type))
}


function flatten(arr) {
    let newArr = [];
    arr.forEach(item => {
        if (item.children && item.children.length) {
            newArr.push(...flatten(item.children))
        } else {
            newArr.push(item);
        }
    })
    return newArr;
}