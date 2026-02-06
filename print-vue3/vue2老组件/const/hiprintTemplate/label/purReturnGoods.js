/*
 * @Author: sunsumin
 * @Date: 2024-07-18 13:15:40
 * @LastEditTime: 2024-07-22 10:09:06
 * @LastEditors: sunsumin
 * @Description: 采购退货标签
 * @FilePath: purReturnGoods.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

import purReturnGoods from '../warehouse/purReturnGoods';
export default {
    commonFields: [{
        field: 'tableHead',
        text: '表头信息字段',
        children: purReturnGoods.commonFields
    },{
        field: 'tableBody',
        text: '表体信息字段',
        children: purReturnGoods.tableFields.slice(1)
    }],
    tableFields: [],
}