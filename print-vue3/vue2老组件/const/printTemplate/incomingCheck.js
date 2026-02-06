/*
 * @Author: sunsumin
 * @Date: 2024-07-23 14:52:22
 * @LastEditTime: 2024-11-29 10:49:34
 * @LastEditors: sunsumin
 * @Description: 
 * @FilePath: incomingCheck.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    // 顶部信息-版心
    mainTopList: [
        {
            name: '供应商名称',
            desc: '@供应商名称',
            width: 530,
            field: 'vendorName',
            default: 1,
        },
        {
            name: '单据编号',
            desc: '@单据编号',
            width: 220,
            field: 'noteCode',
            default: 1,
        },
        {
            name: '采购单号',
            desc: '@采购单号',
            width: 530,
            field: 'purchaseOrderCode',
            default: 1,
        },
        {
            name: '检验日期',
            desc: '@检验日期',
            width: 220,
            field: 'inspectDate',
            default: 1,
        },

        {
            name: '产品编码',
            desc: '@产品编码',
            width: 530,
            field: 'productCode',
            default: 1,
        },
        {
            name: '检验员',
            desc: '@检验员',
            width: 220,
            field: 'inspectUserName',
            default: 1,
        },

        {
            name: '产品名称',
            desc: '@产品名称',
            width: 530,
            field: 'productName',
            default: 1,
        }, {
            name: '检验结果',
            desc: '@检验结果',
            width: 220,
            field: 'inspectResultName',
            default: 1,
        }, {
            name: '规格型号',
            desc: '@规格型号',
            width: 530,
            field: 'specificationModel',
            default: 1,
        }, {
            name: '抽检数量',
            desc: '@抽检数量',
            width: 220,
            field: 'samplingQty',
            default: 1,
        }, {
            name: '主计量单位',
            desc: '@主计量单位',
            width: 530,
            field: 'unitMeasurementName',
            default: 1,
        }, {
            name: '抽样合格数量',
            desc: '@抽样合格数量',
            width: 220,
            field: 'samplingQualifiedQty',
            default: 1,
        }, {
            name: '报检数量',
            desc: '@报检数量',
            width: 530,
            field: 'inspectionQty',
            default: 1,
        }, {
            name: '抽样不良品数量',
            desc: '@抽样不良品数量',
            width: 220,
            field: 'samplingDefectiveProductQty',
            default: 1,
        },
    ],
    // 顶部信息-右侧
    rightTopList: [
        {
            name: '单据日期',
            desc: '@单据日期',
            default: 1,
            field: 'noteDate',
            show: false,
        },
        {
            name: '单据编号',
            desc: '@单据编号',
            default: 1,
            field: 'noteCode',
            show: true,
        },
        {
            name: '供应商名称',
            desc: '@供应商名称',
            default: 1,
            field: 'vendorName',
            show: true,
        },
        {
            name: '产品编码',
            desc: '@产品编码',
            default: 1,
            field: 'productCode',
            show: true,
        },
        {
            name: '产品名称',
            desc: '@产品名称',
            default: 1,
            field: 'productName',
            show: true,
        },
        {
            name: '规格型号',
            desc: '@规格型号',
            default: 1,
            show: true,
            field: 'specificationModel',
        },
        {
            name: '品牌',
            desc: '@品牌',
            default: 1,
            show: false,
            field: 'brandChName',
        }, {
            name: '主计量单位',
            desc: '@主计量单位',
            default: 1,
            show: true,
            field: 'unitMeasurementName',
        }, {
            name: '批次号',
            desc: '@批次号',
            default: 1,
            show: false,
            field: 'batchCode',
        }, {
            name: '供应商批次号',
            desc: '@供应商批次号',
            default: 1,
            show: false,
            field: 'vendorBatchCode',
        }, {
            name: '质检方案',
            desc: '@质检方案',
            default: 1,
            show: false,
            field: 'qualityInspectionPlanName',
        }, {
            name: '抽样方案',
            desc: '@抽样方案',
            default: 1,
            show: false,
            field: 'samplingPlanName',
        }, {
            name: '抽样类型',
            desc: '@抽样类型',
            default: 1,
            show: false,
            field: 'samplingTypeName',
        }, {
            name: '检验水平',
            desc: '@检验水平',
            default: 1,
            show: false,
            field: 'inspectionLevelName',
        }, {
            name: 'AQL',
            desc: '@AQL',
            default: 1,
            show: false,
            field: 'aqlName',
        }, {
            name: '允收数量(AC)',
            desc: '@允收数量(AC)',
            default: 1,
            show: false,
            field: 'acNum',
        }, {
            name: '拒收数量(RE)',
            desc: '@拒收数量(RE)',
            default: 1,
            show: false,
            field: 'reNum',
        }, {
            name: '检验依据',
            desc: '@检验依据',
            default: 1,
            show: false,
            field: 'inspectionBasis',
        }, {
            name: '报检数量',
            desc: '@报检数量',
            default: 1,
            show: true,
            field: 'inspectionQty',
        }, {
            name: '抽检数量',
            desc: '@抽检数量',
            default: 1,
            show: true,
            field: 'samplingQty',
        }, {
            name: '抽样合格数量',
            desc: '@抽样合格数量',
            default: 1,
            show: true,
            field: 'samplingQualifiedQty',
        }, {
            name: '抽样不良品数量',
            desc: '@抽样不良品数量',
            default: 1,
            show: true,
            field: 'samplingDefectiveProductQty',
        }, {
            name: '采购单号',
            desc: '@采购单号',
            default: 1,
            show: true,
            field: 'purchaseOrderCode',
        }, {
            name: '收货通知单号',
            desc: '@收货通知单号',
            default: 1,
            show: false,
            field: 'receiptGoodsNoticeCode',
        }, {
            name: '检验日期',
            desc: '@检验日期',
            default: 1,
            show: true,
            field: 'inspectDate',
        }, {
            name: '检验员',
            desc: '@检验员',
            default: 1,
            show: true,
            field: 'inspectUserName',
        }, {
            name: '检验结果',
            desc: '@检验结果',
            default: 1,
            show: true,
            field: 'inspectResultName',
        }

    ],
    // 表格配置-版心
    mainOptions: [
        {
            label: '序号',
            prop: 'index',
            align: 'center',
            width: 60,
            list: [
            {
                value: '@序号',
            }],
        },

        {
            label: '检验项目',
            prop: 'inspectionItem',
            align: 'left',
            width: 220,
            list: [
            {
                value: '@检验项目',
            }],
        },
        {
            label: '检验标准',
            prop: 'inspectionStandard',
            align: 'left',
            width: 150,
            list: [
            {
                value: '@检验标准',
            }, ],
        },
        {
            label: '检验方法',
            prop: 'inspectionMethod',
            align: 'left',
            width: 120,
            list: [
            {
                value: '@检验方法',
            }],
        },
        {
            label: '指标合格数量',
            prop: 'indicatorQualifiedQty',
            align: 'right',
            width: 120,
            list: [
            {
                value: '@指标合格数量',
            }, ],
        }, {
            label: '指标不合格数量',
            prop: 'indicatorUnqualifiedQty',
            align: 'right',
            width: 120,
            list: [
            {
                value: '@指标不合格数量',
            }, ],
        },
        {
            label: '判断结果',
            prop: 'judgeResultName',
            align: 'center',
            width: 120,
            list: [
            {
                value: '@判断结果',
            }, ],
        },
    ],
    // 表格配置-右侧
    rightOptions: [
        {
            label: '序号',
            prop: 'index',
            align: 'center',
            show: true,
            width: 60,
            list: [
            {
                value: '@序号',
            }],
        },
        {
            label: '检验项目',
            prop: 'inspectionItem',
            align: 'left',
            show: true,
            width: 120,
            list: [
            {
                value: '@检验项目',
            }, ],
        },
        {
            label: '分析方法',
            prop: 'analysisMethodName',
            align: 'left',
            width: 120,
            show: false,
            list: [
            {
                value: '@分析方法',
            }, ],
        },
        {
            label: '检验标准',
            prop: 'inspectionStandard',
            align: 'left',
            width: 150,
            show: true,
            list: [
            {
                value: '@检验标准',
            }, ],
        },
        {
            label: '上限值',
            prop: 'upperLimit',
            show: false,
            align: 'right',
            width: 80,
            list: [
            {
                value: '@上限值',
            }, ],
        },
        {
            label: '下限值',
            prop: 'lowerLimit',
            show: false,
            align: 'right',
            width: 110,
            list: [
            {
                value: '@lowerLimit',
            }, ],
        },
        {
            label: '检验方法',
            prop: 'inspectionMethod',
            show: true,
            align: 'left',
            width: 120,
            list: [
            {
                value: '@检验方法',
            }, ],
        },
        {
            label: '检验仪器',
            prop: 'inspectionInstrument',
            show: false,
            align: 'left',
            width: 120,
            list: [
            {
                value: '@检验仪器',
            }],
        },
        {
            label: '指标合格数量',
            prop: 'indicatorQualifiedQty',
            show: true,
            align: 'right',
            width: 120,
            list: [
            {
                value: '@指标合格数量',
            }],
        },
        {
            label: '指标不合格数量',
            prop: 'indicatorUnqualifiedQty',
            show: true,
            align: 'right',
            width: 120,
            list: [
            {
                value: '@指标不合格数量',
            }],
        },

        {
            label: '判断结果',
            prop: 'judgeResultName',
            align: 'center',
            show: true,
            width: 100,
            list: [
            {
                value: '@判断结果',
            }, ],
        },
        {
            label: '记录样本值',
            prop: 'isRecordSampleValueName',
            align: 'center',
            show: false,
            width: 120,
            list: [
            {
                value: '@记录样本值',
            }],
        },
        {
            label: '样本值数量',
            prop: 'sampleValueQty',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@样本值数量',
            }, ],
        },
        {
            label: '检测记录-1',
            prop: 'recordOne',
            align: 'left',
            show: false,
            width: 110,
            list: [
            {
                value: '@检测记录-1',
            }, ],
        },
        {
            label: '检测记录-2',
            prop: 'recordTwo',
            align: 'left',
            show: false,
            width: 110,
            list: [
            {
                value: '@检测记录-2',
            }, ],
        },
        {
            label: '检测记录-3',
            prop: 'recordThree',
            align: 'left',
            show: false,
            width: 110,
            list: [
            {
                value: '@检测记录-3',
            }, ],
        },
        {
            label: '检测记录-4',
            prop: 'recordFour',
            align: 'left',
            show: false,
            width: 110,
            list: [
            {
                value: '@检测记录-4',
            }, ],
        },
        {
            label: '检测记录-5',
            prop: 'recordFive',
            align: 'left',
            show: false,
            width: 110,
            list: [
            {
                value: '@检测记录-5',
            }, ],
        },
    ],
    // 底部信息-版心
    mainBottomList: [
    {
        name: '单据备注',
        desc: '@单据备注',
        field: 'remark',
        default: 1,
        width: 500,
    }, ],
    // 底部信息-右侧
    rightBottomList: [
    {
        name: '单据备注',
        desc: '@单据备注',
        field: 'remark',
        default: 1,
        show: true,
    }, {
        name: '制单人',
        desc: '@制单人',
        field: 'makeNoteUserName',
        default: 1,
        show: false,
    }, {
        name: '制单时间',
        desc: '@制单时间',
        field: 'makeNoteTime',
        default: 1,
        show: false,
    }, ]
}