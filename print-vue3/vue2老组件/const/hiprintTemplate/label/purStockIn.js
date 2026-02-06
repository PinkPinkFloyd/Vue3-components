/*
 * @Author: sunsumin
 * @Date: 2024-07-18 13:14:39
 * @LastEditTime: 2024-07-19 18:17:13
 * @LastEditors: sunsumin
 * @Description: 采购入库标签
 * @FilePath: purStockIn.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */
import purStockIn from '../warehouse/purStockIn';
export default {
    commonFields: [{
        field: 'tableHead',
        text: '表头信息字段',
        children: purStockIn.commonFields
    },{
        field: 'tableBody',
        text: '表体信息字段',
        children: purStockIn.tableFields.slice(1)
    }],
    tableFields: [],
}