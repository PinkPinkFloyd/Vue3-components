/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:50:13
 * @LastEditTime: 2024-11-26 18:11:56
 * @LastEditors: sunsumin
 * @Description: 其他出库单
 * @FilePath: otherStockOut.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    commonFields: [{
        field: 'stockOutDate',
        text: '出库日期'
    }, {
        field: 'stockOutCode',
        text: '单据编号'
    }, {
        field: 'stockOutTypeName',
        text: '出库类型'
    }, {
        field: 'customer',
        text: '客户',
        children: [
        {
            field: 'customerCode',
            text: '客户编码',
        },
        {
            field: 'customerName',
            text: '客户名称',
        }, {
            field: 'paymentTermNameDefault',
            text: '收款条件',
        }, {
            field: 'creditLine',
            text: '信用额度',
        },
        {
            field: 'customerManager',
            text: '客户经理',
            children: [{
                field: 'cmEmployeeName',
                text: '员工姓名',
            }, {
                field: 'cmPhone',
                text: '联系方式',
            }, {
                field: 'cmEmail',
                text: '电子邮箱',
            }, {
                field: 'cmDeptName',
                text: '所属部门',
            }]
        },
        {
            field: 'customerAssistant',
            text: '客户助理',
            children: [{
                field: 'employeeName',
                text: '员工姓名',
            },
            {
                field: 'phone',
                text: '联系方式',
            }, {
                field: 'email',
                text: '电子邮箱',
            }, {
                field: 'deptName',
                text: '所属部门',
            }]
        },
        {
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
                field: 'accountBank',
                text: '开户银行',
            }, {
                field: 'accountBankNum',
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
    }, ],
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
        },
        {
            field: 'mainUnitCurrentStockOutQty',
            text: '数量'
        },
        {
            field: 'unitCost',
            text: '单位成本'
        },
        {
            field: 'stockOutCost',
            text: '出库成本'
        },
        {
            field: 'warehouseLocationName',
            text: '库位'
        },
        {
            field: 'batchCode',
            text: '批次号'
        },
        {
            field: 'vendorBatchCode',
            text: '供应商批次号',
        },
        {
            field: 'generationDate',
            text: '生产日期'
        },
        {
            field: 'qualityPeriod',
            text: '保质期(天)'
        },
        {
            field: 'expirationDate',
            text: '到期日期'
        },
        {
            field: 'projectCode',
            text: '项目号'
        },
        {
            field: 'directSourceNoteName',
            text: '源单类型'
        },
        {
            field: 'directSourceNoteDate',
            text: '源单日期'
        },
        {
            field: 'directSourceNoteCode',
            text: '源单单号'
        },
        {
            field: 'detailRemark',
            text: '备注'
        },

    ]
}