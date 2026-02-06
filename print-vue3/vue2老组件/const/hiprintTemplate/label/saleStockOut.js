/*
 * @Author: sunsumin
 * @Date: 2024-07-18 13:16:36
 * @LastEditTime: 2024-07-18 13:16:39
 * @LastEditors: sunsumin
 * @Description: 销售出库标签
 * @FilePath: saleStockOut.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

import saleStockOut from '../warehouse/saleStockOut';
export default {
    commonFields: [{
        field: 'tableHead',
        text: '表头信息字段',
        children: saleStockOut.commonFields
    },{
        field: 'tableBody',
        text: '表体信息字段',
        children: saleStockOut.tableFields.slice(1)
    }],
    tableFields: [],
}