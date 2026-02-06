/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:44:54
 * @LastEditTime: 2024-07-25 15:13:27
 * @LastEditors: sunsumin
 * @Description: 采购询价单
 * @FilePath: purInquiry.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
export default {
    commonFields: [
    {
        field: 'inquiryDate',
        text: '询价日期'
    }, {
        field: 'inquiryCode',
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
        field: 'remark',
        text: '备注',
    }, {
        field: 'createUserName',
        text: '制单人',
    }, {
        field: 'createTime',
        text: '制单时间',
    }],
    tableFields: [
    {
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
            field: 'vendorSpecificationModel',
            text: '供应商规格型号',
        }, {
            field: 'vendorBrandChName',
            text: '供应商品牌',
        }, {
            field: 'unitMeasurementName',
            text: '主计量单位',
        }]
    }, {
        field: 'mainInquiryQty',
        text: '主单位询价数量',
    }, {
        field: 'conversionRatio',
        text: '转换率',
    }, {
        field: 'unitName',
        text: '单位',
    }, {
        field: 'inquiryQty',
        text: '询价数量',
    }, {
        field: 'deliveryDate',
        text: '交货日期',
    }, {
        field: 'remark',
        text: '备注',
    }]
}