/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:49:51
 * @LastEditTime: 2024-07-25 15:30:02
 * @LastEditors: sunsumin
 * @Description: 其他入库单
 * @FilePath: otherStockIn.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
export default {
    commonFields: [{
        field: 'stockInDate',
        text: '入库日期'
    }, {
        field: 'stockInCode',
        text: '单据编号'
    }, {
        field: 'stockInTypeName',
        text: '入库类型'
    }, {
        field: 'vendor',
        text: '供应商',
        children: [{
            field: 'vendorCode',
            text: '供应商编码',
        }, {
            field: 'vendorName',
            text: '供应商名称',
        }, {
            field: 'legalRepresent',
            text: '企业信息',
            children: [{
                field: 'legalRepresentative',
                text: '企业法人',
            },
            {
                field: 'usci',
                text: '社会信用代码',
            },
            {
                field: 'taxNumber',
                text: '税号',
            }, {
                field: 'accountBankDefault',
                text: '开户银行',
            }, {
                field: 'accountBankNumDefault',
                text: '银行账号',
            }, {
                field: 'enpPhone',
                text: '企业电话',
            }, {
                field: 'enpAddress',
                text: '企业地址',
            }]
        }]
    }, {
        field: 'warehouse',
        text: '仓库',
        children: [{
            field: 'warehouseCode',
            text: '仓库编码',
        }, {
            field: 'warehouseName',
            text: '仓库名称',
        }, {
            field: 'warehouseAddress',
            text: '仓库地址',
        }, ]
    }, {
        field: 'currencyName',
        text: '币种'
    }, {
        field: 'exchangeRate',
        text: '汇率'
    }, {
        field: 'remark',
        text: '备注',
    }, {
        field: 'createUserName',
        text: '制单人',
    }, {
        field: 'createTime',
        text: '制单时间',
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
        }, {
            field: 'productName',
            text: '产品名称',
        }, {
            field: 'specificationModel',
            text: '规格型号',
        }, {
            field: 'brandChName',
            text: '品牌',
        }, {
            field: 'productCategoryName',
            text: '产品分类',
        }, {
            field: 'manufactorCode',
            text: '制造商编号',
        }, {
            field: 'manufactorName',
            text: '制造商名称',
        }, {
            field: 'productLabelName',
            text: '产品标签',
        }, {
            field: 'barCode',
            text: '条形码',
        }, {
            field: 'unitMeasurementName',
            text: '主计量单位',
        }]
    }, {
        field: 'mainUnitCurrentStockInQty',
        text: '数量'
    }, {
        field: 'mainUnitUntaxedUnitPrice',
        text: '单位成本'
    }, {
        field: 'mainUnitUntaxedAmount',
        text: '入库成本'
    }, {
        field: 'warehouseLocationName',
        text: '库位'
    }, {
        field: 'batchCode',
        text: '批次号'
    }, {
        field: 'vendorBatchCode',
        text: '供应商批次号',
    }, {
        field: 'generationDate',
        text: '生产日期'
    }, {
        field: 'qualityPeriod',
        text: '保质期(天)'
    }, {
        field: 'expirationDate',
        text: '到期日期'
    }, {
        field: 'projectCode',
        text: '项目号'
    }, {
        field: 'directSourceNoteName',
        text: '源单类型'
    }, {
        field: 'directSourceNoteDate',
        text: '源单日期'
    }, {
        field: 'directSourceNoteCode',
        text: '源单单号'
    }, {
        field: 'detailRemark',
        text: '备注'
    }]
}