<!--
 * @Author: sunsumin
 * @Date: 2023-05-29 17:43:09
 * @LastEditTime: 2024-11-27 10:27:49
 * @LastEditors: sunsumin
 * @Description: 普通单据
 * @FilePath: edit.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
  <base-wrapper v-loading="loading" :title="pageTitle">
    <template slot="menuRight">
      <el-button v-permissions="'print_tpl_edit'" @click="Submit()" type="primary" v-preventReClick>保存</el-button>
      <el-button @click="toList()">返回列表</el-button>
    </template>
    <template slot="menu">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item style="margin-bottom: 0" label="模板名称：" prop="printName">
              <el-input v-strim :maxlength="50" type="text" v-model="form.printName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item style="margin-bottom: 0" label="纸张类型：" prop="printPaper">
              <el-select disabled v-model="form.printPaper" placeholder="请选择纸张类型">
                <el-option v-for="(item, index) in paperSize" :key="index" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item style="margin-bottom: 0" label-width="75px" label="默认模板：" prop="isDefult">
              <el-switch active-color="#13ce66" v-model="form.isDefult"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <div class="p_main" :style="{ height: rootHeight }">
      <div class="p_left">
        <div :style="pagerStyle" class="p_print_page">
          <div>
            <!-- 头部 -->
            <div :style="{
              'text-align': printOptions.titleAlign,
            }" class="p_left_head">
              <div>
                <div v-if="printOptions.isTitle" :style="{
                  'font-weight': printOptions.isTitleBold ? 'bolder' : '',
                }" class="p_head_company">
                  {{ printOptions.title }}
                </div>
                <div v-if="printOptions.isSubtitle" class="p_head_address">
                  {{ printOptions.subtitle }}
                </div>
                <div v-if="printOptions.isHeader" :style="{
                  'font-weight': printOptions.isHeaderBold ? 'bolder' : '',
                  'text-align': printOptions.subTitleAlign,
                }" class="p_head_type">
                  {{ printOptions.headerTitle }}
                </div>
              </div>
              <!-- logo -->
              <div v-if="logo.url" class="drag_logo" id="logo">
                <img ref="logo" style="width: 100%; height: 100%" :src="logo.url" alt="" />
              </div>
              <!-- 二维码 -->
              <div v-show="code.show" class="drag_code" id="code">
                <img ref="code" style="width: 100%; height: 100%" :src="code.url" alt="" />
              </div>
            </div>
            <!-- 顶部信息 -->
            <printMenu flag='a' @click.native="togoleMenuRight(1)" :class="rightActive == 1 ? 'p_left_active' : ''"
              :data="topData" />
            <printTable flag='d' @click.native="togoleMenuRight(2)" :class="rightActive == 2 ? 'p_left_active' : ''"
              :data="tableOptions" />
            <printMenu flag='b' @click.native="togoleMenuRight(3)" :class="rightActive == 3 ? 'p_left_active' : ''"
              :data="bottomData" />
          </div>
          <!-- 印章 -->
          <div :class="rightActive == 4 ? 'p_left_active' : ''" class="p_print_seal_box">
            <!-- 自定义条款 -->
            <printMenu flag='kk' @click.native="togoleMenuRight(4)" :data="customData" />
            <div v-if="seal.url" class="drag_seal" id="seal">
              <div style="width: 100%; height: 100%;position: relative;">
                <i class="el-icon-close seal-close" @click="seal.url = ''"></i>
                <img ref="seal" style="width: 100%; height: 100%" :src="seal.url" alt="" />
              </div>
            </div>
          </div>
          <!-- 页脚 -->
          <div class="p_main_page"><span v-if="printOptions.isFooter">{{ printOptions.footerTitle }} &ensp;</span>第{{ 1
            }}页/共{{ 1 }}页</div>
          <!-- 二等分两边 -->
          <div v-if="form.printPaper == '0002' || form.printPaper == '0003'" :style="{ width: mmConversionPx(12) + 'px' }"
            class="paper-lace paper-lace-left"></div>
          <div v-if="form.printPaper == '0002' || form.printPaper == '0003'" :style="{ width: mmConversionPx(12) + 'px' }"
            class="paper-lace paper-lace-right"></div>
        </div>
      </div>
      <div class="p_right">
        <el-scrollbar class="el-scrollbar-x" style="height: 100%">
          <section class="p_right_item" v-for="(item, index) in rightMenu" :key="index">
            <section @click="togoleMenu(item.flag, item)" class="p_right_tit">
              <i :class="item.show ? 'rotate' : ''" class="el-icon-arrow-left"></i>
              {{ item.title }}
            </section>
            <el-collapse-transition>
              <div v-show="item.show" class="p_right_main">
                <div class="p_right_table" v-if="item.flag == 1">
                  <section :key="key" v-for="(el, key) in topData.rightList">
                    <el-checkbox @change="topItemChange($event, el)" v-model="el.show">
                      {{ el.name }}
                    </el-checkbox>
                  </section>
                  <section class="p_right_btn">
                    <label @click="addTopItem()" for=""><i class="el-icon-circle-plus-outline"></i> 添加字段</label>
                  </section>
                  <section class="p_right_btn">
                    <uploadImg uploadFolderName="/images/websiteConfig/" :maxSize="5" @returnSrc="upLogo">
                      <label for="uplogo"><i class="el-icon-circle-plus-outline"></i>添加LOGO</label>
                    </uploadImg>
                    <!-- <label for="uplogo"><i class="el-icon-circle-plus-outline"></i>添加LOGO</label>
                    <input @change="upLogo($event)" id="uplogo" type="file" accept="image/*" /> -->
                  </section>
                </div>
                <div class="p_right_table" v-if="item.flag == 2">
                  <section :key="key" v-for="(el, key) in tableOptions.rightOptions">
                    <el-checkbox @change="columnChange($event, el)" v-model="el.show">
                      {{ el.label }}
                    </el-checkbox>
                  </section>
                </div>
                <div class="p_right_table" v-if="item.flag == 3">
                  <section :key="key" v-for="(el, key) in bottomData.rightList">
                    <el-checkbox @change="bttomItemChange($event, el)" v-model="el.show">
                      {{ el.name }}
                    </el-checkbox>
                  </section>
                </div>
                <div class="p_right_table" v-if="item.flag == 4">
                  <section class="p_right_btn">
                    <label @click="addCustomItem()" for=""><i class="el-icon-circle-plus-outline"></i>添加字段</label>
                  </section>
                  <section class="p_right_btn">
                    <label @click="addCustomTerm()" for=""><i class="el-icon-circle-plus-outline"></i>添加自定义条款</label>
                  </section>
                  <section class="p_right_btn">
                    <uploadImg uploadFolderName="/images/websiteConfig/" :maxSize="5" @returnSrc="upSeal">
                      <label for="upseal"><i class="el-icon-circle-plus-outline"></i>添加盖章</label>
                    </uploadImg>
                  </section>
                </div>
                <printSet :printOptions="printOptions" v-if="item.flag == 0" />
              </div>
            </el-collapse-transition>
          </section>
        </el-scrollbar>
      </div>
    </div>
    <!-- 顶部列表添加编辑 -->
    <el-dialog v-dialogDrag title="添加字段" :visible.sync="topVisible" :close-on-click-modal="false" width="40%">
      <el-form :model="topForm" :rules="topRules" ref="topForm" label-width="80px">
        <el-form-item style="margin-top: 10px" label="字段名称：" prop="name">
          <el-input v-strim :maxlength="20" placeholder="字段名称" type="text" v-model="topForm.name"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px" label="字段内容：" prop="desc">
          <el-input v-strim :maxlength="500" placeholder="字段内容" type="text" v-model="topForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="
          topVisible = false
        $refs.topForm.clearValidate()
          ">取消</el-button>
        <el-button type="primary" @click="submitTopItem">确定</el-button>
      </span>
    </el-dialog>
    <!--自定义字段 -->
    <el-dialog v-dialogDrag title="添加字段" :visible.sync="customVisible" :close-on-click-modal="false" width="40%">
      <el-form :model="customForm" :rules="customRules" ref="customForm" label-width="80px">
        <el-form-item style="margin-top: 10px" label="字段名称：" prop="name">
          <el-input v-strim :maxlength="20" placeholder="字段名称" type="text" v-model="customForm.name"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px" label="字段内容：" prop="desc">
          <el-input v-strim :maxlength="500" placeholder="字段内容" type="text" v-model="customForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="
          customVisible = false
        $refs.customForm.clearValidate()
          ">取 消</el-button>
        <el-button type="primary" @click="submitCustomItem">确 定</el-button>
      </span>
    </el-dialog>
    <!--自定义条款 -->
    <el-dialog v-dialogDrag title="添加自定义条款" :visible.sync="customTermVisible" :close-on-click-modal="false" width="40%">
      <el-form :model="customTermForm" :rules="customTermRules" ref="customTermForm" label-width="80px">
        <el-form-item style="margin-top: 10px;" label="条款名称：" prop="name">
          <el-input style="width: calc(100% - 40px);" :class="customTermForm.isBold ? 'p_term_bold' : ''" v-strim
            :maxlength="20" placeholder="条款名称" type="text" v-model="customTermForm.name"></el-input>
          <b @click="customTermForm.isBold = !customTermForm.isBold" :class="customTermForm.isBold ? 'active' : ''"
            class="p_term_bold_icon">B</b>
        </el-form-item>
        <el-form-item style="margin-top: 10px" label="条款内容：" prop="desc">
          <el-input v-strim show-word-limit rows="5" :maxlength="500" placeholder="条款内容" type="textarea"
            v-model="customTermForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="
          customTermVisible = false
        $refs.customTermForm.clearValidate()
          ">取 消</el-button>
        <el-button type="primary" @click="submitCustomTermItem">确 定</el-button>
      </span>
    </el-dialog>
  </base-wrapper>
</template>
<script>

import interact from 'interactjs'
import { getSysEntInfo } from '@/api/baseDocument/entsetting/companyInfo'
import * as API from '@/api/systemSet/printTemplate.js'
// 销售报价单
import saleQutation1 from '@/const/printTemplate/saleQutation'
// 框架合同模板
import frameworkContract1 from '@/const/printTemplate/frameworkContract'
// 销售订单模板
import saleOrder1 from '@/const/printTemplate/saleOrder'
// 采购询价单模板
import purInquiry1 from '@/const/printTemplate/purInquiry'
// 供应商报价单模板
import supplierQuotation1 from '@/const/printTemplate/supplierQuotation'
// 采购订单模板
import purOrder1 from '@/const/printTemplate/purOrder'
// 采购入库单模板
import purStockIn1 from '@/const/printTemplate/purStockIn'
// 采购退货单模板
import purReturnGoods1 from '@/const/printTemplate/purReturnGoods'
// 销售出库单模板
import saleStockOut1 from '@/const/printTemplate/saleStockOut'
// 销售退货单模板
import saleReturnGoods1 from '@/const/printTemplate/saleReturnGoods'

// 其他入库单
import otherStockIn1 from '@/const/printTemplate/otherStockIn'
// 其他出库单
import otherStockOut1 from '@/const/printTemplate/otherStockOut'
// 调拨单
import transfer1 from '@/const/printTemplate/transfer'
// 客户对账单
import customerReconciliation1 from '@/const/printTemplate/customerReconciliation'

// 来料质检单
import incomingCheck1 from '@/const/printTemplate/incomingCheck'

import { getTemplateName } from '@/const/hiprintTemplate';



import { deepClone } from '@/util/util.js';
let saleQutation = deepClone(saleQutation1)
let frameworkContract = deepClone(frameworkContract1)
let saleOrder = deepClone(saleOrder1)
let purInquiry = deepClone(purInquiry1)
let supplierQuotation = deepClone(supplierQuotation1)
let purOrder = deepClone(purOrder1)
let purStockIn = deepClone(purStockIn1)
let purReturnGoods = deepClone(purReturnGoods1)
let saleStockOut = deepClone(saleStockOut1)
let saleReturnGoods = deepClone(saleReturnGoods1)
let otherStockIn = deepClone(otherStockIn1)
let otherStockOut = deepClone(otherStockOut1)
let transfer = deepClone(transfer1)
let customerReconciliation = deepClone(customerReconciliation1)
let incomingCheck = deepClone(incomingCheck1)



import { mapGetters } from 'vuex'
export default {
  components: {
    uploadImg: () => import('./children/uploadImg.vue'),
    printTable: () => import('./children/printTable.vue'),
    printMenu: () => import('./children/printMenu.vue'),
    printSet: () => import('./children/printSet.vue'),
  },
  data() {
    return {
      rootHeight: document.documentElement.clientHeight - 140 + 'px',
      form: {
        printType: '', //	类型
        printName: '',
        isDefult: false, //是否默认
        printConfigId: '', //配置id
        printPaper: '0001', //模板纸张
        printTxt: '',
      },
      rules: {
        printName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        printPaper: [{ required: true, message: '请选择纸张类型', trigger: 'change' }],
      },
      // 头部logo
      logo: {
        url: '',
        width: 180,
        height: 60,
        top: 10,
        left: 10,
      },
      // 二维码
      code: {
        url: '/img/code.png',
        width: 80,
        height: 80,
        top: 0,
        left: 0,
        show: false,
      },
      // 顶部信息
      topData: {
        mainList: [],
        rightList: [],
      },
      topVisible: false,
      addTopIndex: 0,
      topForm: {
        name: '',
        desc: '',
        width: 200,
        default: 0,
        field: '',
        show: true,
      },
      topRules: {
        name: [{ required: true, message: '请输入字段名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入字段内容', trigger: 'blur' }],
      },
      // 表格配置
      tableOptions: {
        mainOptions: [],
        rightOptions: [],
      },
      // 底部信息
      bottomData: {
        mainList: [],
        rightList: [],
      },
      // 自定义信息
      customData: {
        mainList: [],
        rightList: [],
      },
      customVisible: false,
      customForm: {
        name: '',
        desc: '',
        width: 200,
        field: '',
        default: 0,
      },
      customRules: {
        name: [{ required: true, message: '请输入字段名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入字段内容', trigger: 'blur' }],
      },
      customTermVisible: false,
      customTermForm: {
        name: '',
        desc: '',
        width: 200,
        field: '',
        default: 0,
        term: 1,
        isBold: false
      },
      customTermRules: {
        name: [{ required: true, message: '请输入条款名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入条款内容', trigger: 'blur' }],
      },
      //印章
      seal: {
        url: '',
        width: 120,
        height: 120,
        top: 0,
        left: 500,
      },
      // 打印设置
      printOptions: {
        topEdge: 5, //上边距 单位mm
        rightEdge: 5, //右边距 单位mm
        bottomEdge: 5, //下边距 单位mm
        leftEdge: 5, //左边距 单位mm
        isTitle: true, //是否显示主标题
        titleAlign: 'center', //主标题居中 left center right
        subTitleAlign: 'center',//副标题居中 left center right
        isTitleBold: true, //主标题是否加粗
        title: '', //主标题
        subtitle: '', //副标题
        isSubtitle: true, //是否显示副标题
        isHeader: true, //是否显示页眉
        isHeaderBold: true, //页眉是否加粗
        headerTitle: '', //页眉
        isFooter: false, //是否显示页脚
        footerTitle: '', //页脚
      },
      paperSize: [
        { value: '0001', label: 'A4（210*297mm）' },//210 297
        { value: '0002', label: '二等分（241*140）' },
        { value: '0003', label: '三等分（241*93）' },
      ],
      // 右侧一级分类
      rightMenu: [
        {
          title: '顶部信息',
          show: true,
          flag: 1,
        },
        {
          title: '表格信息',
          show: false,
          flag: 2,
        },
        {
          title: '底部信息',
          show: false,
          flag: 3,
        },
        {
          title: '自定义信息',
          show: false,
          flag: 4,
        },
        {
          title: '打印设置',
          show: false,
          flag: 0,
        },
      ],
      rightActive: 1,
      loading: false,
    }
  },
  computed: {
    // 纸张样式
    pagerStyle() {
      let topEdge = this.mmConversionPx(this.printOptions.topEdge)
      let bottomEdge = this.mmConversionPx(this.printOptions.bottomEdge)
      let leftEdge = 0,
        rightEdge = 0
      if (this.form.printPaper == '0001') {
        leftEdge = this.mmConversionPx(this.printOptions.leftEdge)
        rightEdge = this.mmConversionPx(this.printOptions.rightEdge)
      } else if (this.form.printPaper == '0002') {
        leftEdge = this.mmConversionPx(this.printOptions.leftEdge + 12)
        rightEdge = this.mmConversionPx(this.printOptions.rightEdge + 12)
      } else if (this.form.printPaper == '0003') {
        leftEdge = this.mmConversionPx(this.printOptions.leftEdge + 12)
        rightEdge = this.mmConversionPx(this.printOptions.rightEdge + 12)
      }
      let width = 0,
        height = 0
      if (this.form.printPaper == '0001') {
        width = this.mmConversionPx(210)
        height = this.mmConversionPx(297)
      } else if (this.form.printPaper == '0002') {
        width = this.mmConversionPx(241)
        height = this.mmConversionPx(140)
      } else if (this.form.printPaper == '0003') {
        width = this.mmConversionPx(241)
        height = this.mmConversionPx(93)
      }
      return {
        'padding-top': `${topEdge}px`,
        'padding-right': `${rightEdge}px`,
        'padding-bottom': `${bottomEdge}px`,
        'padding-left': `${leftEdge}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
    },
    // 计算边距
    pageEdge() {
      let topEdge = this.mmConversionPx(this.printOptions.topEdge)
      let rightEdge = this.mmConversionPx(this.printOptions.rightEdge)
      let bottomEdge = this.mmConversionPx(this.printOptions.bottomEdge)
      let leftEdge = this.mmConversionPx(this.printOptions.leftEdge)
      return {
        topEdge,
        bottomEdge,
        rightEdge,
        leftEdge,
      }
    },
    // 印章外壳大小
    parentSize() {
      let width = 750,
        height = 1000
      if (this.form.printPaper == '0001') {
        width = this.mmConversionPx(210 - this.printOptions.rightEdge - this.printOptions.leftEdge)
        height = this.mmConversionPx(297 - this.printOptions.topEdge - this.printOptions.bottomEdge)
      } else if (this.form.printPaper == '0002') {
        width = this.mmConversionPx(241 - this.printOptions.rightEdge - this.printOptions.leftEdge - 24)
        height = this.mmConversionPx(140 - this.printOptions.topEdge - this.printOptions.bottomEdge)
      } else if (this.form.printPaper == '0003') {
        width = this.mmConversionPx(241 - this.printOptions.rightEdge - this.printOptions.leftEdge - 24)
        height = this.mmConversionPx(140 - this.printOptions.topEdge - this.printOptions.bottomEdge)
      }
      return {
        width: width,
        height: height,
      }
    },
    pageTitle() {
      let title = ''
      if (this.form.printType) {
        return getTemplateName(this.form.printType) + '模板'
      }
      return title
    },
    ...mapGetters(['tagList']),
  },
  methods: {
    // 右侧展开
    togoleMenu(active, el) {
      if (this.rightActive != active && active) {
        this.rightActive = active
      }
      if (el.show) {
        el.show = false
      } else {
        this.rightMenu.forEach((item) => {
          item.show = false
        })
        el.show = true
      }
    },
    togoleMenuRight(active) {
      if (this.rightActive != active) {
        this.rightActive = active
        this.rightMenu.forEach((item) => {
          if (item.flag === this.rightActive) {
            item.show = true
          } else {
            item.show = false
          }
        })
      }
    },
    // 顶部列表添加
    addTopItem() {
      this.topForm = {
        name: '',
        desc: '',
        width: 200,
        default: 0,
        field: '',
        show: true,
      }
      this.topVisible = true
    },
    topItemChange(val, item) {
      if (val) {
        if (item.field == 'code') {
          this.imageDrag(3)
          this.$nextTick(() => {
            this.getCodeSize(1)
          })
          this.code.show = true
        } else {
          this.topData.mainList.push({
            name: item.name,
            desc: item.desc,
            default: item.default,
            field: item.field,
            width: 200,
          })
        }
      } else {
        if (item.field == 'code') {
          this.code.show = false
        } else {
          let index = this.topData.mainList.findIndex((el) => el.field == item.field)
          this.topData.mainList.splice(index, 1)
        }
      }
    },
    submitTopItem() {
      this.$refs.topForm.validate((valid) => {
        if (valid) {
          this.topForm.field = new Date().getTime()
          this.topData.rightList.push(this.topForm)
          let obg = this.deepClone(this.topForm)
          delete obg.show
          this.topData.mainList.push(obg)
          this.topVisible = false
        }
      })
    },
    // 表格表头列更新
    columnChange(val, item) {
      if (val) {
        let obj = this.deepClone(item)
        delete obj.show
        if (item.prop == 'index') {
          this.tableOptions.mainOptions.unshift(obj)
        } else {
          this.tableOptions.mainOptions.push(obj)
        }
      } else {
        let index = this.tableOptions.mainOptions.findIndex((el) => el.prop == item.prop)
        let temp = {}
        if (index > -1) {
          temp = this.tableOptions.mainOptions.splice(index, 1)
        }
      }
    },
    // 底部信息
    bttomItemChange(val, item) {
      if (val) {
        this.bottomData.mainList.push({
          name: item.name,
          desc: item.desc,
          field: item.field || '',
          default: item.default,
          width: 200,
        })
      } else {
        let index = this.bottomData.mainList.findIndex((el) => el.field == item.field)
        this.bottomData.mainList.splice(index, 1)
      }
    },
    // 自定义字段
    addCustomItem() {
      this.customForm = {
        name: '',
        desc: '',
        width: 200,
        field: '',
        default: 0,
      }
      this.customVisible = true
    },

    // 自定义条款编辑
    addCustomTerm() {
      let width = 0;
      if (this.form.printPaper == '0001') {
        width = this.mmConversionPx(210)
      } else if (this.form.printPaper == '0002') {
        width = this.mmConversionPx(241)
      } else if (this.form.printPaper == '0003') {
        width = this.mmConversionPx(241)
      }
      this.customTermForm = {
        name: '',
        desc: '',
        width: width,
        field: '',
        default: 0,
        term: 1,
        isBold: false
      }
      this.customTermVisible = true
    },
    submitCustomItem() {
      this.$refs.customForm.validate((valid) => {
        if (valid) {
          this.customForm.field = new Date().getTime()
          this.customData.mainList.push(this.customForm)
          this.customVisible = false
        }
      })
    },
    submitCustomTermItem() {
      this.$refs.customTermForm.validate((valid) => {
        if (valid) {
          this.customTermForm.field = new Date().getTime()
          this.customData.mainList.push(this.customTermForm)
          this.customTermVisible = false
        }
      })
    },

    // 印章和logo拖拽
    imageDrag(type) {
      let _this = this
      let tag = '.drag_logo'
      if (type == 1) {
        //logo
        tag = '.drag_logo'
      } else if (type == 2) {
        tag = '.drag_seal'
      } else {
        // 二维码
        tag = '.drag_code'
      }
      let obg = interact(tag)
      // 缩放
      obg.resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
          start(event) {
            // console.log(event.type, event.target);
          },
          move(event) {
            let target = event.target
            // 位置
            let x = parseInt(target.getAttribute('data-x')) || 0
            let y = parseInt(target.getAttribute('data-y')) || 0

            x += parseInt(event.deltaRect.left)
            y += parseInt(event.deltaRect.top)
            // 大小
            let w = parseInt(event.rect.width)
            let h = parseInt(event.rect.height)

            _this.setPos(type, target, x, y, w, h)
          },
        },
        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent',
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 80, height: 50 },
          }),
        ],

        inertia: true,
      })
      obg.draggable({
        listeners: {
          start(event) {
            // console.log(event.type, event.target)
          },
          end(event) { },
          move(event) {
            var target = event.target
            // 位置
            var x = (parseInt(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseInt(target.getAttribute('data-y')) || 0) + event.dy

            // 大小
            let w = parseFloat(target.getAttribute('data-w')) || event.rect.width
            let h = parseFloat(target.getAttribute('data-h')) || event.rect.height

            _this.setPos(type, target, x, y, w, h)
          },
        },
        // 启用惯性
        inertia: true,
        // autoScroll: true,
        // 将元素保持在其父元素的区域内
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: 'parent',
            endOnly: true,
          }),
        ],
      })
    },
    // 印章和logo设置位置
    setPos(type, target, x, y, w, h) {
      if (type == 1) {
        //logo
        this.logo.left = x
        this.logo.top = y
        this.logo.width = w
        this.logo.height = h
      } else if (type == 2) {
        //seal
        this.seal.left = x
        this.seal.top = y
        this.seal.width = w
        this.seal.height = h
      } else {
        // 二维码
        this.code.left = x
        this.code.top = y
        this.code.width = w
        this.code.height = h
      }
      target.style.transform = 'translate(' + x + 'px,' + y + 'px)'
      target.style.width = w + 'px'
      target.style.height = h + 'px'
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)
      target.setAttribute('data-w', w)
      target.setAttribute('data-h', h)
    },
    // 读取logo图片大小 1：已有 2:固定
    getLogoSize(type) {
      this.$nextTick(() => {
        let img_url = document.querySelector('#logo img') && document.querySelector('#logo img').src
        var img = new Image()
        img.src = img_url
        // 加载完成执行
        let _this = this
        img.onload = function () {
          if (type == 2) {
            _this.logo.width = _this.logo.height * (img.width / img.height)
          }
          _this.setPos(1, document.querySelector('#logo'), _this.logo.left, _this.logo.top, _this.logo.width, _this.logo.height)
        }
      })
    },
    // 读取印章图片大小 1：已有 2:固定
    getSealSize(type) {
      this.$nextTick(() => {
        let img_url = document.querySelector('.drag_seal img') && document.querySelector('.drag_seal img').src
        var img = new Image()
        // 改变图片的src
        img.src = img_url
        // 加载完成执行
        let _this = this
        img.onload = function () {
          if (type == 2) {
            _this.seal.width = _this.seal.height * (img.width / img.height)
            _this.seal.left = parseInt(_this.parentSize.width) - _this.seal.width - 20
          }

          _this.setPos(2, document.querySelector('.drag_seal'), _this.seal.left, _this.seal.top, _this.seal.width, _this.seal.height)
        }
      })
    },
    // 读取二维码大小 1：已有 2:固定
    getCodeSize(type) {
      this.$nextTick(() => {
        let img_url = document.querySelector('.drag_code img') && document.querySelector('.drag_code img').src
        var img = new Image()
        // 改变图片的src
        img.src = img_url
        // 加载完成执行
        let _this = this
        img.onload = function () {
          if (type == 2) {
            _this.code.width = _this.code.height * (img.width / img.height)
            _this.code.left = parseInt(_this.parentSize.width) - _this.code.width - 20
          }

          _this.setPos(2, document.querySelector('.drag_code'), _this.code.left, _this.code.top, _this.code.width, _this.code.height)
        }
      })
    },
    // 上传logo
    upLogo(links) {
      // let file = e.target.files[0]
      // if (file.type != "image/png" && file.type != "image/jpeg") {
      //   layer.msg("请上传jpg或png格式图片");
      //   return false;
      // }
      // var windowURL = window.URL || window.webkitURL
      // var dataURL = windowURL.createObjectURL(file)
      // this.logo.url = dataURL
      this.logo.url = links[0]
      this.imageDrag(1)
      this.$nextTick(() => {
        this.getLogoSize(2)
      })
    },
    // 上传印章
    upSeal(links) {
      this.seal.url = links[0]
      this.imageDrag(2)
      this.$nextTick(() => {
        this.getSealSize(2)
      })
    },

    //获取设备dpi（分辨率）px = cm/2.54*dpi
    getDPI() {
      const arrDPI = new Array()
      if (window.screen.deviceXDPI != undefined) {
        arrDPI[0] = window.screen.deviceXDPI
        arrDPI[1] = window.screen.deviceYDPI
      } else {
        const tmpNode = document.createElement('DIV')
        tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
        document.body.appendChild(tmpNode)
        arrDPI[0] = parseInt(tmpNode.offsetWidth)
        arrDPI[1] = parseInt(tmpNode.offsetHeight)
        tmpNode.parentNode.removeChild(tmpNode)
      }
      return arrDPI
    },
    //mm单位转化为像素单位
    mmConversionPx(value) {
      var inch = value / 25.4
      var c_value = inch * this.getDPI()[0]
      return c_value
    },
    deleteTag() {
      let value = '/systemSet/printTemplate/edit?id=' + this.$route.query.id
      let tag, key
      this.tagList.map((item, index) => {
        if (item.value === value) {
          tag = item
          key = index
        }
      })
      this.$store.commit('DEL_TAG', tag)
    },
    // 返回列表
    toList() {
      this.deleteTag()
      this.$router.push({
        path: '/systemSet/printTemplate/index',
      })
    },
    Submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          let obj = {
            logo: this.logo,
            seal: this.seal,
            code: this.code,
            printOptions: this.printOptions,
            topData: this.topData,
            tableOptions: this.tableOptions,
            bottomData: this.bottomData,
            customData: this.customData,
          }
          let temp = this.deepClone(this.form)
          temp.isDefult = temp.isDefult ? '1' : '0'
          temp.printTxt = JSON.stringify(obj)
          API.printsave(temp)
            .then(({ data }) => {
              if (data.code === 200) {
                this.$message.success('模板保存成功！')
              }
              this.loading = false
            })
            .catch((err) => {
              this.loading = false
            })
        }
      })
    },
    setData(printType) {
      switch (printType) {
        case '0001': //销售报价单
          // 顶部信息
          this.topData = {
            mainList: saleQutation.mainTopList,
            rightList: saleQutation.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: saleQutation.mainBottomList,
            rightList: saleQutation.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: saleQutation.mainOptions,
            rightOptions: saleQutation.rightOptions,
          }

          break
        case '0002': //框架合同
          // 顶部信息
          this.topData = {
            mainList: frameworkContract.mainTopList,
            rightList: frameworkContract.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: frameworkContract.mainBottomList,
            rightList: frameworkContract.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: frameworkContract.mainOptions,
            rightOptions: frameworkContract.rightOptions,
          }
          break
        case '0003': //销售订单
          // 顶部信息
          this.topData = {
            mainList: saleOrder.mainTopList,
            rightList: saleOrder.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: saleOrder.mainBottomList,
            rightList: saleOrder.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: saleOrder.mainOptions,
            rightOptions: saleOrder.rightOptions,
          }
          break
        case '0004': //采购询价单
          // 顶部信息
          this.topData = {
            mainList: purInquiry.mainTopList,
            rightList: purInquiry.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: purInquiry.mainBottomList,
            rightList: purInquiry.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: purInquiry.mainOptions,
            rightOptions: purInquiry.rightOptions,
          }
          break
        case '0005': //供应商报价单
          // 顶部信息
          this.topData = {
            mainList: supplierQuotation.mainTopList,
            rightList: supplierQuotation.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: supplierQuotation.mainBottomList,
            rightList: supplierQuotation.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: supplierQuotation.mainOptions,
            rightOptions: supplierQuotation.rightOptions,
          }
          break
        case '0006': //采购订单
          // 顶部信息
          this.topData = {
            mainList: purOrder.mainTopList,
            rightList: purOrder.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: purOrder.mainBottomList,
            rightList: purOrder.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: purOrder.mainOptions,
            rightOptions: purOrder.rightOptions,
          }
          break

        case '0009': //采购入库单
          // 顶部信息
          this.topData = {
            mainList: purStockIn.mainTopList,
            rightList: purStockIn.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: purStockIn.mainBottomList,
            rightList: purStockIn.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: purStockIn.mainOptions,
            rightOptions: purStockIn.rightOptions,
          }
          break
        case '0010': //采购退货单
          // 顶部信息
          this.topData = {
            mainList: purReturnGoods.mainTopList,
            rightList: purReturnGoods.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: purReturnGoods.mainBottomList,
            rightList: purReturnGoods.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: purReturnGoods.mainOptions,
            rightOptions: purReturnGoods.rightOptions,
          }
          break
        case '0011': //销售出库单
          // 顶部信息
          this.topData = {
            mainList: saleStockOut.mainTopList,
            rightList: saleStockOut.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: saleStockOut.mainBottomList,
            rightList: saleStockOut.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: saleStockOut.mainOptions,
            rightOptions: saleStockOut.rightOptions,
          }
          break
        case '0012': //销售退货单
          // 顶部信息
          this.topData = {
            mainList: saleReturnGoods.mainTopList,
            rightList: saleReturnGoods.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: saleReturnGoods.mainBottomList,
            rightList: saleReturnGoods.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: saleReturnGoods.mainOptions,
            rightOptions: saleReturnGoods.rightOptions,
          }
          break
        case '0013': //其他入库单
          // 顶部信息
          this.topData = {
            mainList: otherStockIn.mainTopList,
            rightList: otherStockIn.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: otherStockIn.mainBottomList,
            rightList: otherStockIn.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: otherStockIn.mainOptions,
            rightOptions: otherStockIn.rightOptions,
          }
          break
        case '0014': //其他出库单
          // 顶部信息
          this.topData = {
            mainList: otherStockOut.mainTopList,
            rightList: otherStockOut.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: otherStockOut.mainBottomList,
            rightList: otherStockOut.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: otherStockOut.mainOptions,
            rightOptions: otherStockOut.rightOptions,
          }
          break
        case '0015': //调拨单
          // 顶部信息
          this.topData = {
            mainList: transfer.mainTopList,
            rightList: transfer.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: transfer.mainBottomList,
            rightList: transfer.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: transfer.mainOptions,
            rightOptions: transfer.rightOptions,
          }
          break
        case '0016': //客户对账单
          // 顶部信息
          this.topData = {
            mainList: customerReconciliation.mainTopList,
            rightList: customerReconciliation.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: customerReconciliation.mainBottomList,
            rightList: customerReconciliation.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: customerReconciliation.mainOptions,
            rightOptions: customerReconciliation.rightOptions,
          }
          break
        case '0023': //来料质检单
          // 顶部信息
          this.topData = {
            mainList: incomingCheck.mainTopList,
            rightList: incomingCheck.rightTopList,
          }
          // 底部信息
          this.bottomData = {
            mainList: incomingCheck.mainBottomList,
            rightList: incomingCheck.rightBottomList,
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: incomingCheck.mainOptions,
            rightOptions: incomingCheck.rightOptions,
          }
          break
      }
    },
    getSubTitle(printType) {
      let subTitle = ''
      switch (printType) {
        case '0001': //销售报价单
          subTitle = '销售报价单'
          break
        case '0002': //框架合同
          subTitle = '框架合同'
          break
        case '0003': //销售订单
          subTitle = '销售订单'
          break
        case '0004': //采购询价单
          subTitle = '采购询价单'
          break
        case '0005': //供应商报价单
          subTitle = '供应商报价单'
          break
        case '0006': //采购订单
          subTitle = '采购订单'
          break
        case '0007': //付款申请单
          subTitle = '付款申请单'
          break
        case '0008': //预付申请单
          subTitle = '预付申请单'
          break
        case '0009': //采购入库单
          subTitle = '采购入库单'
          break
        case '0010': //采购退货单
          subTitle = '采购退货单'
          break
        case '0011': //销售出库单
          subTitle = '销售出库单'
          break
        case '0012': //销售退货单
          subTitle = '销售退货单'
          break
        case '0013': //其他入库单
          subTitle = '其他入库单'
          break
        case '0014': //其他出库单
          subTitle = '其他出库单'
          break
        case '0015': //调拨单
          subTitle = '调拨单'
          break
        case '0016': //客户对账单
          subTitle = '客户对账单'
          break
      }
      return subTitle
    },
    initShowCode(type) {
      this.topData.rightList.forEach((item) => {
        if (item.field == 'code' && item.show) {
          this.code.show = true
        }
      })
      if (this.code.show) {
        this.imageDrag(3)
        this.$nextTick(() => {
          this.getCodeSize(type)
        })
      }
    },
    // 获取公司信息
    getCompanyInfo() {
      getSysEntInfo().then(({ data }) => {
        if (data.code === 200) {
          this.printOptions.title = data.data.unitName //企业名称
          this.printOptions.subtitle = data.data.tenantOfficeAddressAll //办公地址
        }
      })
    },

    // 更新 数据
    updateTopData(originData, newData) {
      let arr = [];
      originData.forEach(item => {
        let temp = newData.find(el => el.field == item.field);
        if (temp) {
          item.show = temp.show;
          arr.push(item);
        } else {
          arr.push(item);
        }
      })
      newData.forEach(item => {
        if (item.default != 1) {
          arr.push(item)
        }
      })
      return arr;
    },
    updateTableOptions(originData, newData) {
      let arr = [];
      originData.forEach(item => {
        let temp = newData.find(el => el.prop == item.prop);
        if (temp) {
          item.show = temp.show;
          arr.push(item);
        } else {
          arr.push(item);
        }
      })
      return arr;
    },
    updateBottomData(originData, newData) {
      let arr = [];
      originData.forEach(item => {
        let temp = newData.find(el => el.field == item.field);
        if (temp) {
          item.show = temp.show;
          arr.push(item);
        } else {
          arr.push(item);
        }
      })
      newData.forEach(item => {
        if (item.default != 1) {
          arr.push(item)
        }
      })
      return arr;
    },

    updateData(printType, params) {
      switch (printType) {
        case '0001': //销售报价单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(saleQutation.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(saleQutation.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(saleQutation.rightOptions, params.tableOptions.rightOptions),
          }

          break
        case '0002': //框架合同
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(frameworkContract.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(frameworkContract.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(frameworkContract.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0003': //销售订单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(saleOrder.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(saleOrder.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(saleOrder.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0004': //采购询价单

          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(purInquiry.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(purInquiry.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(purInquiry.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0005': //供应商报价单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(supplierQuotation.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(supplierQuotation.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(supplierQuotation.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0006': //采购订单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(purOrder.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(purOrder.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(purOrder.rightOptions, params.tableOptions.rightOptions),
          }
          break

        case '0009': //采购入库单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(purStockIn.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(purStockIn.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(purStockIn.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0010': //采购退货单

          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(purReturnGoods.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(purReturnGoods.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(purReturnGoods.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0011': //销售出库单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(saleStockOut.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(saleStockOut.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(saleStockOut.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0012': //销售退货单

          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(saleReturnGoods.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(saleReturnGoods.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(saleReturnGoods.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0013': //其他入库单

          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(otherStockIn.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(otherStockIn.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(otherStockIn.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0014': //其他出库单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(otherStockOut.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(otherStockOut.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(otherStockOut.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0015': //调拨单

          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(transfer.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(transfer.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(transfer.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0016': //客户对账单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(customerReconciliation.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(customerReconciliation.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(customerReconciliation.rightOptions, params.tableOptions.rightOptions),
          }
          break
        case '0023': //来料质检单
          // 顶部信息
          this.topData = {
            mainList: params.topData.mainList,
            rightList: this.updateTopData(incomingCheck.rightTopList, params.topData.rightList),
          }
          // 底部信息
          this.bottomData = {
            mainList: params.bottomData.mainList,
            rightList: this.updateTopData(incomingCheck.rightBottomList, params.bottomData.rightList)
          }
          // 表格配置
          this.tableOptions = {
            mainOptions: params.tableOptions.mainOptions,
            rightOptions: this.updateTableOptions(incomingCheck.rightOptions, params.tableOptions.rightOptions),
          }
          break
      }
    },
    initData() {
      let printConfigId = this.$route.query.id
      if (printConfigId) {
        this.loading = true
        API.getDetails(printConfigId)
          .then(({ data }) => {
            if (data.code == 200) {
              let obj = this.deepClone(data.data)
              this.form = {
                printType: obj.printType, //	类型
                printName: obj.printName,
                isDefult: obj.isDefult == '1' ? true : false, //是否默认
                printConfigId: obj.printConfigId, //配置id
                printPaper: obj.printPaper, //模板纸张
                printTxt: '',
              }
              if (obj.printTxt) {
                let temp = JSON.parse(obj.printTxt)
                this.logo = temp.logo
                this.seal = temp.seal
                this.code = temp.code

                // this.topData = temp.topData
                // this.tableOptions = temp.tableOptions
                // this.bottomData = temp.bottomData
                this.updateData(obj.printType, temp);

              
                this.printOptions = temp.printOptions
                this.customData = temp.customData
                this.initShowCode(1)
              } else {
                this.setData(obj.printType)
                this.printOptions.headerTitle = this.getSubTitle(obj.printType)
                this.getCompanyInfo()
                this.initShowCode(2)
              }
              if (this.logo.url) {
                this.imageDrag(1)
                this.$nextTick(() => {
                  this.getLogoSize(1)
                })
              }

              if (this.seal.url) {
                this.imageDrag(2)
                this.$nextTick(() => {
                  this.getSealSize(1)
                })
              }

              this.initShowCode()

            }
            this.loading = false
          })
          .catch((err) => {
            this.loading = false
          })
      }
    },
  },
  mounted() {
    saleQutation = deepClone(saleQutation1)
    frameworkContract = deepClone(frameworkContract1)
    saleOrder = deepClone(saleOrder1)
    purInquiry = deepClone(purInquiry1)
    supplierQuotation = deepClone(supplierQuotation1)
    purOrder = deepClone(purOrder1)
    purStockIn = deepClone(purStockIn1)
    purReturnGoods = deepClone(purReturnGoods1)
    saleStockOut = deepClone(saleStockOut1)
    saleReturnGoods = deepClone(saleReturnGoods1)
    otherStockIn = deepClone(otherStockIn1)
    otherStockOut = deepClone(otherStockOut1)
    transfer = deepClone(transfer1)
    customerReconciliation = deepClone(customerReconciliation1)
    incomingCheck = deepClone(incomingCheck1)

    this.initData()
  },
}
</script>
