/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:49:09
 * @LastEditTime: 2024-11-26 18:10:48
 * @LastEditors: sunsumin
 * @Description:  销售退货单
 * @FilePath: saleReturnGoods.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
export default {
    commonFields: [
        {
            field: 'stockOutDate',
            text: '单据日期'
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
            field: 'paymentTermName',
            text: '收款条件'
        }, {
            field: 'invoiceTypeName',
            text: '发票类型'
        },
        // {
        //     field: 'deliveryAddress',
        //     text: '送货地址'
        // },
        {
            field: 'currencyName',
            text: '币种'
        }, {
            field: 'exchangeRate',
            text: '汇率'
        },
        {
            field: 'manager',
            text: '客户经理',
            children: [{
                field: 'manageName',
                text: '员工姓名',
            }, {
                field: 'managePhone',
                text: '联系方式',
            }, {
                field: 'manageEmail',
                text: '电子邮箱',
            }, {
                field: 'manageDeptName',
                text: '所属部门',
            }]
        },
        {
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
        },
        {
            field: 'mainOriginalQty',
            text: '主单位源单数量'
        }, {
            field: 'mainUnitCurrentStockOutQty',
            text: '主单位数量'
        }, {
            field: 'conversionRatio',
            text: '转换率'
        }, {
            field: 'unitName',
            text: '单位'
        }, {
            field: 'originalQty',
            text: '源单数量'
        }, {
            field: 'currentStockOutQty',
            text: '数量'
        }, {
            field: 'untaxedUnitPrice',
            text: '未税单价'
        }, {
            field: 'taxRate',
            text: '税率'
        }, {
            field: 'taxedUnitPrice',
            text: '含税单价'
        }, {
            field: 'untaxedAmount',
            text: '未税金额'
        }, {
            field: 'taxAmount',
            text: '税额'
        }, {
            field: 'taxedAmount',
            text: '含税金额'
        }, {
            field: 'warehouseLocationName',
            text: '库位'
        }, {
            field: 'batchCode',
            text: '批次号'
        },{
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
            field: 'invoiceTypeName',
            text: '发票类型'
        }, {
            field: 'paymentTermName',
            text: '收款条件'
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
            field: 'orderDate',
            text: '订单日期'
        }, {
            field: 'orderCode',
            text: '订单编号'
        }, {
            field: 'customerOrderCode',
            text: '客户订单号'
        }, {
            field: 'priceConversionTypeName',
            text: '报价标识'
        }, {
            field: 'detailRemark',
            text: '备注'
        }

    ]
}