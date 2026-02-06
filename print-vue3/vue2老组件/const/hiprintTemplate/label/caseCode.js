/*
 * @Author: sunsumin
 * @Date: 2024-07-18 13:23:17
 * @LastEditTime: 2024-07-25 14:36:34
 * @LastEditors: sunsumin
 * @Description: 箱码标签
 * @FilePath: caseCode.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

export default {
    commonFields: [{
        field: 'stockOutDate',
        text: '出库日期'
    }, {
        field: 'stockOutCode',
        text: '单据编号'
    }, {
         field: 'stockOutTypeName',
        text: '出库类型'
    },{
        field: 'customer',
        text: '客户',
        children: [
        {
            field: 'customerCode',
            text: '客户编码',
        },
        {
            field: 'customerName',
            text: '客户名称',
        }, 
        {
            field: 'customerManager',
            text: '客户经理',
            children: [{
                field: 'cmEmployeeName',
                text: '员工姓名',
            }, {
                field: 'cmPhone',
                text: '联系方式',
            }, {
                field: 'cmEmail',
                text: '电子邮箱',
            }, {
                field: 'cmDeptName',
                text: '所属部门',
            }]
        },
        {
            field: 'customerAssistant',
            text: '客户助理',
            children: [{
                field: 'employeeName',
                text: '员工姓名',
            },
            {
                field: 'phone',
                text: '联系方式',
            }, {
                field: 'email',
                text: '电子邮箱',
            }, {
                field: 'deptName',
                text: '所属部门',
            }]
        },
       ]
    }, {
        field: 'warehouse',
        text: '仓库',
        children: [{
            field: 'warehouseCode',
            text: '仓库编码',
        }, {
            field: 'warehouseName',
            text: '仓库名称',
        }, {
            field: 'warehouseAddress',
            text: '仓库地址',
        }, ]
    }, {
        field: 'contactName',
        text: '客户联系人'
    }, {
        field: 'contactNumber',
        text: '客户联系人电话'
    },{
        field: 'deliveryAddress',
        text: '送货地址'
    }, {
        field: 'remark',
        text: '备注'
    }, {
        field: 'packageCode',
        text: '箱码'
    }],
    tableFields: [],
}