import * as puclicApi from "@/api/public";
import { getColumn } from "@/api/public.js";
import { listLabelByType } from '@/api/baseDocument/labelDocument'
const settTreeData=(data)=>{
  for (var i = 0; i < data.length; i++) {
    if (data[i].children.length < 1) {
      // children若为空数组，则将children设为undefined
      data[i].children = undefined;
    } else {
      // children若不为空数组，则继续 递归调用 本方法
      settTreeData(data[i].children);
    }
  }
  return data;
}
export const publicMixins = {
  data() {
    return {
      customerOpts: [], //客户
      customerCRM: [], //客户-已开通crm
      vendorOpts: [], // 供应商
      vendorAttributeOpts: [], // 供应商属性
      clientProperty: [], // 客户属性
      paymentTermOpts: [], //信用账期  -- 供应商
      customerPaymentTerm: [], // 信用账期 - 客户
      transportConditionOpts: [], // 发运条件
      industryOpts: [], // 所属行业
      vendorCategoryOpts: [], // 供应商分类
      taxRateOpts: [], // 税率
      currencyOpts: [], // 币种
      addressTypeOpts: [], //地址类型
      userOpts: [], // 采购员
      bankOpts: [],
      categoryOpts: [], // 产品分类
      categoryMatchOpts:[],//三级产品分类
      warehouse: [], //仓库(已启用)
      warehouseDetail: {},
      // warehouseAreap: [], //根据仓库id查询库区
      warehouseLocation: [], //根据库区id查询--库位
      enterVendorInfo: [], //获取建档已确认供应商
      unitMeasurement: [], //j计量单位
      vendorList: [],
      productinfoList: [], //// 建档产品分页查询--产品列表 -已确认
      exchangeRate: [], // 汇率
      publicDictList: {}, // 字典
      productMeasurementConvList: [], // 查询产品的转换单位和转换率
      approvalStatusOpts: [], //审核状态
      exchangeRateOpts: [], // 获取币种汇率
      invoiceTypeOpts: [], // 发票类型
      projectOpts: [], //项目号
      deptOpts: [], // 部门
      applyOption: [],
      categoryOptsAll: [], // 产品分类 --所有
      brandOpts: [], // 品牌
      unitOpts: [],
      morBrandOpts: [],
      userNameData: [], // 账号列表-用户名
      beginningDate: "",
      stationWarehouse: [], //岗位权限内的仓库
      laberListOpts: [],
      spuCategorylistAll: [], // 所有的商品分类，下拉- 平铺数据
      spuCategoryTree:[],//商品分类
    };
  },
  methods: {
    // 所有的商品分类，下拉- 平铺数据
    getSpuCategorylistAll() {
      puclicApi.getSpuCategorylistAll({isShow: '1'}).then(({ data }) => {
        if (data.code === 200) {
          this.spuCategorylistAll = data.data;
        }
      });
    },
     // 所有的商品分类
     geSpuCategoryTree() {
      puclicApi.geSpuCategory().then(({ data }) => {
        if (data.code === 200) {
          this.spuCategoryTree = settTreeData(data.data);
        }
      });
    },
    // 贸易商和供应商品牌
    getProductMroBrand() {
      puclicApi.getProductMroBrand().then(({ data }) => {
        if (data.code === 200) {
          this.morBrandOpts = data.data;
        }
      });
    },

    // 递归判断列表，把最后的children设为undefined
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },
    // 递归判断列表，把最后的children设为undefined 并且禁选无三级的二级-产品分类用
    getTreeDatCategory(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
          if (data[i].hide == "1") {
            data[i].disabled = true;
          } else {
            data[i].disabled = false;
          }
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeDatCategory(data[i].children);
        }
      }
      return data;
    },
    // 供应商属性
    getVendorAttribute() {
      puclicApi.getVendorAttribute().then(({ data }) => {
        if (data.code === 200) {
          this.vendorAttributeOpts = data.data;
        }
      });
    },
    // 客户属性
    getClientProperty() {
      puclicApi.getClientProperty().then(({ data }) => {
        if (data.code == 200) {
          this.clientProperty = data.data;
        }
      });
    },
    //信用账期--供应商
    async getPaymentTerm() {
      await puclicApi.getPaymentTerm().then(({ data }) => {
        if (data.code === 200) {
          this.paymentTermOpts = data.data;
        }
      });
    },
    //信用账期--客户
   async getCustomerPaymentTerm() {
     await puclicApi.getCustomerPaymentTerm().then(({ data }) => {
        if (data.code === 200) {
          this.customerPaymentTerm = data.data;
        }
      });
    },
    // 项目号
    getProject() {
      puclicApi.getProject().then(({ data }) => {
        if (data.code === 200) {
          this.projectOpts = data.data;
        } else {
          console.log("获取项目号数据失败");
        }
      });
    },
    // 发运条件
    getTransportCondition() {
      puclicApi.getTransportCondition().then(({ data }) => {
        if (data.code === 200) {
          this.transportConditionOpts = data.data;
        }
      });
    },
    // 所属行业
    getIndustry() {
      puclicApi.getIndustry().then(({ data }) => {
        if (data.code === 200) {
          this.industryOpts = this.getTreeData(data.data);
        }
      });
    },
    // 供应商分类
    getVendorCategory() {
      puclicApi.getVendorCategory().then(({ data }) => {
        if (data.code === 200) {
          this.vendorCategoryOpts = this.getTreeData(data.data);
        }
      });
    },
    // 税率
    getTaxRate() {
      puclicApi.getTaxRate().then(({ data }) => {
        if (data.code === 200) {
          this.taxRateOpts = data.data;
        }
      });
    },

    getWarehouseDetail(warehouseId) {
      puclicApi.getWarehouseDetail(warehouseId).then(({ data }) => {
        if (data.code === 200) {
          this.warehouseDetail = data.data;
        }
      });
    },

    // 币种
    getCurrency() {
      puclicApi.getCurrency().then(({ data }) => {
        if (data.code === 200) {
          this.currencyOpts = data.data;
        }
      });
    },
    // 获取币种汇率
    async getExchangeRate() {
      await puclicApi.getExchangeRate("").then(({ data }) => {
        if (data.code === 200) {
          this.exchangeRateOpts = data.data;
        } else {
          console.log("获取币种汇率数据失败");
        }
      });
    },
    // 地址类型
    getAddressType() {
      puclicApi.getAddressType().then(({ data }) => {
        if (data.code === 200) {
          this.addressTypeOpts = data.data;
        }
      });
    },
    // 采购员
    getUser() {
      puclicApi.getUser().then(({ data }) => {
        if (data.code === 200) {
          this.userOpts = data.data;
        }
      });
    },
    // 所属银行
    getBelongBank() {
      puclicApi.getBank().then(({ data }) => {
        if (data.code === 200) {
          this.bankOpts = data.data;
        }
      });
    },

    // 仓库(已启用)
    getWarehouse(params) {
      puclicApi.getWarehouse(params).then(({ data }) => {
        if (data.code === 200) {
          this.warehouse = data.data;
        }
      });
    },

    // 岗位权限内的仓库
    listStationWarehouse(params) {
      puclicApi.listStationWarehouse(params).then(({ data }) => {
        if (data.code === 200) {
          this.stationWarehouse = data.data;
        }
      });
    },

    // 根据仓库id查询库区
    // getReservoir(params) {
    //   puclicApi.getWarehouseArea(params).then(({ data }) => {
    //     if (data.code === 200) {
    //       this.warehouseAreap = data.data;
    //     }
    //   });
    // },

    // 根据库区id查询--库位
    getWarehouseLocation(warehouseId) {
      puclicApi.getWarehouseLocation(warehouseId).then(({ data }) => {
        if (data.code === 200) {
          this.warehouseLocation = data.data;
        }
      });
    },
    // // 获取建档已确认供应商
    getEnterVendorInfo(params) {
      puclicApi.getEnterVendorInfo(params).then(({ data }) => {
        if (data.code === 200) {
          this.enterVendorInfo = data.data.records;
        }
      });
    },
    getEnterPubVendorInfo(params) {
      puclicApi.getEnterPubVendorInfo(params).then(({ data }) => {
        if (data.code === 200) {
          this.enterVendorInfo = data.data;
        }
      });
    },

    getProductUnit() {
      puclicApi.getProductUnit().then(({ data }) => {
        if (data.code === 200) {
          this.unitOpts = data.data;
        }
      });
    },

    // // 获取计量单位   pageUnitMeasurement
    pageUnitMeasurement(params) {
      puclicApi.pageUnitMeasurement(params).then(({ data }) => {
        if (data.code === 200) {
          this.unitMeasurement = data.data.records;
        }
      });
    },
    // 获取所有供应商下拉选项信息
    async getVendorList() {
      await puclicApi.getVendorList().then(({ data }) => {
        if (data.code === 200) {
          this.vendorList = data.data;
        }
      });
    },
    // 客户(已审核)
    getAuditCustomer() {
      puclicApi.getAuditCustomer().then(({ data }) => {
        if (data.code === 200) {
          this.customerOpts = data.data;
        } else {
          console.log("获取客户数据失败");
        }
      });
    },
    // 客户(加数据权限的)
    async getStationCustomer() {
     await puclicApi.getStationCustomer().then(({ data }) => {
        if (data.code === 200) {
          this.customerOpts = data.data;
        } else {
          console.log("获取客户数据失败");
        }
      });
    },
    // 客户(已开通crm) customerCRM
    pageCustomerCrm() {
      puclicApi.pageCustomerCrm().then(({ data }) => {
        if (data.code === 200) {
          this.customerCRM = data.data;
        } else {
          console.log("获取客户数据失败");
        }
      });
    },
    // 供应商(已审核)-- 下拉选择所有已确认
    getAuditVendor() {
      puclicApi.getAuditVendor().then(({ data }) => {
        if (data.code === 200) {
          this.vendorOpts = data.data;
        } else {
          console.log("获取供应商数据失败");
        }
      });
    },
    // 建档产品分页查询--产品列表 -已确认
    getCreatedProductList(params) {
      puclicApi.getCreatedProductList(params).then(({ data }) => {
        if (data.code === 200) {
          this.productinfoList = data.data.records;
        }
      });
    },
    // 获取公共字典值
    getPublicDictList(type) {
      puclicApi.getPublicDict(type).then(({ data }) => {
        if (data.code === 200) {
          this.publicDictList[type] = data.data;
        }
      });
    },
    // 查询产品的转换单位和转换率
    getProductMeasurementConv(productId) {
      puclicApi.getProductMeasurementConv(productId).then(({ data }) => {
        if (data.code === 200) {
          this.productMeasurementConvList = data.data;
        }
      });
    },

    //获取适用范围字典值
    getApply() {
      puclicApi.getPublicDict("seal_use_cope").then(({ data }) => {
        if (data.code === 200) {
          this.applyOption = data.data;
        }
      });
    },
    // 审核状态
    getApprovalStatus() {
      puclicApi.getPublicDict("approval_status").then(({ data }) => {
        if (data.code === 200) {
          this.approvalStatusOpts = data.data;
        } else {
          console.log("获取审核状态数据失败");
        }
      });
    },
    // 发票类型
    getInvoiceType() {
      puclicApi.getPublicDict("Invoice_type").then(({ data }) => {
        if (data.code === 200) {
          this.invoiceTypeOpts = data.data;
        } else {
        }
      });
    },
    // 部门
    getDept() {
      puclicApi.getDept().then(({ data }) => {
        if (data.code === 200) {
          // this.deptOpts = data.data;
          this.deptOpts = this.getTreeData(data.data);
        } else {
        }
      });
    },
    // 产品分类
    getProductCategory() {
      puclicApi.getProductCategory().then(({ data }) => {
        if (data.code === 200) {
          this.categoryOpts = this.getTreeDatCategory(data.data);
        }
      });
    },
     // 三级 产品分类
     getCateMatchProduct() {
      puclicApi.getCateMatchProduct({type:1}).then(({ data }) => {
        if (data.code === 200) {
          this.categoryMatchOpts = data.data;
        }
      });
    },
    // 产品分类 -- 所有
    getProductCategoryAll() {
      puclicApi.getProductCategoryAll().then(({ data }) => {
        if (data.code === 200) {
          this.categoryOptsAll = this.getTreeDatCategory(data.data);
        }
      });
    },
    // 产品品牌
    getProductBrand() {
      puclicApi.getProductBrand().then(({ data }) => {
        if (data.code === 200) {
          this.brandOpts = data.data;
        }
      });
    },
    // 查询账号列表-获取用户名
    getUserName() {
      puclicApi.getUserName().then(({ data }) => {
        if (data.code === 200) {
          this.userNameData = data.data;
        }
      });
    },
   async getBeginningDate() {
    await puclicApi.getBeginningDate().then(({ data }) => {
        if (data.code === 200) {
          this.beginningDate = data.data;
        }
      });
    },
    // 获取标签 标签类别 0001-产品标签 0002-客户标签 0003-供应商标签	
    getLabelOption(labelType) {
      puclicApi.getLabelOption(labelType).then(({ data }) => {
        if (data.code === 200) {
          this.laberListOpts = data.data;
          // let arr = data.data;
          // listLabelByType(labelType).then((res) => {
          //   if (res.data.code === 200) {
          //     let list = res.data.data
          //     for (const i of list) {
          //       if (i.labelType == '0000') {
          //         for (const k of i.labelInfoVOList) {
          //           arr.push(k)
          //         }
          //       }
          //     }
          //     this.laberListOpts =  arr
          //   }else {
          //     this.laberListOpts = data.data;
          //   }
          // });
        }
      });
    }
  },
};

// 地址的Mixins
export const addressMixins = {
  data() {
    return {
      provinceOpts: [],
      cityOpts: [],
      countyOpts: [],
      addressTypeOpts: [],
    };
  },
  methods: {
    getProvince() {
      puclicApi.getProvince().then(({ data }) => {
        if (data.code === 200) {
          this.provinceOpts = data.data;
        }
      });
    },
    getCity(provinceId) {
      puclicApi.getCity(provinceId).then(({ data }) => {
        if (data.code === 200) {
          this.cityOpts = data.data;
        }
      });
    },
    getCounty(cityId) {
      puclicApi.getCounty(cityId).then(({ data }) => {
        if (data.code === 200) {
          this.countyOpts = data.data;
        }
      });
    },
    // 地址类型
    getAddressType() {
      puclicApi.getAddressType().then(({ data }) => {
        if (data.code === 200) {
          this.addressTypeOpts = data.data;
        }
      });
    },
  },
};

// avue表格公共配置项
export const paginationMixins = {
  data() {
    return {
      page: {
        total: 0, // 总页数
        pageSize: 50, // 每页显示多少条
        currentPage: 1, // 当前页数
        pages:0,//有多少页
        pageSizes: [50, 100, 150, 200],
      },
      tableData: [],
      tableLoading: false, // 表格加载标志
      initSearchparams: {}, //初始化搜索参数
      selectionData: [], //选择的数据
      orders: [], //获取得到的序号
      columnShowHiddenId: "",
      opts: [],
      API: '',
      total: {},
      sum:{},
      sortSearch:{
        sortColumn:'',
        sortType:''
      },
    }
  },
  methods: {
    getList(API) {
      this.API = API
      this.tableLoading = true;
      this.searchparams.pageNum = this.page.currentPage;
      this.searchparams.pageSize = this.page.pageSize;
      this.searchparams = Object.assign(this.searchparams,this.sortSearch)
      return new Promise((resolve, reject) => {
        API(this.searchparams)
          .then((res) => {
            let data = res.data;
            console.log(data);
            if (data.code === 200) {
              this.tableData = data.data.records || data.data.data.records;
              this.sum = data.data.sum
              this.page.total = data.data.total;
              this.page.pages = data.data.pages;
              this.$refs["crud"].doLayout();
              return resolve(data);
            } else {
              return reject(data.msg);
            }
          })
          .finally(() => {
            this.tableLoading = false;
          });
      });
    },
    // 排序
    sortChange(type,column){
      this.sortSearch.sortColumn = type ? column.prop : null;
      this.sortSearch.sortType = type;
      this.searchConfirm();
    },
    /**
     * 函数名称 getColumnList
     * @Date 2022-03-24 15:15:50
     * 函数描述 列显隐方法
     */
    getColumnList() {
      this.tableLoading = true;
      getColumn({
        noteType: this.noteType,
      }).then(({ data }) => {
        if (data.code == 200 && data.data) {
          let temp = JSON.parse(data.data.columnJson);
          this.tableOption.column = this.sortCrud(temp, this.originColumn);
          this.$refs["crud"].refreshTable();
          this.orders = temp;
          this.columnShowHiddenId = data.data.columnShowHiddenId;
        }
        this.tableLoading = false;
      });
    },
    /**
     * 函数名称 sizeChange
     * @Date 2022-03-24 15:15:50
     * 函数描述 每页数改变触发函数
     */
    sizeChange(val) {
      this.page.currentPage = 1;
      this.page.pageSize = val;
      this.getList(this.API);
    },
    /**
     * 函数名称 currentChange
     * @Date 2022-03-24 15:15:50
     * 函数描述 当前页改变触发函数
     */
    currentChange(val) {
      this.page.currentPage = val;
      this.getList(this.API);
    },
    pageChange({page,size}){
      this.page.currentPage = page;
      this.page.pageSize = size;
      this.getList(this.API);
    },
    /**
     * 函数名称 searchConfirm
     * @Date 2022-03-24 15:30:46
     * 函数描述 搜索
     */
    searchConfirm() {
      this.page.currentPage = 1;
      if (this.$refs['SearchPro']) {
        this.$refs['SearchPro'].searchMore = false
      }
      this.getList(this.API);
    },
    /**
     * 函数名称 emptyConfirm
     * @Date 2022-03-26 16:36:33
     * 函数描述 清空
     */
    emptyConfirm() {
      this.searchparams = this.deepClone(this.initSearchparams);
      this.page.currentPage = 1;
      if (this.dateparams) {
        for (let i in this.dateparams) {
          this.dateparams[i] = [];
        }
      }
      if (this.remoteObj) {
        for (let i in this.remoteObj) {
          this.remoteObj[i] = []
        }
      }
        this.selectionData = []
      // if (this.$refs['SearchPro']) {
      //   this.$refs['SearchPro'].searchMore = false
      // }
      this.getList(this.API);
    },
    // 列表多选
    selectionChange(list) {
      this.selectionData = list;
    },
  },

};
