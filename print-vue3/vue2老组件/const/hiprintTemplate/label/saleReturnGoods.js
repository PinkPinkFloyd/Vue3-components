/*
 * @Author: sunsumin
 * @Date: 2024-07-18 13:17:49
 * @LastEditTime: 2024-07-22 11:41:09
 * @LastEditors: sunsumin
 * @Description: 销售退货标签
 * @FilePath: saleReturnGoods.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

import saleReturnGoods from '../warehouse/saleReturnGoods';
export default {
    commonFields: [{
        field: 'tableHead',
        text: '表头信息字段',
        children: saleReturnGoods.commonFields
    },{
        field: 'tableBody',
        text: '表体信息字段',
        children: saleReturnGoods.tableFields.slice(1)
    }],
    tableFields: [],
}