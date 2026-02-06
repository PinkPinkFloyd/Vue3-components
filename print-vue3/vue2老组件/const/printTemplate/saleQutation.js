export default {
    // 顶部信息-版心
    mainTopList: [
    {
        name: '客户名称',
        desc: '@客户名称',
        width: 550,
        field: 'customerName',
        default: 1,
    },
    {
        name: '报价日期',
        desc: '@报价日期',
        width: 200,
        field: 'quotationDate',
        default: 1,
    },
    {
        name: '单据编号',
        desc: '@单据编号',
        width: 550,
        field: 'quotationCode',
        default: 1,
    },
    {
        name: '客户经理',
        desc: '@客户经理',
        width: 200,
        field: 'customerManagerName',
        default: 1,
    },
    {
        name: '客户经理电话',
        desc: '@客户经理电话',
        width: 550,
        field: 'customerManagerPhone',
        default: 1,
    },
    {
        name: '税率',
        desc: '@税率',
        width: 200,
        field: 'taxRate',
        default: 1,
    }, ],
    // 顶部信息-右侧
    rightTopList: [
    {
        name: '客户名称',
        desc: '@客户名称',
        default: 1,
        field: 'customerName',
        show: true,
    },
    {
        name: '报价日期',
        desc: '@报价日期',
        default: 1,
        field: 'quotationDate',
        show: true,
    },
    {
        name: '单据编号',
        desc: '@单据编号',
        default: 1,
        field: 'quotationCode',
        show: true,
    },
    {
        name: '询价单号',
        desc: '@询价单号',
        default: 1,
        field: 'inquiryCode',
        show: false,
    },
    {
        name: '客户经理',
        desc: '@客户经理',
        default: 1,
        field: 'customerManagerName',
        show: true,
    },
    {
        name: '客户经理电话',
        desc: '@客户经理电话',
        default: 1,
        field: 'customerManagerPhone',
        show: true,
    },
    {
        name: '询价人',
        desc: '@询价人',
        default: 1,
        field: 'inquiryUserName',
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
    {
        name: '税率',
        desc: '@税率',
        default: 1,
        show: true,
        field: 'taxRate',
    }, {
        name: '价格失效日期',
        desc: '@价格失效日期',
        default: 1,
        show: false,
        field: 'effectiveDateEnd',
    },  {
        name: '收款条件',
        desc: '@收款条件',
        default: 1,
        show: false,
        field: 'paymentTermName',
    },],
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
        label: '数量',
        prop: 'unitQty',
        align: 'right',
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
        label: '未税单价',
        prop: 'untaxedPrice',
        align: 'right',
        width: 100,
        list: [
        {
            value: '@未税售价',
        },
        {
            value: '',
        }, ],
    },
    {
        label: '税额',
        prop: 'taxAmount',
        align: 'right',
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
        width: 100,
        list: [
        {
            value: '@含税报价金额',
        },
        {
            value: '@合计',
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
            label: '数量',
            prop: 'unitQty',
            align: 'right',
            show: true,
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
            label: '未税单价',
            prop: 'untaxedPrice',
            align: 'right',
            show: true,
            width: 100,
            list: [
            {
                value: '@未税售价',
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
            prop: 'taxedPrice',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@含税售价',
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
                value: '@未税报价金额',
            },
            {
                value: '@合计',
            }, ],
        },
        {
            label: '税额',
            prop: 'taxAmount',
            align: 'right',
            show: true,
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
                value: '@含税报价金额',
            },
            {
                value: '@合计',
            }, ],
        },
        {
            label: '起订量',
            prop: 'minMiniQty',
            align: 'right',
            show: false,
            width: 80,
            list: [
            {
                value: '@起订量',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '供货周期',
            prop: 'supplyGoodsCycle',
            align: 'left',
            show: false,
            width: 100,
            list: [
            {
                value: '@供货周期',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '价格生效日期',
            prop: 'effectiveDateStart',
            align: 'center',
            show: false,
            width: 110,
            list: [
            {
                value: '@供价格生效日期',
            },
            {
                value: '',
            }, ],
        },
        {
            label: '价格失效日期',
            prop: 'effectiveDateEnd',
            align: 'center',
            show: false,
            width: 110,
            list: [
            {
                value: '@价格失效日期',
            },
            {
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
    }, ]
}