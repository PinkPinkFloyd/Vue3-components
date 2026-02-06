/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:46:38
 * @LastEditTime: 2024-07-26 14:54:28
 * @LastEditors: sunsumin
 * @Description: 预付申请单
 * @FilePath: addAdvancePayment.js
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
            field: 'orderQty',
            text: '订单数量'
        },
        {
            field: 'untaxedUnitPrice',
            text: '未税单价'
        },
        {
            field: 'taxRate',
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
            field: 'deliveryDate',
            text: '到货日期'
        },
        {
            field: 'priceConversionTypeName',
            text: '报价标识'
        },
        {
            field: 'detailRemark',
            text: '备注'
        }

    ],
    topTableFields: [
        {
            field: 'index',
            text: '序号'
        },
        {
            field: 'orderDate',
            text: '订单日期'
        },
        {
            field: 'orderCode',
            text: '订单编号'
        },
        {
            field: 'paymentTermName',
            text: '付款条件'
        },
        {
            field: 'invoiceTypeName',
            text: '发票类型'
        },
        {
            field: 'buyerName',
            text: '采购员'
        },
        {
            field: 'untaxedTotalAmount',
            text: '未税金额'
        },
        {
            field: 'taxedTotal',
            text: '税额'
        },
        {
            field: 'taxedTotalAmount',
            text: '含税金额'
        }, {
            field: 'advancedAmount',
            text: '订单预付金额'
        }, {
            field: 'paymentAmount',
            text: '订单已付款金额'
        }, {
            field: 'canPaymentAmount',
            text: '订单未付款金额'
        }, {
            field: 'currentAddPrepayAmount',
            text: '付款申请金额'
        }, {
            field: 'projectCode',
            text: '项目号'
        }

    ]
}