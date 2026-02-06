/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:50:59
 * @LastEditTime: 2024-11-26 18:12:11
 * @LastEditors: sunsumin
 * @Description: 调拨单
 * @FilePath: transfer.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
export default {
    commonFields: [{
        field: 'transferDate',
        text: '调拨日期'
    }, {
        field: 'transferCode',
        text: '单据编号'
    }, {
        field: 'transferTypeName',
        text: '调拨类型'
    }, {
        field: 'outWarehouse',
        text: '拨出仓库',
        children: [
        {
            field: 'outWarehouseCode',
            text: '仓库编码',
        }, {
            field: 'outWarehouseName',
            text: '仓库名称',
        }, {
            field: 'outWarehouseAddress',
            text: '仓库地址',
        }]
    }, {
        field: 'inWarehouse',
        text: '拨入仓库',
        children: [{
            field: 'inWarehouseCode',
            text: '仓库编码',
        }, {
            field: 'inWarehouseName',
            text: '仓库名称',
        }, {
            field: 'inWarehouseAddress',
            text: '仓库地址',
        }]
    }, {
        field: 'stockOutNoteTypeName',
        text: '出库单据'
    }, {
        field: 'stockOutTypeName',
        text: '出库类型'
    }, {
        field: 'stockInNoteTypeName',
        text: '入库单据'
    }, {
        field: 'stockInTypeName',
        text: '入库类型'
    }, {
        field: 'currencyName',
        text: '币种'
    }, {
        field: 'exchangeRate',
        text: '汇率'
    }, {
        field: 'remark',
        text: '备注'
    }, {
        field: 'createUserName',
        text: '制单人'
    }, {
        field: 'createTime',
        text: '制单时间'
    }, {
        field: 'approvalName',
        text: '审核人'
    }, {
        field: 'approvalTime',
        text: '审核时间'
    }],
    tableFields: [{
        field: 'index',
        text: '序号'
    }, {
        field: 'productInfo',
        text: '产品信息',
        children: [{
            field: 'productCode',
            text: '产品编码',
        },
        {
            field: 'productName',
            text: '产品名称',
        },
        {
            field: 'specificationModel',
            text: '规格型号',
        },
        {
            field: 'brandChName',
            text: '品牌',
        },
        {
            field: 'productCategoryName',
            text: '产品分类',
        },
        {
            field: 'manufactorCode',
            text: '制造商编号',
        },
        {
            field: 'manufactorName',
            text: '制造商名称',
        }, {
            field: 'productLabelName',
            text: '产品标签',
        },
        {
            field: 'barCode',
            text: '条形码',
        }, {
            field: 'unitMeasurementName',
            text: '主计量单位',
        }, ],
    }, {
        field: 'transferQty',
        text: '调拨数量'
    }, {
        field: 'dialOutLocationName',
        text: '拨出库位'
    }, {
        field: 'batchCode',
        text: '批次号'
    }, {
        field: 'vendorBatchCode',
        text: '供应商批次号',
    },{
        field: 'generationDate',
        text: '生产日期'
    }, {
        field: 'qualityPeriod',
        text: '保质期(天)'
    }, {
        field: 'expirationDate',
        text: '到期日期'
    }, {
        field: 'dialOutProjectCode',
        text: '拨出项目号'
    }, {
        field: 'dialInLocationName',
        text: '拨入库位'
    }, {
        field: 'dialInProjectCode',
        text: '拨入项目号'
    }, {
        field: 'sourceDate',
        text: '源单日期'
    }, {
        field: 'sourceCode',
        text: '源单单号'
    }]
}