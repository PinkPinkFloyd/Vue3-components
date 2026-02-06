/*
 * @Author: sunsumin
 * @Date: 2024-07-13 17:52:23
 * @LastEditTime: 2024-11-29 11:02:08
 * @LastEditors: sunsumin
 * @Description: 来料质检单
 * @FilePath: incomingCheck.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
export default {
    commonFields: [
    {
        field: 'noteDate',
        text: '单据日期'
    }, {
        field: 'noteCode',
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
        }, {
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
        }, {
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
        field: 'inspectionQty',
        text: '报检数量',
    }, {
        field: 'samplingQty',
        text: '抽检数量',
    }, {
        field: 'samplingQualifiedQty',
        text: '抽样合格数量',
    }, {
        field: 'samplingDefectiveProductQty',
        text: '抽样不良品数量',
    }, {
        field: 'purchaseOrderCode',
        text: '采购单号',
    }, {
        field: 'receiptGoodsNoticeCode',
        text: '收货通知单号',
    }, {
        field: 'inspectUserName',
        text: '检验员',
    }, {
        field: 'inspectDate',
        text: '检验日期',
    }, {
        field: 'inspectResultName',
        text: '检验结果',
    }, {
        field: 'remark',
        text: '备注',
    }, {
        field: 'makeNoteUserName',
        text: '制单人',
    }, {
        field: 'makeNoteTime',
        text: '制单时间',
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
        field: 'upperLimit',
        text: '上限值',
    }, {
        field: 'lowerLimit',
        text: '下限值',
    }, {
        field: 'inspectionMethod',
        text: '检验方法',
    }, {
        field: 'inspectionInstrument',
        text: '检验仪器',
    }, {
        field: 'indicatorQualifiedQty',
        text: '指标合格数量',
    }, {
        field: 'indicatorUnqualifiedQty',
        text: '指标不合格数量',
    },
    {
        field: 'judgeResultName',
        text: '判断结果',
    },
    {
        field: 'isRecordSampleValueName',
        text: '记录样本值',
    }, {
        field: 'sampleValueQty',
        text: '样本值数量',
    }, {
        field: 'recordOne',
        text: '检测记录-1',
    }, {
        field: 'recordTwo',
        text: '检测记录-2',
    }, {
        field: 'recordThree',
        text: '检测记录-3',
    }, {
        field: 'recordFour',
        text: '检测记录-4',
    }, {
        field: 'recordFive',
        text: '检测记录-5',
    }]
}