/*
 * @Author: sunsumin
 * @Date: 2024-07-09 13:46:32
 * @LastEditTime: 2024-11-29 10:54:08
 * @LastEditors: sunsumin
 * @Description: 销售订单
 * @FilePath: saleOrder.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    commonFields: [{
        field: 'orderDate',
        text: '订单日期'
    },
    {
        field: 'slsOrderCode',
        text: '单据编号'
    },
    {
        field: 'businessTypeName',
        text: '业务类型'
    },
    {
        field: 'sourceTypeName',
        text: '单据来源'
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
    }, {
        field: 'customerOrderCode',
        text: '客户订单号'
    }, {
        field: 'invoiceTypeName',
        text: '发票类型'
    }, {
        field: 'taxRate',
        text: '税率'
    }, {
        field: 'currencyName',
        text: '币种'
    }, {
        field: 'exchangeRate',
        text: '汇率'
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
        field: 'paymentTermName',
        text: '收款条件',
    }, {
        field: 'deliveryDate',
        text: '发货日期',
    }, {
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
    }, {
        field: 'contactName',
        text: '客户联系人',
    }, {
        field: 'contactNumber',
        text: '客户联系人电话',
    }, {
        field: 'contactDeptName',
        text: '客户联系人部门',
    }, {
        field: 'contactEmail',
        text: '客户联系人电子邮箱',
    }, {
        field: 'deliveryAddress',
        text: '送货地址',
    }, {
        field: 'remark',
        text: '备注',
    }, {
        field: 'wholeDocDisAmount',
        text: '整单折扣额',
    }, 
    // {
    //     field: 'wholeDocDisRate',
    //     text: '整单折扣率',
    // }, 
    {
        field: 'totalUntaxedAmount',
        text: '整单未税金额',
    }, {
        field: 'totalTaxAmount',
        text: '整单税额',
    }, {
        field: 'totalTaxedAmount',
        text: '整单含税金额',
    }],
    tableFields: [{
            field: 'index',
            text: '序号'
        },
        {
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

        },

        {
            field: 'productQty',
            text: '主单位数量',
        },
        {
            field: 'conversionRatio',
            text: '转换率'
        },
        {
            field: 'unitName',
            text: '单位'
        },
        {
            field: 'customerProductQty',
            text: '数量'
        },
        {
            field: 'taxedQuotationPrice',
            text: '含税报价'
        },
        {
            field: 'customerUntaxedUnitPrice',
            text: '未税单价'
        },
        {
            field: 'taxRate',
            text: '税率'
        },
        {
            field: 'customerTaxedUnitPrice',
            text: '含税单价'
        },
        {
            field: 'untaxedAmount',
            text: '未税金额'
        },
        {
            field: 'taxAmount',
            text: '税额'
        },
        {
            field: 'taxedAmount',
            text: '含税金额'
        },
        {
            field: 'quoDisRateStr',
            text: '折扣率'
        }, {
            field: 'quoDisAmount',
            text: '折扣金额'
        }, {
            field: 'wholeDocAssesAmount',
            text: '整单折扣分摊金额'
        }, {
            field: 'wholeDocDisRateStr',
            text: '整单折扣率'
        },
        {
            field: 'deliveryDate',
            text: '发货日期'
        },
        {
            field: 'customerOrderCode',
            text: '客户订单号'
        },
        {
            field: 'orderSourceName',
            text: '来源单据'
        },
        {
            field: 'originNoticeCode',
            text: '来源单号'
        },
        {
            field: 'priceConversionTypeName',
            text: '报价标识'
        },
        {
            field: 'remark',
            text: '备注'
        }

    ]
}