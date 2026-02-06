/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:52:59
 * @LastEditTime: 2024-11-29 11:03:37
 * @LastEditors: sunsumin
 * @Description: 出库检验报告
 * @FilePath: stockOutCheck.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
export default {
    commonFields: [
    {
        field: 'reportCode',
        text: '编号'
    }, {
        field: 'inspectDate',
        text: '检验日期'
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
        field: 'batchCode',
        text: '批次号',
    }, {
        field: 'vendorBatchCode',
        text: '供应商批次号',
    }, {
        field: 'qualityInspectionPlanName',
        text: '质检方案',
    }, {
        field: 'samplingPlanName',
        text: '抽样方案',
    }, {
        field: 'samplingTypeName',
        text: '抽样类型',
    }, {
        field: 'inspectionLevelName',
        text: '检验水平',
    }, {
        field: 'strictTypeName',
        text: '严格度',
    }, {
        field: 'aqlName',
        text: 'AQL',
    }, {
        field: 'acNum',
        text: '允收数量(AC)',
    }, {
        field: 'reNum',
        text: '拒收数量(RE)',
    }, {
        field: 'inspectionBasis',
        text: '检验依据',
    }, {
        field: 'mainUnitCurrentStockOutQty',
        text: '出库数量',
    }, {
        field: 'inspectionQty',
        text: '报检数量',
    }, {
        field: 'samplingQty',
        text: '抽检数量',
    }, {
        field: 'inspectUserName',
        text: '检验员',
    }, {
        field: 'inspectResultName',
        text: '检验结果',
    }, {
        field: 'qaNoteCode',
        text: '来料质检单号',
    }],
    tableFields: [
    {
        field: 'index',
        text: '序号',
    }, {
        field: 'inspectionItem',
        text: '检验项目',
    }, {
        field: 'analysisMethodName',
        text: '分析方法',
    }, {
        field: 'inspectionStandard',
        text: '检验标准',
    }, {
        field: 'inspectionMethod',
        text: '检验方法',
    }, {
        field: 'inspectionInstrument',
        text: '检验仪器',
    }, {
        field: 'judgeResultName',
        text: '判断结果',
    }, {
        field: 'inspectionRecord1',
        text: '检测记录-1',
    }, {
        field: 'inspectionRecord2',
        text: '检测记录-2',
    }, {
        field: 'inspectionRecord3',
        text: '检测记录-3',
    }, {
        field: 'inspectionRecord4',
        text: '检测记录-4',
    }, {
        field: 'inspectionRecord5',
        text: '检测记录-5',
    }]
}