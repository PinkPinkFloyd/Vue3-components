/*
 * @Author: sunsumin
 * @Date: 2024-04-12 14:08:13
 * @LastEditTime: 2024-11-26 10:16:57
 * @LastEditors: sunsumin
 * @Description: 其他出库单
 * @FilePath: otherStockOut.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    // 顶部信息-版心
    mainTopList: [
    {
        name: '单据编号',
        desc: '@单据编号',
        width: 550,
        field: 'stockOutCode',
        default: 1,
    },
    {
        name: '出库日期',
        desc: '@出库日期',
        width: 200,
        field: 'stockOutDate',
        default: 1,
    }, ],
    // 顶部信息-右侧
    rightTopList: [
        {
            name: '出库日期',
            desc: '@出库日期',
            default: 1,
            field: 'stockOutDate',
            show: true,
        },
        {
            name: '单据编号',
            desc: '@单据编号',
            default: 1,
            field: 'stockInCode',
            show: true,
        },

        {
            name: '出库类型',
            desc: '@出库类型',
            default: 1,
            field: 'stockOutTypeName',
            show: false,
        },
        {
            name: '客户名称',
            desc: '@客户名称',
            default: 1,
            field: 'customerName',
            show: false,
        },
        {
            name: '仓库',
            desc: '@仓库',
            default: 1,
            field: 'warehouseName',
            show: false,
        },
        {
            name: '币种',
            desc: '@币种',
            default: 1,
            show: false,
            field: 'currencyName',
        },
        {
            name: '汇率',
            desc: '@汇率',
            default: 1,
            show: false,
            field: 'exchangeRate',
        },








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
            }, {
                value: '合计',
            }, ],
        },

        {
            label: '产品名称',
            prop: 'productName',
            align: 'left',
            width: 220,
            list: [
            {
                value: '@产品名称',
            }, {
                value: '',
            }, ],
        },
        {
            label: '规格型号',
            prop: 'specificationModel',
            align: 'left',
            width: 150,
            list: [
            {
                value: '@规格型号',
            }, {
                value: '',
            }, ],
        },
        {
            label: '主计量单位',
            prop: 'unitMeasurementName',
            align: 'center',
            width: 120,
            list: [
            {
                value: '@主计量单位',
            }, {
                value: '',
            }, ],
        },
        {
            label: '数量',
            prop: 'mainUnitCurrentStockOutQty',
            align: 'right',
            width: 120,
            list: [
            {
                value: '@数量',
            }, {
                value: '',
            }, ],
        },
        {
            label: '备注',
            prop: 'remark',
            align: 'left',
            width: 100,
            list: [
            {
                value: '@备注',
            }, {
                value: '',
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
            }, {
                value: '合计',
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
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
            }, ],
        },
        {
            label: '数量',
            prop: 'mainUnitCurrentStockOutQty',
            show: true,
            align: 'right',
            width: 120,
            list: [
            {
                value: '@数量',
            }, {
                value: '',
            }, ],
        },
        {
            label: '单位成本',
            prop: 'unitCost',
            show: false,
            align: 'right',
            width: 120,
            list: [
            {
                value: '@单位成本',
            }, {
                value: '',
            }, ],
        },
        {
            label: '出库成本',
            prop: 'stockOutCost',
            show: false,
            align: 'right',
            width: 100,
            list: [
            {
                value: '@出库成本',
            }, {
                value: '@合计',
            }, ],
        },

        {
            label: '库位',
            prop: 'warehouseLocationName',
            align: 'left',
            show: false,
            width: 120,
            list: [
            {
                value: '@库位',
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
            }, ],
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
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
            }, ],
        },
        {
            label: '备注',
            prop: 'remark',
            align: 'left',
            show: true,
            width: 100,
            list: [
            {
                value: '@备注',
            }, {
                value: '',
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