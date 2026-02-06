/*
 * @Author: sunsumin
 * @Date: 2024-04-12 14:06:17
 * @LastEditTime: 2024-11-29 10:44:32
 * @LastEditors: sunsumin
 * @Description: 调拨单
 * @FilePath: transfer.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    // 顶部信息-版心
    mainTopList: [
    {
        name: '单据编号',
        desc: '@单据编号',
        width: 550,
        field: 'transferCode',
        default: 1,
    },
    {
        name: '调拨日期',
        desc: '@调拨日期',
        width: 200,
        field: 'transferDate',
        default: 1,
    }, ],
    // 顶部信息-右侧
    rightTopList: [
    {
        name: '调拨日期',
        desc: '@调拨日期',
        default: 1,
        field: 'transferDate',
        show: true,
    },
    {
        name: '单据编号',
        desc: '@单据编号',
        default: 1,
        field: 'transferCode',
        show: true,
    },
    {
        name: '拨出仓库',
        desc: '@拨出仓库',
        default: 1,
        field: 'dialOutWarehouseName',
        show: false,
    },
    {
        name: '拨入仓库',
        desc: '@拨入仓库',
        default: 1,
        show: false,
        field: 'dialInWarehouseName',
    }, ],
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
            label: '产品名称',
            prop: 'productName',
            align: 'left',
            width: 260,
            list: [
            {
                value: '@产品名称',
            }],
        },
        {
            label: '规格型号',
            prop: 'specificationModel',
            align: 'left',
            width: 180,
            list: [
            {
                value: '@规格型号',
            }, ],
        },
        {
            label: '主计量单位',
            prop: 'unitMeasurementName',
            align: 'center',
            width: 130,
            list: [
            {
                value: '@主计量单位',
            }, ],
        },
        {
            label: '调拨数量',
            prop: 'transferQty',
            align: 'right',
            width: 130,
            list: [
            {
                value: '@调拨数量',
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
            }, ],
        },
        {
            label: '产品编码',
            prop: 'productCode',
            align: 'left',
            show: false,
            width: 120,
            list: [
            {
                value: '@产品编码',
            }, ],
        },
        {
            label: '产品名称',
            prop: 'productName',
            align: 'left',
            width: 220,
            show: true,
            list: [
            {
                value: '@产品名称',
            }, ],
        },
        {
            label: '规格型号',
            prop: 'specificationModel',
            align: 'left',
            width: 150,
            show: true,
            list: [
            {
                value: '@规格型号',
            }, ],
        },
        {
            label: '品牌',
            prop: 'brandChName',
            show: false,
            align: 'left',
            width: 100,
            list: [
            {
                value: '@品牌',
            }, ],
        },
        {
            label: '产品标签',
            prop: 'productLabelName',
            show: false,
            align: 'left',
            width: 110,
            list: [
            {
                value: '@产品标签',
            }, ],
        },
        {
            label: '主计量单位',
            prop: 'unitMeasurementName',
            show: true,
            align: 'center',
            width: 120,
            list: [
            {
                value: '@主计量单位',
            }, ],
        },
        {
            label: '调拨数量',
            prop: 'transferQty',
            show: true,
            align: 'right',
            width: 120,
            list: [
            {
                value: '@调拨数量',
            }, ],
        },
        {
            label: '拨出库位',
            prop: 'dialOutLocationName',
            show: false,
            align: 'left',
            width: 120,
            list: [
            {
                value: '@拨出库位',
            }, ],
        },


        {
            label: '批次号',
            prop: 'batchCode',
            align: 'left',
            show: false,
            width: 100,
            list: [
            {
                value: '@批次号',
            }, ],
        },
        {
            label: '供应商批次号',
            prop: 'vendorBatchCode',
            align: 'left',
            show: false,
            width: 110,
            list: [
            {
                value: '@供应商批次号',
            } ],
        },
        {
            label: '生产日期',
            prop: 'generationDate',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@生产日期',
            }, ],
        },
        {
            label: '保质期(天)',
            prop: 'qualityPeriod',
            align: 'right',
            show: false,
            width: 90,
            list: [
            {
                value: '@保质期(天)',
            }, ],
        },
        {
            label: '到期日期',
            prop: 'expirationDate',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@到期日期',
            }, ],
        },
        {
            label: '拨入库位',
            prop: 'dialInLocationName',
            show: false,
            align: 'left',
            width: 120,
            list: [
            {
                value: '@拨入库位',
            }, ],
        },
        {
            label: '源单日期',
            prop: 'sourceDate',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@源单日期',
            }, ],
        },
        {
            label: '源单单号',
            prop: 'sourceCode',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@源单单号',
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
        field: 'makeNoteDate',
        default: 1,
        show: false,
    }, {
        name: '审核人',
        desc: '@审核人',
        field: 'auditUserName',
        default: 1,
        show: false,
    }, {
        name: '审核时间',
        desc: '@审核时间',
        field: 'auditTime',
        default: 1,
        show: false,
    }, ]
}