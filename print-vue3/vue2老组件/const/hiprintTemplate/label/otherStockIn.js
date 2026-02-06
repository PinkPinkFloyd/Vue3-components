/*
 * @Author: sunsumin
 * @Date: 2024-07-18 13:18:36
 * @LastEditTime: 2024-07-22 13:26:05
 * @LastEditors: sunsumin
 * @Description: 其他入库标签
 * @FilePath: otherStockIn.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

import otherStockIn from '../warehouse/otherStockIn';
export default {
    commonFields: [{
        field: 'tableHead',
        text: '表头信息字段',
        children: otherStockIn.commonFields
    },{
        field: 'tableBody',
        text: '表体信息字段',
        children: otherStockIn.tableFields.slice(1)
    }],
    tableFields: [],
}