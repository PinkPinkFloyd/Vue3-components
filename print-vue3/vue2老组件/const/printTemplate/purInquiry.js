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
        field: 'inquiryCode',
        default: 1,
    },
    {
        name: '采购员',
        desc: '@采购员',
        width: 550,
        field: 'buyerName',
        default: 1,
    },
    {
        name: '询价日期',
        desc: '@询价日期',
        width: 200,
        field: 'inquiryDate',
        default: 1,
    },
    {
        name: '采购员电话',
        desc: '@采购员电话',
        width: 550,
        field: 'buyerPhone',
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
            name: '询价日期',
            desc: '@询价日期',
            default: 1,
            field: 'inquiryDate',
            show: true,
        },
        {
            name: '单据编号',
            desc: '@单据编号',
            default: 1,
            field: 'inquiryCode',
            show: true,
        },
        {
            name: '采购员',
            desc: '@采购员',
            default: 1,
            field: 'buyerName',
            show: true,
        },
        {
            name: '采购员电话',
            desc: '@采购员电话',
            default: 1,
            field: 'buyerPhone',
            show: true,
        },


        {
            name: '币种',
            desc: '@币种',
            default: 1,
            show: false,
            field: 'currencyName',
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
            }, ],
        },
        {
            label: '产品名称',
            prop: 'productName',
            align: 'left',
            width: 200,
            list: [
            {
                value: '@产品名称',
            }, ],
        },
        {
            label: '规格型号',
            prop: 'specificationModel',
            align: 'left',
            width: 200,
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
            label: '询价数量',
            prop: 'inquiryQty',
            align: 'right',
            width: 120,
            list: [
            {
                value: '@询价数量',
            }, ],
        },


        {
            label: '交货日期',
            prop: 'deliveryDate',
            align: 'center',
            width: 120,
            list: [
            {
                value: '@交货日期',
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
            width: 180,
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
            width: 200,
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
            prop: 'vendorSpecificationModel',
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
            prop: 'vendorBrandChName',
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
            label: '询价数量',
            prop: 'inquiryQty',
            align: 'right',
            show: true,
            width: 120,
            list: [
            {
                value: '@询价数量',
            }, ],
        },
        {
            label: '交货日期',
            prop: 'deliveryDate',
            align: 'right',
            show: true,
            width: 120,
            list: [
            {
                value: '@交货日期',
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