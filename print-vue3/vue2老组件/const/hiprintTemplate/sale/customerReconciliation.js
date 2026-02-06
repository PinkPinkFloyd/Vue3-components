/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:43:30
 * @LastEditTime: 2024-11-26 18:09:39
 * @LastEditors: sunsumin
 * @Description: 客户对账单
 * @FilePath: customerReconciliation.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    commonFields: [
        {
            field: 'accountStatementDate',
            text: '对账日期'
        },
        {
            field: 'accountStatementCode',
            text: '单据编号'
        },
        {
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
        },
         {
            field: 'currencyName',
            text: '币种'
        },  {
            field: 'remark',
            text: '备注'
        }, {
            field: 'createUserName',
            text: '制单人'
        }, {
            field: 'createTime',
            text: '制单时间'
        },
    ],
    tableFields: [
    {
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
        },
        {
            field: 'customerProductCode',
            text: '客户料号',
        }, {
            field: 'customerProductName',
            text: '客户品名',
        }, {
            field: 'customerProductSpec',
            text: '客户规格型号',
        }, {
            field: 'customerProductBrand',
            text: '客户品牌',
        }, {
            field: 'unitMeasurementName',
            text: '主计量单位',
        }, ],

    }, {
        field: 'conversionRatio',
        text: '转换率',
    },
    {
        field: 'unitName',
        text: '单位',
    },
    {
        field: 'orderQty',
        text: '订单数量',
    }, {
        field: 'currentStockOutQty',
        text: '出库数量',
    }, {
        field: 'accountStatementQty',
        text: '本次对账数量',
    },
    {
        field: 'untaxedUnitPrice',
        text: '未税单价',
    }, {
        field: 'taxRate',
        text: '税率',
    },
    {
        field: 'taxedUnitPrice',
        text: '含税单价',
    }, {
        field: 'untaxedAmount',
        text: '未税金额',
    }, {
        field: 'taxAmount',
        text: '税额',
    }, {
        field: 'taxedAmount',
        text: '含税金额',
    }, {
        field: 'stockOutDate',
        text: '出库日期',
    }, {
        field: 'stockOutCode',
        text: '出库单号',
    }, {
        field: 'stockOutTypeName',
        text: '出库类型',
    }, {
        field: 'invoiceTypeName',
        text: '发票类型',
    },{
        field: 'orderDate',
        text: '订单日期',
    },{
        field: 'orderCode',
        text: '订单编号',
    },{
        field: 'customerOrderCode',
        text: '客户订单号',
    },{
        field: 'signStatusName',
        text: '签收状态',
    },{
        field: 'warehouseName',
        text: '仓库',
    },{
        field: 'warehouseLocationName',
        text: '库位',
    },{
        field: 'batchCode',
        text: '批次号',
    },{
        field: 'vendorBatchCode',
        text: '供应商批次号',
    },{
        field: 'generationDate',
        text: '生产日期',
    },{
        field: 'qualityPeriod',
        text: '保质期(天)',
    },{
        field: 'expirationDate',
        text: '到期日期',
    },{
        field: 'linkerName',
        text: '联系人',
    },{
        field: 'paymentDate',
        text: '结款日期',
    },{
        field: 'priceConversionTypeName',
        text: '报价标识',
    },{
        field: 'remark',
        text: '备注',
    }]
}