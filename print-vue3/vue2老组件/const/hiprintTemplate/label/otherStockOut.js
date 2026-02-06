/*
 * @Author: sunsumin
 * @Date: 2024-07-18 13:19:32
 * @LastEditTime: 2024-07-22 13:35:52
 * @LastEditors: sunsumin
 * @Description: 其他出库标签
 * @FilePath: otherStockOut.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */


import otherStockOut from '../warehouse/otherStockOut';
export default {
    commonFields: [{
        field: 'tableHead',
        text: '表头信息字段',
        children: otherStockOut.commonFields
    },{
        field: 'tableBody',
        text: '表体信息字段',
        children: otherStockOut.tableFields.slice(1)
    }],
    tableFields: [],
}