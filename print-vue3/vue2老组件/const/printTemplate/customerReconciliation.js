/*
 * @Author: sunsumin
 * @Date: 2024-05-20 18:29:23
 * @LastEditTime: 2024-07-25 15:11:05
 * @LastEditors: sunsumin
 * @Description: 客户对账单
 * @FilePath: customerReconciliation.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    // 顶部信息-版心
    mainTopList: [
    {
        name: '单据编号',
        desc: '@单据编号',
        width: 550,
        field: 'accountStatementCode',
        default: 1,
    },
    {
        name: '客户名称',
        desc: '@客户名称',
        width: 200,
        field: 'customerName',
        default: 1,
    }, ],
    // 顶部信息-右侧
    rightTopList: [
        {
            name: '对账日期',
            desc: '@对账日期',
            default: 1,
            field: 'accountStatementDate',
            show: false,
        },
        {
            name: '单据编号',
            desc: '@单据编号',
            default: 1,
            field: 'accountStatementCode',
            show: true,
        },
        {
            name: '客户名称',
            desc: '@客户名称',
            default: 1,
            field: 'customerName',
            show: true,
        },
        {
            name: '收款条件',
            desc: '@收款条件',
            default: 1,
            field: 'paymentTermName',
            show: false,
        },
        {
            name: '币种',
            desc: '@币种',
            default: 1,
            field: 'currencyName',
            show: false,
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
        },
        {
            value: '合计',
        }, ],
    },
    {
        label: '产品名称',
        prop: 'productName',
        align: 'left',
        width: 120,
        list: [
        {
            value: '@产品名称',
        },
        {
            value: '',
        }, ],
    },
    {
        label: '规格型号',
        prop: 'specificationModel',
        align: 'left',
        width: 120,
        list: [
        {
            value: '@规格型号',
        },
        {
            value: '',
        }, ],
    },
    {
        label: '单位',
        prop: 'unitName',
        align: 'center',
        width: 80,
        list: [
        {
            value: '@单位',
        },
        {
            value: '',
        }, ],
    },
    {
        label: '本次对账数量',
        prop: 'accountStatementQty',
        align: 'right',
        width: 110,
        list: [
        {
            value: '@本次对账数量',
        },
        {
            value: '',
        }, ],
    },
    {
        label: '含税单价',
        prop: 'taxedUnitPrice',
        align: 'right',
        width: 100,
        list: [
        {
            value: '@含税单价',
        },
        {
            value: '',
        }, ],
    },
    {
        label: '含税金额',
        prop: 'taxedAmount',
        align: 'right',
        width: 100,
        list: [
        {
            value: '@含税金额',
        },
        {
            value: '@合计',
        }, ],
    },
    {
        label: '出库日期',
        prop: 'stockOutDate',
        align: 'center',
        width: 100,
        list: [
        {
            value: '@出库日期',
        },
        {
            value: '',
        }, ],
    },
    {
        label: '出库单号',
        prop: 'stockOutCode',
        align: 'center',
        width: 100,
        list: [
        {
            value: '@出库单号',
        },
        {
            value: '',
        }, ],
    }, ],
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
            },
            {
                value: '合计',
            }, ],
        },
        {
            label: '产品编码',
            prop: 'productCode',
            align: 'left',
            show: false,
            width: 100,
            list: [
            {
                value: '@产品编码',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '产品名称',
            prop: 'productName',
            align: 'left',
            width: 120,
            show: true,
            list: [
            {
                value: '@产品名称',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '规格型号',
            prop: 'specificationModel',
            align: 'left',
            width: 120,
            show: true,
            list: [
            {
                value: '@规格型号',
            },
            {
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
            },
            {
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
            },
            {
                value: '',
            }, ],
        },
        {
            label: '客户料号',
            prop: 'customerProductCode',
            show: false,
            align: 'left',
            width: 100,
            list: [
            {
                value: '@客户料号',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '客户品名',
            prop: 'customerProductName',
            show: false,
            align: 'left',
            width: 120,
            list: [
            {
                value: '@客户品名',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '客户规格型号',
            prop: 'customerProductSpec',
            show: false,
            align: 'left',
            width: 100,
            list: [
            {
                value: '@客户规格型号',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '客户品牌',
            prop: 'customerProductBrand',
            show: false,
            align: 'left',
            width: 100,
            list: [
            {
                value: '@客户品牌',
            },
            {
                value: '',
            }, ],
        },

        {
            label: '单位',
            prop: 'unitName',
            align: 'center',
            show: true,
            width: 80,
            list: [
            {
                value: '@单位',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '订单数量',
            prop: 'orderQty',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@数量',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '出库数量',
            prop: 'currentStockOutQty',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@出库数量',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '本次对账数量',
            prop: 'accountStatementQty',
            align: 'right',
            show: true,
            width: 110,
            list: [
            {
                value: '@本次对账数量',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '未税单价',
            prop: 'untaxedUnitPrice',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@未税单价',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '税率',
            prop: 'taxRate',
            align: 'center',
            show: false,
            width: 60,
            list: [
            {
                value: '@税率',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '含税单价',
            prop: 'taxedUnitPrice',
            align: 'right',
            show: true,
            width: 100,
            list: [
            {
                value: '@含税单价',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '未税金额',
            prop: 'untaxedAmount',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@未税金额',
            },
            {
                value: '@合计',
            }, ],
        },
        {
            label: '税额',
            prop: 'taxAmount',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@税额',
            },
            {
                value: '@合计',
            }, ],
        },
        {
            label: '含税金额',
            prop: 'taxedAmount',
            align: 'right',
            show: true,
            width: 100,
            list: [
            {
                value: '@含税金额',
            },
            {
                value: '@合计',
            }, ],
        },
        {
            label: '出库日期',
            prop: 'stockOutDate',
            align: 'center',
            show: true,
            width: 100,
            list: [
            {
                value: '@出库日期',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '出库单号',
            prop: 'stockOutCode',
            align: 'center',
            show: true,
            width: 100,
            list: [
            {
                value: '@出库单号',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '出库类型',
            prop: 'stockOutTypeName',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@出库类型',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '发票类型',
            prop: 'invoiceTypeName',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@发票类型',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '订单日期',
            prop: 'orderDate',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@订单日期',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '订单编号',
            prop: 'orderCode',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@订单编号',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '客户订单号',
            prop: 'customerOrderCode',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@客户订单号',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '签收状态',
            prop: 'signStatusName',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@签收状态',
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
                value: '',
            }, ],
        },
        {
            label: '保质期(天)',
            prop: 'qualityPeriod',
            align: 'left',
            show: false,
            width: 100,
            list: [
            {
                value: '@保质期(天)',
            },
            {
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
            },
            {
                value: '',
            }, ],
        },
        {
            label: '客户经理',
            prop: 'customerManagerName',
            align: 'center',
            show: false,
            width: 900,
            list: [
            {
                value: '@客户经理',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '联系人',
            prop: 'linkerName',
            align: 'center',
            show: false,
            width: 90,
            list: [
            {
                value: '@联系人',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '收款条件',
            prop: 'paymentTermName',
            align: 'left',
            show: false,
            width: 100,
            list: [
            {
                value: '@收款条件',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '结款日期',
            prop: 'paymentDate',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@结款日期',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '备注',
            prop: 'remark',
            align: 'left',
            show: false,
            width: 100,
            list: [
            {
                value: '@备注',
            },
            {
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
    },
    {
        name: '制单人',
        desc: '@制单人',
        field: 'createUserName',
        default: 1,
        show: false,
    }, {
        name: '制单时间',
        desc: '@制单时间',
        field: 'createTime',
        default: 1,
        show: false,
    }]
}