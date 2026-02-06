export default {
    // 顶部信息-版心
    mainTopList: [
    {
        name: '供应商名称',
        desc: '@供应商名称',
        width: 550,
        field: 'vendorName',
        default: 1,
    },
    {
        name: '单据编号',
        desc: '@单据编号',
        width: 200,
        field: 'paymentCode',
        default: 1,
    },
    {
        name: '支付方式',
        desc: '@支付方式',
        width: 550,
        field: 'paymentStyleName',
        default: 1,
    },
    {
        name: '申请日期',
        desc: '@申请日期',
        width: 200,
        field: 'applyDate',
        default: 1,
    },
    {
        name: '收款银行',
        desc: '@收款银行',
        width: 550,
        field: 'accountBank',
        default: 1,
    },
    {
        name: '申请人',
        desc: '@申请人',
        width: 200,
        field: 'applicantName',
        default: 1,
    },
    {
        name: '收款账号',
        desc: '@收款账号',
        width: 550,
        field: 'accountBankNum',
        default: 1,
    },
    {
        name: '付款申请金额',
        desc: '@付款申请金额',
        width: 200,
        field: 'paymentAmount',
        default: 1,
    }, ],
    // 顶部信息-右侧
    rightTopList: [
        {
            name: '供应商名称',
            desc: '@供应商名称',
            default: 1,
            field: 'vendorName',
            show: true,
        },
        {
            name: '申请日期',
            desc: '@申请日期',
            default: 1,
            field: 'applyDate',
            show: true,
        },
        {
            name: '单据编号',
            desc: '@单据编号',
            default: 1,
            field: 'paymentCode',
            show: true,
        },
        {
            name: '申请人',
            desc: '@申请人',
            default: 1,
            field: 'applicantName',
            show: true,
        },
        {
            name: '币种',
            desc: '@币种',
            default: 1,
            show: false,
            field: 'currencyName',
        },
        {
            name: '支付方式',
            desc: '@支付方式',
            default: 1,
            show: true,
            field: 'paymentStyleName',
        },
        {
            name: '收款银行',
            desc: '@收款银行',
            default: 1,
            show: true,
            field: 'accountBank',
        },
        {
            name: '收款账号',
            desc: '@收款账号',
            default: 1,
            show: true,
            field: 'accountBankNum',
        },
        {
            name: '付款申请金额',
            desc: '@付款申请金额',
            default: 1,
            show: true,
            field: 'paymentAmount',
        },












    ],
    // 审批信息-版心
    mainApprovalList: [
    {
        name: '审批流程',
        desc: '@审批流程',
        width: 550,
        field: 'approvalUserVOList',
        default: 1,
    }, ],
    // 审批信息-右侧
    rightApprovalList: [
    {
        name: '审批流程',
        desc: '@审批流程',
        default: 1,
        show: true,
        field: 'approvalUserVOList',
    }, ],
    // 单据表格信息-版心
    mainNoteOptions: [
        {
            label: '序号',
            prop: 'index',
            align: 'center',
            width: 60,
            list: [
            {
                value: '@序号',
            }, ],
        },
        {
            label: '订单日期',
            prop: 'orderDate',
            align: 'center',
            width: 120,
            list: [
            {
                value: '@订单日期',
            }, ],
        },
        {
            label: '订单编号',
            prop: 'orderCode',
            align: 'center',
            width: 150,
            list: [
            {
                value: '@订单编号',
            }, ],
        },
        {
            label: '含税金额',
            prop: 'taxedTotalAmount',
            align: 'right',
            width: 120,
            list: [
            {
                value: '@含税金额',
            }, ],
        },
        {
            label: '订单预付金额',
            prop: 'advancedAmount',
            align: 'right',
            width: 160,
            list: [
            {
                value: '@订单预付金额',
            }, ],
        },
        {
            label: '订单已付款金额',
            prop: 'paymentAmount',
            align: 'right',
            width: 160,
            list: [
            {
                value: '@订单已付款金额',
            }, ],
        },
        {
            label: '订单未付款金额',
            prop: 'canPaymentAmount',
            align: 'right',
            width: 160,
            list: [
            {
                value: '@订单未付款金额',
            }, ],
        },
        {
            label: '付款申请金额',
            prop: 'currentAddPrepayAmount',
            align: 'right',
            width: 150,
            list: [
            {
                value: '@付款申请金额',
            }, ],
        },
        {
            label: '采购员',
            prop: 'buyerName',
            align: 'center',
            width: 120,
            list: [
            {
                value: '@采购员',
            }, ],
        },

    ],
    // 单据表格信息-右侧
    rightNoteOptions: [
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
    }, {
        label: '订单日期',
        prop: 'orderDate',
        align: 'center',
        show: true,
        width: 120,
        list: [
        {
            value: '@订单日期',
        }],
    }, {
        label: '订单编号',
        prop: 'orderCode',
        align: 'center',
        show: true,
        width: 150,
        list: [
        {
            value: '@订单编号',
        }],
    }, {
        label: '发票类型',
        prop: 'invoiceTypeName',
        align: 'center',
        show: false,
        width: 90,
        list: [
        {
            value: '@发票类型',
        }],
    }, {
        label: '采购员',
        prop: 'buyerName',
        align: 'center',
        show: true,
        width: 100,
        list: [
        {
            value: '@采购员',
        }],
    }, {
        label: '未税金额',
        prop: 'untaxedTotalAmount',
        align: 'right',
        show: false,
        width: 120,
        list: [
        {
            value: '@未税金额',
        }],
    }, {
        label: '税额',
        prop: 'taxedTotal',
        align: 'right',
        show: false,
        width: 120,
        list: [
        {
            value: '@税额',
        }],
    },
    {
        label: '含税金额',
        prop: 'taxedTotalAmount',
        align: 'right',
        show: true,
        width: 120,
        list: [
        {
            value: '@含税金额',
        }],
    }, {
        label: '订单预付金额',
        prop: 'advancedAmount',
        align: 'right',
        show: true,
        width: 160,
        list: [
        {
            value: '@订单预付金额',
        }],
    }, {
        label: '订单已付款金额',
        prop: 'paymentAmount',
        align: 'right',
        show: true,
        width: 160,
        list: [
        {
            value: '@订单已付款金额',
        }, ],
    },
    {
        label: '订单未付款金额',
        prop: 'canPaymentAmount',
        align: 'right',
        show: true,
        width: 160,
        list: [
        {
            value: '@订单未付款金额',
        }, ],
    }, {
        label: '付款申请金额',
        prop: 'currentAddPrepayAmount',
        align: 'right',
        show: true,
        width: 150,
        list: [
        {
            value: '@付款申请金额',
        }],
    }, ],
    // 明细表格信息-版心
    mainDetailOptions: [
        {
            label: '序号',
            prop: 'index',
            align: 'center',
            width: 60,
            list: [
            {
                value: '@序号',
            }, ],
        },
        {
            label: '产品名称',
            prop: 'productName',
            align: 'left',
            width: 150,
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
            list: [
            {
                value: '@规格型号',
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
            }, ],
        },
        {
            label: '订单数量',
            prop: 'orderQty',
            align: 'right',
            width: 100,
            list: [
            {
                value: '@订单数量',
            }, ],
        },
        {
            label: '含税单价',
            prop: 'taxedUnitPrice',
            align: 'right',
            width: 120,
            list: [
            {
                value: '@含税单价',
            }, ],
        },

        {
            label: '含税金额',
            prop: 'taxedAmount',
            align: 'right',
            width: 120,
            list: [
            {
                value: '@含税金额',
            }, ],
        },

        {
            label: '到货日期',
            prop: 'deliveryDate',
            align: 'center',
            width: 100,
            list: [
            {
                value: '@到货日期',
            }, ],
        },

    ],
    // 明细表格信息-右侧
    rightDetailOptions: [
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
            width: 150,
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
            } ],
        },
        {
            label: '供应商料号',
            prop: 'vendorProductCode',
            show: false,
            align: 'left',
            width: 100,
            list: [
            {
                value: '@供应商料号',
            }, ],
        },
        {
            label: '供应商品名',
            prop: 'vendorProductName',
            show: false,
            align: 'left',
            width: 160,
            list: [
            {
                value: '@供应商品名',
            }, ],
        },
        {
            label: '供应商规格型号',
            prop: 'vendorProductSpec',
            show: false,
            align: 'left',
            width: 120,
            list: [
            {
                value: '@供应商规格型号',
            }, ],
        },
        {
            label: '供应商品牌',
            prop: 'vendorProductBrand',
            show: false,
            align: 'left',
            width: 100,
            list: [
            {
                value: '@供应商品牌',
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
            }, ],
        },
        {
            label: '订单数量',
            prop: 'orderQty',
            align: 'right',
            show: true,
            width: 100,
            list: [
            {
                value: '@订单数量',
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
            }, ],
        },
        {
            label: '含税单价',
            prop: 'taxedUnitPrice',
            align: 'right',
            show: true,
            width: 120,
            list: [
            {
                value: '@含税单价',
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
            }, ],
        },
        {
            label: '含税金额',
            prop: 'taxedAmount',
            align: 'right',
            show: true,
            width: 120,
            list: [
            {
                value: '@含税金额',
            }, ],
        },

        {
            label: '到货日期',
            prop: 'deliveryDate',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@到货日期',
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
    }, {
        name: '制单人',
        desc: '@制单人',
        field: 'makeNoteUserName',
        default: 1,
        width: 200,
    }, {
        name: '制单时间',
        desc: '@制单时间',
        field: 'makeNoteTime',
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
        show: true,
    },
    {
        name: '制单时间',
        desc: '@制单时间',
        field: 'makeNoteTime',
        default: 1,
        show: true,
    }, ]
}