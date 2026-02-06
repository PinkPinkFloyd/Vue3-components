<!--
 * @Author: sunsumin
 * @Date: 2023-05-29 17:26:41
 * @LastEditTime: 2025-01-07 17:13:57
 * @LastEditors: sunsumin
 * @Description: 打印模板首页
 * @FilePath: index.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
  <base-wrapper v-if="getPermissions('print_tpl_view')" title="打印模板设置">
    <template slot="menuRight">
      <el-button v-permissions="'print_tpl_add'" @click="isEdit = false; visible = true" type="primary">新增</el-button>
    </template>
    <div class="print-temp">
      <div class="temp-left">
        <div class="temp-left-input">
          <el-input placeholder="模板分类" suffix-icon="el-icon-search" :maxlength="50" v-model="filterText"></el-input>
        </div>
        <div style='height:calc(100vh - 170px);overflow:auto;'>
          <el-tree :current-node-key="1" default-expand-all :expand-on-click-node="true" :data="categoryList"
            node-key="type" @node-click="nodeClick" :filter-node-method="filterNode" ref="tree">
            <span class="custom-tree-node" slot-scope="{ data }">
              <span>{{ data.name }}</span>
            </span>
          </el-tree>
        </div>
      </div>
      <div v-loading="tableLoading" class="temp-right">
        <div class="temp-right-head">
          <el-form :model="form" label-width="64px" @submit.native.prevent>
            <el-row :gutter="15" type="flex" align="middle">
              <el-col :span="5">
                <el-form-item label-width="90px" label="模板名称">
                  <el-input @keyup.enter.native="Search()" :maxlength="50" v-model="form.printName"
                    placeholder="模板名称"></el-input>
                </el-form-item>
              </el-col>

              <el-col style="display: flex" :span="3">
                <el-button @click="Search()" type="primary">查询</el-button>
                <el-button @click="Reset()">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="bgcccc"></div>
        <div class="base--buttons">
          &emsp;
          <span>已选中 <span style="color: #66b1ff">{{ selected.length }}</span> 条</span>&emsp;
          <div v-permissions="'print_tpl_default'"><el-divider direction="vertical"></el-divider></div>
          <el-button v-permissions="'print_tpl_default'" @click="setDefault()" size="meduim"
            type="text">设为默认</el-button>
          <div v-permissions="'print_tpl_del'"><el-divider direction="vertical"></el-divider></div>
          <el-button v-permissions="'print_tpl_del'" @click="Delete()" size="meduim" type="text">删除</el-button>
          <div v-permissions="'print_tpl_add'"><el-divider direction="vertical"></el-divider></div>
          <el-button v-permissions="'print_tpl_add'" @click="Copy()" size="meduim" type="text">复制</el-button>
        </div>
        <avue-crud :data="tableData" :option="tableOption" :page.sync="page" @selection-change="selectionChange"
          @current-change="currentChange" @size-change="sizeChange" ref="print_template" @row-click="rowClick"
          :row-style="rowStyle" :row-class-name="({ row }) => (selected.includes(row) ? 'row_selected_bg' : '')">
          <template slot="index" slot-scope="{ index }">
            <span>{{ index + 1 }}</span>
          </template>
          <template slot="indexHeader">
            <ColShowHide @success="getColumnList" :column="originColumn" :order="orders" :noteType="noteType"
              :columnShowHiddenId="columnShowHiddenId" />
          </template>
          <template slot="printName" slot-scope="{ row }">
            <span @click.stop="toDetails(row)" class="p_link_btn">{{ row.printName }}</span>
          </template>
          <!-- isDefult -->
          <template slot="isDefult" slot-scope="{ row }">
            <img style="width:20px;vertical-align: middle;" v-if="row.isDefult == '1'" src="/img/yes.png" alt="">
          </template>
          <template slot="caozuo" slot-scope="{ row }">
            <!-- 销售报价单、框架合同、销售订单、客户对账单、销售出库单、销售退货单、销售出库标签 -->
            <!-- ['0001','0002','0003','0016','0011','0012'] -->
            <span v-permissions="'print_tpl_relate'"
              v-if="['0001', '0002', '0003', '0016', '0011', '0012', '1003'].includes(row.printType)"
              @click.stop="openRelate('customer', row)" class="p_link_btn">关联客户</span>

            <!-- 采购询价单、采购订单、采购入库单、采购退货单； -->
            <span v-permissions="'print_tpl_relate'" v-if="['0004', '0006', '0009', '0010'].includes(row.printType)"
              @click.stop="openRelate('vendor', row)" class="p_link_btn">关联供应商</span>
          </template>
        </avue-crud>
      </div>
    </div>
    <!-- 创建打印模板弹窗 -->
    <el-dialog :title="isEdit ? '复制打印模板' : '创建打印模板'" :before-close="handleClose" :visible.sync="visible" width="470px"
      v-dialogDrag :close-on-click-modal="false">
      <el-form ref="ruleForm" :hide-required-asterisk="false" :show-message="true" :rules="rules" :model="addForm"
        label-width="90px" label-position="right">
        <el-form-item style="margin-top: 10px" prop="templateType" label="模板类型：">
          <el-select @change="templateTypeChange" v-model="addForm.templateType" :disabled="isEdit" filterable
            placeholder="模板类型" style="width: 100%">
            <el-option label="简易模板" value="0001"> </el-option>
            <el-option label="自定义模板" value="0002"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-top: 10px" prop="printName" label="模板名称：">
          <el-input v-strim v-model="addForm.printName" placeholder="模板名称" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px" prop="printType" label="单据类型：">
          <el-select @change="noteTypeChange" v-model="addForm.printType" :disabled="isEdit" filterable
            placeholder="单据类型" style="width: 100%">
            <el-option v-for="item in noteTypes" :key="item.type" :label="item.name" :value="item.type"> </el-option>
          </el-select>
        </el-form-item>
        <!-- 0009 0010 0011 0012 0013 0014 0015可二等分，三等分-->
        <el-form-item v-if="addForm.templateType == '0001'" style="margin-top: 10px" prop="printPaper" label="纸张类型：">
          <el-select :disabled="can_paper || isEdit" v-model="addForm.printPaper" filterable placeholder="纸张类型"
            style="width: 100%">
            <el-option v-for="item in paperTypes" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="handleClose()">取消</el-button>
        <el-button v-preventReClick @click="Save()" type="primary">确定</el-button>
      </template>
    </el-dialog>
    <!-- 关联弹框 -->
    <el-dialog title="关联客户" :visible.sync="isCustomerRelate" width="470px" v-dialogDrag :close-on-click-modal="false">

      <el-form :model="relateForm" label-width="100px">
        <el-form-item style="margin-top: 15px;" label="适用客户：">
          <el-radio-group v-model="relateForm.suitCustomer">
            <el-radio label="0001">全部客户</el-radio>
            <el-radio label="0002">指定客户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-top: 15px;" label="关联客户：">
          <div class="relate-box">
            <el-select style="width: 100%;" :disabled="relateForm.suitCustomer == '0001'" v-model="relateForm.personId"
              multiple filterable placeholder="请选择" collapse-tags>
              <el-option v-for="(item, index) in customerOpts" :key="index" :label="item.customerName"
                :value="item.customerId">
              </el-option>
            </el-select>
            <div class="relate-list">
              <section class="relate-item" v-for="(item, index) in customerList" :key="index">
                <section>{{ item.customerName }}</section>
                <i @click="removeItem('customer', index)" class="el-icon-close"></i>
              </section>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="closeRelate('customer')">取消</el-button>
        <el-button v-preventReClick @click="saveRelate()" type="primary">确定</el-button>
      </template>
    </el-dialog>
    <!-- 关联供应商 -->
    <el-dialog title="关联供应商" :visible.sync="isVendorRelate" width="470px" v-dialogDrag :close-on-click-modal="false">
      <el-form :model="relateForm" label-width="100px">
        <el-form-item style="margin-top: 15px;" label="适用供应商：">
          <el-radio-group v-model="relateForm.suitCustomer">
            <el-radio label="0001">全部供应商</el-radio>
            <el-radio label="0002">指定供应商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="margin-top: 15px;" label="关联供应商：">
          <div class="relate-box">
            <el-select style="width: 100%;" :disabled="relateForm.suitCustomer == '0001'" v-model="relateForm.personId"
              multiple filterable placeholder="请选择" collapse-tags>
              <el-option v-for="(item, index) in enterVendorInfo" :key="index" :label="item.vendorName"
                :value="item.vendorId">
              </el-option>
            </el-select>
            <div class="relate-list">
              <section class="relate-item" v-for="(item, index) in VendorList" :key="index">
                <section>{{ item.vendorName }}</section>
                <i @click="removeItem('vendor', index)" class="el-icon-close"></i>
              </section>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button @click="closeRelate('vendor')">取消</el-button>
        <el-button v-preventReClick @click="saveRelate()" type="primary">确定</el-button>
      </template>
    </el-dialog>
  </base-wrapper>
</template>
<script>
import * as API from '@/api/systemSet/printTemplate.js'
import { getColumn } from '@/api/public.js'
import { publicMixins } from '@/mixins/publicMixins'
import Vue from 'vue'
const tableOption = {
  height: document.documentElement.clientHeight - 217 + 'px',
  index: false,
  selection: true,
  border: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  headerAlign: 'left',
  align: 'left',
  menu: false,
  tip: false,
  reserveSelection: false,
  showSummary: false, //开启合计
  column: [
    {
      label: '序号',
      prop: 'index',
      width: 60,
      headerslot: true,
      fixed: true,
      disable: true, //此参数只能用于第一项或者最后一项，为true则列显隐表内不再显示此列
      align: 'center',
      headerAlign: 'center',
    },
    {
      overHidden: true,
      label: '单据类型',
      prop: 'printTypeName',
      minWidth: 160,
      align: 'center',
    },
    {
      overHidden: true,
      label: '模板名称',
      prop: 'printName',
      minWidth: 180,
      slot: true,
    },
    {
      overHidden: true,
      label: '纸张类型',
      prop: 'printPaperName',
      minWidth: 120,
      align: 'center',
    },
    {
      overHidden: true,
      label: '默认模板',
      prop: 'isDefult',
      minWidth: 100,
      align: 'center',
      slot: true,
    },
    {
      overHidden: true,
      label: '适用客户/供应商',
      prop: 'suitCustomerName',
      minWidth: 150,
      slot: true,
    },
    {
      overHidden: true,
      label: '操作',
      prop: 'caozuo',
      minWidth: 100,
      align: 'center',
      slot: true,
    },
  ],
}



export default {
  mixins: [publicMixins],
  data() {
    return {
      categoryList: [
        {
          type: 1,
          name: '全部',
          children: [],
        },
        {
          type: 2,
          name: '销售管理',
          children: [
            { name: '销售报价单', type: '0001' },
            { name: '框架合同', type: '0002' },
            { name: '销售订单', type: '0003' },
            { name: '客户对账单', type: '0016' },
          ],
        },
        {
          type: 3,
          name: '采购管理',
          children: [
            { name: '采购询价单', type: '0004' },
            { name: '供应商报价单', type: '0005' },
            { name: '采购订单', type: '0006' },
            { name: '付款申请单', type: '0007' },
            { name: '预付申请单', type: '0008' },
          ],
        },
        {
          type: 4,
          name: '仓库管理',
          children: [
            { name: '采购入库单', type: '0009' },
            { name: '采购退货单', type: '0010' },
            { name: '销售出库单', type: '0011' },
            { name: '销售退货单', type: '0012' },
            { name: '其他入库单', type: '0013' },
            { name: '其他出库单', type: '0014' },
            { name: '调拨单', type: '0015' },
          ],
        },
        {
          type: 5,
          name: '质检管理',
          children: [
            { name: '来料质检单', type: '0023' },
            { name: '出库检验报告', type: '0024' },
          ],
        },
        {
          type: 6,
          name: '条码标签',
          children: [
            { name: '产品标签', type: '0018' },
            { name: '采购入库标签', type: '1001' },
            { name: '采购退货标签', type: '1002' },
            { name: '销售出库标签', type: '1003' },
            { name: '销售退货标签', type: '1004' },
            { name: '其他入库标签', type: '1005' },
            { name: '其他出库标签', type: '1006' },
            { name: '箱码标签', type: '1007' },
            { name: '期初产品标签', type: '0022' },
            { name: '库位标签', type: '0019' },
            { name: '车辆标签', type: '0020' },
            { name: '线路标签', type: '0021' },
          ],
        }
      ],
      filterText: '',
      form: {
        printName: '', //	模板名称
        printType: '', //	类型

        pageSize: 50, //每页条数
        pageNum: 1, //当前页码
      },
      tableData: [],
      tableOption: this.deepClone(tableOption),
      tableLoading: false,
      selected: [],
      page: {
        total: 1,
        currentPage: 1,
        pageSize: 50,
      },
      //创建打印模板
      visible: false,
      isEdit: false,
      addForm: {
        templateType: '0001',//模板类型
        printType: '', //单据类型
        printName: '', //模板名称
        printPaper: '0001', //模板纸张
        isDefult: '0', //是否默认
      },
      rules: {
        templateType: [{ required: true, message: '请选择模板类型', trigger: 'change' }],
        printType: [{ required: true, message: '请选择单据类型', trigger: 'change' }],
        printName: [{ required: true, message: '请输入模板名称', trigger: ['input', 'blur'] }],
      },
      paperTypes: [
        { value: '0001', label: 'A4（241*280mm）' },
        { value: '0002', label: '二等分（241*140）' },
        { value: '0003', label: '三等分（241*93）' },
      ],
      can_paper: false, //false可选
      //
      originColumn: this.deepClone(tableOption.column), //原始列
      orders: [], //获取得到的序号
      columnShowHiddenId: '',
      noteType: 'print_template',
      // 
      relateForm: {
        printConfigId: "",//配置id
        personId: [],//人员id
        printType: '',//打印类型
        suitCustomer: '',//适合客户 0001全部   0002指定
      },
      isCustomerRelate: false,
      isVendorRelate: false,
      relateType: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
  },
  computed: {
    noteTypes() {
      let arr = []
      if (this.addForm.templateType == '0001') {
        this.categoryList.slice(1, 5).forEach((item) => {
          item.children.forEach(el => {
            if (el.type != '0024')
              arr.push(el)
          })

        })
      } else {
        this.categoryList.forEach((item) => {
          arr.push(...item.children)
        })
      }

      return arr
    },
    customerList() {
      if (this.relateForm.suitCustomer == '0001') {
        this.relateForm.personId = [];
        return [];
      }
      let customerIds = this.relateForm.personId;
      let arr = [];
      this.customerOpts.forEach(item => {
        if (customerIds.includes(item.customerId)) arr.push(item);
      });
      return arr;
    },
    VendorList() {
      if (this.relateForm.suitCustomer == '0001') {
        this.relateForm.personId = [];
        return [];
      }
      let vendorIds = this.relateForm.personId;
      let arr = [];
      this.enterVendorInfo.forEach(item => {
        if (vendorIds.includes(item.vendorId)) arr.push(item);
      });
      return arr;
    }
  },
  methods: {
    // 列显隐排序列表
    getColumnList() {
      this.tableLoading = true
      getColumn({
        noteType: this.noteType,
      })
        .then(({ data }) => {
          if (data.code == 200 && data.data) {
            let temp = JSON.parse(data.data.columnJson)
            this.tableOption.column = this.sortCrud(temp, this.originColumn)
            this.$nextTick(() => {
              this.$refs['print_template'].refreshTable()
            })
            this.orders = temp
            this.columnShowHiddenId = data.data.columnShowHiddenId
          }
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    nodeClick(data) {
      if (!data.children) {
        this.form.printType = data.type
        this.Search()
      } else if (data.type == 1) {
        this.form.printType = ''
        this.Search()
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    rowClick(row, event, column) {
      this.$refs['print_template'].toggleSelection([row])
    },
    rowStyle({ row, rowIndex }) {
      if (this.selected.includes(row)) {
        return {
          backgroundColor: '#e9f2fd',
        }
      } else {
        return {}
      }
    },
    // 勾选的同时会回调selectionChange方法返回当前选中的数据
    selectionChange(list) {
      this.selected = list
    },
    //  切换分页
    currentChange(val) {
      this.page.currentPage = val
      this.form.pageNum = val
      this.getList()
    },
    sizeChange(val) {
      this.page.currentPage = 1
      this.form.pageSize = val
      this.form.pageNum = 1
      this.page.pageSize = val
      this.getList()
    },
    templateTypeChange(val) {
      if (val == '0002') {
        this.addForm.printPaper = ''
      } else {
        this.addForm.printPaper = '0001'
        this.addForm.printType=''
      }

    },
    // 创建打印模板
    async handleClose() {
      this.addForm = {
        templateType: '0001',//模板类型
        printType: '', //单据类型
        printName: '', //模板名称
        printPaper: '0001', //模板纸张
        isDefult: '0', //是否默认
      }
      await this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      this.visible = false
    },
    noteTypeChange() {
      let arr = ['0009', '0010', '0011', '0012', '0013', '0014', '0015']
      if (arr.includes(this.addForm.printType)) {
        this.can_paper = false
      } else {
        this.can_paper = true
        this.addForm.printPaper = '0001'
      }
    },


    Save() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let printType = this.addForm.printType, templateType = this.addForm.templateType;
          API.printsave(this.addForm).then(({ data }) => {
            if (data.code === 200) {
              this.handleClose();

              this.Search()
              if (this.isEdit) {
                this.$message.success('复制成功！')
              } else {
                this.$message.success('新增模板成功！')
                this.handleClose().then(() => {
                  this.toDetails({ printConfigId: data.data, printType, templateType })
                })
              }

            }
          })
        }
      })
    },
    toDetails(row) {
      if (row.templateType == '0002') {
        this.$router.push({
          path: '/systemSet/hiprintTemplate/design',
          query: {
            id: row.printConfigId,
          },
        })
      } else {
        if (row.printType == '0007' || row.printType == '0008') {
          this.$router.push({
            path: '/systemSet/printTemplate/editPayment',
            query: {
              id: row.printConfigId,
            },
          })
        } else {
          this.$router.push({
            path: '/systemSet/printTemplate/edit',
            query: {
              id: row.printConfigId,
            },
          })
        }
      }
    },
    // 删除
    Delete() {
      if (this.selected.length == 0) {
        this.$message.warning('请选择模板！')
        return
      }
      this.$confirm(`确认删除所选模板？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        let ids = this.selected.map((item) => item.printConfigId)
        API.printdelete(ids).then(({ data }) => {
          if (data.code == 200) {
            this.$message.success('删除成功！')
            this.Search()
          }
        })
      })
    },
    // 复制
    Copy() {
      if (this.selected.length == 0) {
        this.$message.warning('请选择模板！')
        return
      }
      if (this.selected.length != 1) {
        this.$message.warning('不支持批量复制，请单选列表模板数据！')
        return
      }
      this.isEdit = true;
      let temp = this.selected[0];
      this.addForm = {
        templateType:temp.templateType=='0002'?'0002':'0001',//模板类型
        printType: temp.printType, //单据类型
        printName: '', //模板名称
        printPaper: temp.printPaper, //模板纸张
        isDefult: '0', //是否默认
        printTxt: temp.printTxt
      }
      this.visible = true;



    },
    // 设为默认
    setDefault() {
      if (this.selected.length == 0) {
        this.$message.warning('请选择模板！')
        return
      }
      if (this.selected.length != 1) {
        this.$message.warning('请选择一行模板！')
        return
      }
      let id = this.selected[0].printConfigId
      API.updatedefult(id).then(({ data }) => {
        if (data.code == 200) {
          this.$message.success('所选模板已设为默认！')
          this.getList()
        }
      })
    },
    // 重置
    Reset(type) {
      this.form.printName = '' //	模板名称
      this.form.pageSize = 50 //每页条数
      this.form.pageNum = 1 //当前页码
      this.getList()
    },
    getList() {
      this.tableLoading = true
      API.printpage(this.form)
        .then(({ data }) => {
          if (data.code === 200) {
            this.tableData = data.data.records
            this.page.total = data.data.total
            this.page.currentPage = data.data.current
            this.page.pageSize = data.data.size
            this.$refs['print_template'].toggleSelection()
          }
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    Search() {
      this.page.currentPage = 1
      this.form.pageNum = 1
      this.getList()
    },

    // 关联客户
    openRelate(type, row) {
      if (type == 'customer') {
        this.relateType = 'customer'
        this.isCustomerRelate = true
      } else if (type == 'vendor') {
        this.relateType = 'vendor'
        this.isVendorRelate = true
      }
      API.getRelation({
        printConfigId: row.printConfigId
      }).then(({ data }) => {
        if (data.code == 200) {
          this.relateForm.printConfigId = row.printConfigId;//配置id
          this.relateForm.printType = row.printType;//打印类型
          this.relateForm.suitCustomer = data.data.suitCustomer;//适合客户 0001全部   0002指定
          this.relateForm.personId = data.data.personId;///人员id
        }
      })
    },



    removeItem(type, index) {
      this.relateForm.personId.splice(index, 1)
    },

    closeRelate(type) {
      if (type == 'customer') {
        this.isCustomerRelate = false;
      } else if (type == 'vendor') {
        this.isVendorRelate = false;
      }
      this.relateForm = {
        printConfigId: "",//配置id
        personId: [],//人员id
        printType: '',//打印类型
        suitCustomer: '',//适合客户 0001全部   0002指定
      }

    },


    saveRelate() {
      if (this.relateForm.suitCustomer == '0002' && this.relateForm.personId.length == 0) return this.$message.warning('选择【指定' + (this.relateType == 'customer' ? '客户' : '供应商') + '】时，【关联' + (this.relateType == 'customer' ? '客户' : '供应商') + '】至少选择一项')
      API.relationCustomerVendor(this.relateForm).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('关联成功！')
          this.isVendorRelate = false;
          this.isCustomerRelate = false;
          this.getList();
        }
      })


    }



  },
  activated() {
    if (this.getPermissions('print_tpl_view')) {
      this.getList()
    }
  },
  mounted() {
    // this.$loading({fullscreen: true})
    // setTimeout(()=>{
    //   this.$loading().close()
    // },40000)
    if (this.getPermissions('print_tpl_view')) {
      this.getColumnList()
      this.getStationCustomer();
      this.getEnterPubVendorInfo()
    }

  },
}
</script>

<style lang="scss" scoped>
.print-temp {
  display: flex;
  align-items: flex-start;

  ::v-deep .el-table__fixed::before {
    background-color: transparent;
  }

  .temp-left {
    width: 200px;
  }

  .temp-left-input {
    padding: 15px 8px;
  }

  .temp-right {
    flex: 1;
    border-left: 1px solid #ebeef5;

    .bgcccc {
      height: 5px;
      background-color: #e9edf6;
    }
  }

  .temp-right-head {
    padding: 5px 0;
  }

  ::v-deep .el-tree-node.is-current>.el-tree-node__content {
    background-color: #ecf5ff;
  }

  ::v-deep .el-tree-node__content:hover {
    background-color: #ecf5ff;
  }

  ::v-deep .el-tree-node__content:hover,
  ::v-deep .el-tree-node:focus>.el-tree-node__content,
  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    border-top: none;
    border-bottom: none;
  }

  ::v-deep .el-tree-node__content {
    border-bottom: none;
  }


}

.relate-box {

  padding-right: 20px;

  .relate-list {
    height: 140px;
    overflow-y: auto;
  }

  .relate-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ededed;
    border-radius: 4px;
    padding: 0 10px;
    margin-top: 5px;
    height: 20px;
    line-height: 20px;
  }

  .relate-item>section {
    width: calc(100% - 20px);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

  }

  .relate-item>i {
    font-size: 12px;
    color: #aaa;
    cursor: pointer;
  }
}
</style>
