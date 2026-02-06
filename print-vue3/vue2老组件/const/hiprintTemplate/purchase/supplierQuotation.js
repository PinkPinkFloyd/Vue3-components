/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:45:29
 * @LastEditTime: 2024-08-14 14:36:42
 * @LastEditors: sunsumin
 * @Description: 供应商报价单
 * @FilePath: supplierQuotation.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    commonFields: [
    {
        field: 'quotationDate',
        text: '报价日期'
    }, {
        field: 'purVendorQuotationCode',
        text: '单据编号'
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
    }, {
        field: 'currencyName',
        text: '币种',
    }, {
        field: 'exchangeRate',
        text: '汇率',
    }, {
        field: 'taxRate',
        text: '税率',
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
        text: '审核人',
    }, {
        field: 'approvalTime',
        text: '审核时间',
    }],
    tableFields: [{
        field: 'index',
        text: '序号',
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
    }, {
        field: 'mainQuotationNum',
        text: '主单位报价数量',
    }, {
        field: 'mainUntaxedPrice',
        text: '主单位未税单价',
    }, {
        field: 'mainTaxedPrice',
        text: '主单位含税单价',
    }, {
        field: 'conversionRatio',
        text: '转换率',
    }, {
        field: 'unitName',
        text: '单位',
    }, {
        field: 'quotationNum',
        text: '报价数量',
    }, {
        field: 'moq',
        text: '起订量',
    }, {
        field: 'untaxedPrice',
        text: '未税单价',
    }, {
        field: 'taxRate',
        text: '税率',
    }, {
        field: 'taxedPrice',
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
        field: 'supplyCycle',
        text: '供货周期',
    }, {
        field: 'effectiveDateStart',
        text: '价格生效日期',
    }, {
        field: 'effectiveDateEnd',
        text: '价格失效日期',
    }, {
        field: 'sourceFromName',
        text: '来源单据',
    }, {
        field: 'sourceCode',
        text: '来源单号',
    }, {
        field: 'quotationLabelName',
        text: '报价标识',
    }, {
        field: 'remark',
        text: '备注',
    }]
}