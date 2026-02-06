/*
 * @Author: sunsumin
 * @Date: 2024-07-30 12:53:13
 * @LastEditTime: 2024-08-01 17:36:53
 * @LastEditors: sunsumin
 * @Description:  系统标签 默认模板
 * @FilePath: template.js
 * Copyright (c) 2024 by Suzhou Tiantian, All Rights Reserved. 
 */

import _ from 'lodash'

const printTestData = {
    '0018': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //"产品标签"
    '0019': [{ field: 'warehouseLocationCode', title: '库位编码', fieldLabel: '库位编码', testData: 'WL00001' }, { field: 'warehouseLocationName', title: '库位名称', fieldLabel: '库位名称', testData: "@库位名称", }], //'库位标签'
    '0020': [{ field: 'carCode', title: '车辆标签', fieldLabel: '车辆标签', testData: 'VF0001' }, { field: 'carNumber', title: '车牌号', fieldLabel: '车牌号', testData: "@车牌号", }], // '车辆标签',
    '0021': [{ field: 'routeCode', title: '线路编码', fieldLabel: '线路编码', testData: 'LF0001' }, { field: 'routeName', title: '线路名称', fieldLabel: '线路名称', testData: "@线路名称", }], //'线路标签'
    '0022': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //'起初产品标签'

    '1001': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //'采购入库标签'
    '1002': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //'采购退货标签'
    '1003': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //'销售出库标签'
    '1004': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //'销售退货标签'
    '1005': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //'其他入库标签'
    '1006': [{ field: 'barCode', title: '条形码', fieldLabel: '条形码', testData: '6922468401176' }, { field: 'productName', title: '产品名称', fieldLabel: '产品名称', testData: "@产品名称", }], //'其他出库标签'
    '1007': [{ field: 'packageCode', title: '箱码', fieldLabel: '箱码', testData: 'DR2202020001-1', width: 209, height: 64 }, ], //'箱码标签'
};

export let template = {
    panels: [
    {
        index: 0, //面板下标
        height: 30, //纸张 高（mm）
        width: 40, //纸张 宽（mm）  
        // paperFooter: 85, //页脚（pt）
        paperHeader: 0, //页眉（pt）
        paperNumberContinue: true,
        paperNumberDisabled: true,
        paperNumberLeft: 83, //页码位置 left (pt)
        paperNumberTop: 63, //页码位置 top (pt)
        printElements: [{
            options: {
                field: "barCode",
                fontSize: 12,
                height: 32,
                left: 7,
                testData: "123456789",
                textAlign: "center",
                textType: "barcode",
                title: "条形码",
                fieldLabel: '条形码',
                top: 10,
                width: 100,
                hideTitle: true,
            },
            printElementType: {
                title: "条形码",
                type: "text"
            }
        }, {
            options: {
                field: "barCode",
                fieldLabel: "条形码",
                height: 10,
                hideTitle: true,
                fontSize: 9,
                left: 7,
                lineHeight: 7.5,
                letterSpacing: 0.75,
                textAlign: "center",
                testData: "@条形码",
                title: "",
                hideTitle: true,
                top: 43,
                width: 100,
            },
            printElementType: {
                title: "条形码",
                type: "text"
            }
        }, {
            options: {
                field: "productName",
                fieldLabel: "产品名称",
                height: 15,
                hideTitle: true,
                left: 7,
                lineHeight: 14,
                testData: "@产品名称",
                title: "",
                top: 58,
                width: 100,
            },
            printElementType: {
                title: "条形码",
                type: "text"
            }
        }]

    }]
}

export const getDefaultTemplate = (printType) => {
    let obj = _.cloneDeep(template),
        testData = printTestData[printType];
    obj.panels[0].printElements[0].options.field = testData[0].field;
    obj.panels[0].printElements[0].options.testData = testData[0].testData;
    obj.panels[0].printElements[0].options.title = testData[0].title;
    obj.panels[0].printElements[0].options.fieldLabel = testData[0].fieldLabel;
    obj.panels[0].printElements[1].options.field = testData[0].field;
    obj.panels[0].printElements[1].options.testData = testData[0].testData;
    obj.panels[0].printElements[1].options.title = testData[0].title;
    obj.panels[0].printElements[1].options.fieldLabel = testData[0].fieldLabel;



    if (printType == '1007') {
        obj.panels[0].width = 80;
        obj.panels[0].height = 50;
        obj.panels[0].printElements[0].options.width = testData[0].width;
        obj.panels[0].printElements[0].options.height = testData[0].height;
        obj.panels[0].printElements[0].options.top = 10;
        // obj.panels[0].printElements[0].options.contentPaddingBottom = 2.25;
        obj.panels[0].printElements[0].options.left = 9;
        obj.panels[0].printElements[1].options.width = testData[0].width;
        obj.panels[0].printElements[1].options.height = 12;
        obj.panels[0].printElements[1].options.textContentVerticalAlign = "middle";
        obj.panels[0].printElements[1].options.top = 74;
        obj.panels[0].printElements[1].options.left = 9;
        obj.panels[0].printElements[1].options.fontSize = 9.75;
        // obj.panels[0].printElements[1].options.top = 7;

        obj.panels[0].printElements[2] = {
            options: {
                field: "stockOutCode",
                fieldLabel: "单据编号",
                height: 15,
                hideTitle: true,
                left: 9,
                lineHeight: 14,
                testData: "@单据编号",
                title: "",
                top: 92,
                fontSize: 10.5,
                height: 16.5,
                width: testData[0].width,
                textContentVerticalAlign: "middle",
                textAlign: "center"

            },
            printElementType: {
                title: "单据编号",
                type: "text"
            }
        }
        obj.panels[0].printElements[3] = {
            options: {
                field: "customerName",
                fieldLabel: "客户名称",
                height: 15,
                hideTitle: true,
                left: 9,
                lineHeight: 14,
                testData: "@客户名称",
                title: "",
                top: 112,
                fontSize: 10.5,
                height: 16.5,
                width: testData[0].width,
                textContentVerticalAlign: "middle",
                textAlign: "center"

            },
            printElementType: {
                title: "客户名称",
                type: "text"
            }
        }


    } else {
        obj.panels[0].width = 40;
        obj.panels[0].height = 30;

        obj.panels[0].printElements[2].options.field = testData[1].field;
        obj.panels[0].printElements[2].options.title = testData[1].title;
        obj.panels[0].printElements[2].options.fieldLabel = testData[1].fieldLabel;
        obj.panels[0].printElements[2].options.testData = testData[1].testData;
        obj.panels[0].printElements[2].printElementType.title = testData[1].title;
    }

    return JSON.stringify(obj);

}