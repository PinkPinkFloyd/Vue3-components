/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:46:11
 * @LastEditTime: 2024-08-14 14:32:52
 * @LastEditors: sunsumin
 * @Description: 付款申请单
 * @FilePath: paymentApplication.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
export default {
    commonFields: [{
            field: 'applyDate',
            text: '申请日期',
        },
        {
            field: 'paymentCode',
            text: '单据编号'
        },
        {
            field: 'paymentTypeName',
            text: '付款申请类型'
        },
        {
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
        },

        {
            field: 'paymentStyleName',
            text: '支付方式'
        },
        {
            field: 'accountBank',
            text: '收款银行'
        },
        {
            field: 'accountBankNum',
            text: '收款账号'
        },
        {
            field: 'buyer',
            text: '采购员',
            children: [{
                field: 'employeeName',
                text: '员工姓名',
            }, {
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
            field: 'currencyName',
            text: '币种'
        },
        {
            field: 'paymentAmount',
            text: '付款申请金额'
        },
        {
            field: 'remark',
            text: '备注'
        },
        {
            field: 'createUserName',
            text: '制单人',
        }, {
            field: 'createTime',
            text: '制单时间',
        }, {
            field: 'approvalName',
            text: '审核人',
        }, {
            field: 'approvalTime',
            text: '审核时间',
        }

    ],
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
            },{
                field: 'manufactorName',
                text: '制造商名称',
            }, {
                field: 'productLabelName',
                text: '产品标签',
            }, {
                field: 'barCode',
                text: '条形码',
            }, {
                field: 'vendorProductCode',
                text: '供应商料号',
            }, {
                field: 'vendorProductName',
                text: '供应商品名',
            },{
                field: 'vendorProductSpec',
                text: '供应商规格型号',
            }, {
                field: 'vendorProductBrand',
                text: '供应商品牌',
            }, {
                field: 'unitMeasurementName',
                text: '主计量单位',
            }]
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
            field: 'originalQty',
            text: '源单数量'
        },
        {
            field: 'invoicedQty',
            text: '开票数量'
        },
        {
            field: 'untaxedUnitPrice',
            text: '未税单价'
        },
        {
            field: 'taxedRate',
            text: '税率'
        },
        {
            field: 'taxedUnitPrice',
            text: '含税单价'
        },
        {
            field: 'untaxedAmount',
            text: '未税金额'
        },
        {
            field: 'taxAmount',
            text: '税额'
        }, {
            field: 'taxedAmount',
            text: '含税金额'
        },
        {
            field: 'purchaseOrderCode',
            text: '订单编号'
        },
        {
            field: 'orderDate',
            text: '订单日期'
        },
        {
            field: 'stockInTypeName',
            text: '入库类型'
        },
        {
            field: 'stockInCode',
            text: '入库单号'
        },
        {
            field: 'stockInDate',
            text: '入库日期'
        },
        {
            field: 'paymentTermName',
            text: '付款条件'
        },
        {
            field: 'paymentDate',
            text: '结款日期'
        },
        {
            field: 'accountStatementCode',
            text: '对账单编号'
        },
        {
            field: 'accountStatementDate',
            text: '对账单日期'
        },
        {
            field: 'priceConversionTypeName',
            text: '报价标识'
        },
        {
            field: 'projectCode',
            text: '项目号'
        }

    ],
    topTableFields: [
        {
            field: 'index',
            text: '序号'
        },
        {
            field: 'invoiceCode',
            text: '发票号码'
        },
        {
            field: 'invoiceEncode',
            text: '发票代码'
        },
        {
            field: 'invoiceDate',
            text: '发票日期'
        },
        {
            field: 'registerDate',
            text: '登记日期'
        },
        {
            field: 'registerName',
            text: '登记人'
        },
        {
            field: 'invoiceTypeName',
            text: '发票类型'
        },
        {
            field: 'invoiceAmount',
            text: '含税金额'
        },
        {
            field: 'currentAmount',
            text: '付款申请金额'
        },

    ]
}