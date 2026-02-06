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
            field: 'stockInCode',
            default: 1,
        },
        {
            name: '仓库',
            desc: '@仓库',
            width: 550,
            field: 'warehouseName',
            default: 1,
        },
        {
            name: '入库日期',
            desc: '@入库日期',
            width: 200,
            field: 'stockInDate',
            default: 1,
        },



    ],
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
            name: '入库日期',
            desc: '@入库日期',
            default: 1,
            field: 'stockInDate',
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
            name: '仓库',
            desc: '@仓库',
            default: 1,
            field: 'warehouseName',
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
            name: '二维码',
            desc: '@二维码',
            default: 1,
            field: 'code',
            show: true,
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
            width: 160,
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
            width: 120,
            list: [
            {
                value: '@规格型号',
            }, {
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
            }, {
                value: '',
            }, ],
        },
        {
            label: '数量',
            prop: 'currentStockInQty',
            align: 'right',
            width: 100,
            list: [
            {
                value: '@数量',
            }, {
                value: '',
            }, ],
        },
        {
            label: '未税单价',
            prop: 'untaxedUnitPrice',
            align: 'right',
            width: 100,
            list: [
            {
                value: '@未税单价',
            }, {
                value: '',
            }, ],
        },
        {
            label: '税率',
            prop: 'taxRate',
            align: 'center',
            width: 80,
            list: [
            {
                value: '@税率',
            }, {
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
            }, {
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
                value: '@含税金额',
            }, {
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
            width: 160,
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
            width: 120,
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
            },
            {
                value: '',
            }, ],
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
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
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
            }, {
                value: '',
            }, ],
        },
        {
            label: '主计量单位',
            prop: 'unitMeasurementName',
            align: 'center',
            show: false,
            width: 100,
            list: [
            {
                value: '@主计量单位',
            }, {
                value: '',
            }, ],
        },
        {
            label: '主单位数量',
            prop: 'mainUnitCurrentStockInQty',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@主单位数量',
            }, {
                value: '',
            }, ],
        },
        {
            label: '主单位未税单价',
            prop: 'mainUnitUntaxedUnitPrice',
            align: 'right',
            show: false,
            width: 120,
            list: [
            {
                value: '@主单位未税单价',
            }, {
                value: '',
            }, ],
        },
        {
            label: '主单位含税单价',
            prop: 'mainUnitTaxedUnitPrice',
            align: 'right',
            show: false,
            width: 120,
            list: [
            {
                value: '@主单位含税单价',
            }, {
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
            }, {
                value: '',
            }, ],
        },
        {
            label: '数量',
            prop: 'currentStockInQty',
            align: 'right',
            show: true,
            width: 100,
            list: [
            {
                value: '@数量',
            }, {
                value: '',
            }, ],
        },
        {
            label: '未税单价',
            prop: 'untaxedUnitPrice',
            align: 'right',
            show: true,
            width: 100,
            list: [
            {
                value: '@未税单价',
            }, {
                value: '',
            }, ],
        },
        {
            label: '税率',
            prop: 'taxRate',
            align: 'center',
            show: true,
            width: 60,
            list: [
            {
                value: '@税率',
            }, {
                value: '',
            }, ],
        },
        {
            label: '含税单价',
            prop: 'taxedUnitPrice',
            align: 'right',
            show: false,
            width: 100,
            list: [
            {
                value: '@含税单价',
            }, {
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
            }, {
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
            }, {
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
            }, {
                value: '@合计',
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
            }, {
                value: '',
            }, ],
        },
        {
            label: '订单编号',
            prop: 'orderCode',
            align: 'center',
            show: false,
            width: 120,
            list: [
            {
                value: '@订单编号',
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
    }, ]
}