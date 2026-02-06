/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:34:37
 * @LastEditTime: 2024-08-16 13:37:46
 * @LastEditors: sunsumin
 * @Description: 销售报价单
 * @FilePath: saleQutation.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    commonFields: [
        {
            field: 'quotationDate',
            text: '报价日期'
        },
        {
            field: 'quotationCode',
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
            field: 'inquiryCode',
            text: '询价单号'
        }, {
            field: 'inquiryUserName',
            text: '询价人'
        }, {
            field: 'currencyName',
            text: '币种'
        }, {
            field: 'exchangeRate',
            text: '汇率'
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
            field: 'taxRate',
            text: '税率'
        }, {
            field: 'effectiveDateEnd',
            text: '价格失效日期'
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
        }




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
        field: 'mainUnitUntaxedPrice',
        text: '主单位未税售价',
    }, {
        field: 'mainUnitTaxedPrice',
        text: '主单位含税售价',
    }, {
        field: 'conversionRatio',
        text: '转换率',
    },
    {
        field: 'unitName',
        text: '单位',
    },
    {
        field: 'unitQty',
        text: '数量',
    }, {
        field: 'minMiniQty',
        text: '起订量',
    }, {
        field: 'untaxedPrice',
        text: '未税售价',
    },{
        field: 'taxRate',
        text: '税率',
    },
    {
        field: 'taxedPrice',
        text: '含税售价',
    }, {
        field: 'untaxedAmount',
        text: '未税报价金额',
    },
    {
        field: 'taxAmount',
        text: '税额',
    }, {
        field: 'taxedAmount',
        text: '含税报价金额',
    }, {
        field: 'deliveryDate',
        text: '交货日期',
    }, {
        field: 'supplyGoodsCycle',
        text: '供货周期',
    }, {
        field: 'effectiveDateStart',
        text: '价格生效日期',
    }, {
        field: 'effectiveDateEnd',
        text: '价格失效日期',
    }, {
        field: 'priceConversionTypeName',
        text: '报价标识',
    }, {
        field: 'remark',
        text: '备注',
    }],

}