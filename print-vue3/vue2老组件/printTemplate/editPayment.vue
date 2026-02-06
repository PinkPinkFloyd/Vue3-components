<!--
 * @Author: sunsumin
 * @Date: 2023-05-29 17:36:07
 * @LastEditTime: 2024-07-29 13:22:24
 * @LastEditors: sunsumin
 * @Description: 付款单
 * @FilePath: editPayment.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
  <base-wrapper v-loading="loading" :title="pagerTitle.header">
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
            </div>
            <!-- 顶部信息 -->
            <printMenu flag='e' @click.native="togoleMenuRight(1)" :class="rightActive == 1 ? 'p_left_active' : ''"
              :data="topData" />
            <!-- 审批信息 -->
            <printMenu flag='h' @click.native="togoleMenuRight(6)" :class="rightActive == 6 ? 'p_left_active' : ''"
              :data="approvalData" />
            <!-- 单据信息 -->
            <div class="p_table-title">{{ pagerTitle.note }}</div>
            <printTable flag='a' @click.native="togoleMenuRight(2)" :class="rightActive == 2 ? 'p_left_active' : ''"
              :data="noteOptions" />
            <!-- 明细信息 -->
            <div class="p_table-title">明细信息</div>
            <printTable flag='b' @click.native="togoleMenuRight(3)" :class="rightActive == 3 ? 'p_left_active' : ''"
              :data="detailOptions" />
            <!-- 底部信息 -->
            <printMenu flag='g' @click.native="togoleMenuRight(4)" :class="rightActive == 4 ? 'p_left_active' : ''"
              :data="bottomData" />
          </div>
          <!-- 印章 -->
          <div :class="rightActive == 5 ? 'p_left_active' : ''" class="p_print_seal_box">
            <!-- 自定义条款 -->
            <printMenu flag='kk' @click.native="togoleMenuRight(5)" :data="customData" />
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
          <div v-if="form.printPaper == '0002'" :style="{ width: mmConversionPx(12) + 'px' }"
            class="paper-lace paper-lace-left"></div>
          <div v-if="form.printPaper == '0002'" :style="{ width: mmConversionPx(12) + 'px' }"
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
                <div class="p_right_table" v-if="item.flag == 6">
                  <section :key="key" v-for="(el, key) in approvalData.rightList">
                    <el-checkbox @change="approvalItemChange($event, el)" v-model="el.show">
                      {{ el.name }}
                    </el-checkbox>
                  </section>
                </div>
                <div class="p_right_table" v-if="item.flag == 2">
                  <section :key="key" v-for="(el, key) in noteOptions.rightOptions">
                    <el-checkbox @change="noteColumnChange($event, el)" v-model="el.show">
                      {{ el.label }}
                    </el-checkbox>
                  </section>
                </div>
                <div class="p_right_table" v-if="item.flag == 3">
                  <section :key="key" v-for="(el, key) in detailOptions.rightOptions">
                    <el-checkbox @change="detailColumnChange($event, el)" v-model="el.show">
                      {{ el.label }}
                    </el-checkbox>
                  </section>
                </div>
                <div class="p_right_table" v-if="item.flag == 4">
                  <section :key="key" v-for="(el, key) in bottomData.rightList">
                    <el-checkbox @change="bttomItemChange($event, el)" v-model="el.show">
                      {{ el.name }}
                    </el-checkbox>
                  </section>
                </div>

                <div class="p_right_table" v-if="item.flag == 5">
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
import * as API from '@/api/systemSet/printTemplate.js'
import { getSysEntInfo } from '@/api/baseDocument/entsetting/companyInfo'
// 付款申请单
import paymentApplication1 from '@/const/printTemplate/paymentApplication'
// 预付申请单
import addAdvancePayment1 from '@/const/printTemplate/addAdvancePayment'

import { deepClone } from '@/util/util.js';
let paymentApplication = deepClone(paymentApplication1)
let addAdvancePayment = deepClone(addAdvancePayment1)

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
      // 单据表格信息
      noteOptions: {
        mainOptions: [],
        rightOptions: [],
      },
      // 明细表格信息
      detailOptions: {
        mainOptions: [],
        rightOptions: [],
      },
      // 底部信息
      bottomData: {
        mainList: [],
        rightList: [],
      },
      // 审批信息
      approvalData: {
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
        { value: '0001', label: 'A4（210*297mm）' },
        { value: '0002', label: '二等分（241*140）' },
      ],
      // 右侧一级分类
      rightMenu: [
        {
          title: '顶部信息',
          show: true,
          flag: 1,
        },
        {
          title: '审批信息',
          show: false,
          flag: 6,
        },
        {
          title: '单据表格信息',
          show: false,
          flag: 2,
        },
        {
          title: '明细表格信息',
          show: false,
          flag: 3,
        },
        {
          title: '底部信息',
          show: false,
          flag: 4,
        },
        {
          title: '自定义信息',
          show: false,
          flag: 5,
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
      } else {
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
      }
      return {
        width: width,
        height: height,
      }
    },
    pagerTitle() {
      let temp = {
        header: '',
        note: '',
      }
      switch (this.form.printType) {
        case '0007': //付款申请单
          temp = {
            header: '付款申请单模板',
            note: '发票信息',
          }
          break
        case '0008': //预付申请单
          temp = {
            header: '预付申请单模板',
            note: '订单信息',
          }
          break

        default:
          temp = {
            header: '',
            note: '',
          }
          break
      }
      return temp
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
        this.topData.mainList.push({
          name: item.name,
          desc: item.desc,
          default: item.default,
          field: item.field,
          width: 200,
        })
      } else {
        let index = this.topData.mainList.findIndex((el) => el.field == item.field)
        this.topData.mainList.splice(index, 1)
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
    // 单据表格表头列更新
    noteColumnChange(val, item) {
      if (val) {
        let obj = this.deepClone(item)
        delete obj.show
        if (item.prop == 'index') {
          this.noteOptions.mainOptions.unshift(obj)
        } else {
          this.noteOptions.mainOptions.push(obj)
        }
      } else {
        let index = this.noteOptions.mainOptions.findIndex((el) => el.prop == item.prop)
        let temp = {}
        if (index > -1) {
          temp = this.noteOptions.mainOptions.splice(index, 1)
        }
      }
    },
    // 明细表格表头列更新
    detailColumnChange(val, item) {
      if (val) {
        let obj = this.deepClone(item)
        delete obj.show
        if (item.prop == 'index') {
          this.detailOptions.mainOptions.unshift(obj)
        } else {
          this.detailOptions.mainOptions.push(obj)
        }
      } else {
        let index = this.detailOptions.mainOptions.findIndex((el) => el.prop == item.prop)
        let temp = {}
        if (index > -1) {
          temp = this.detailOptions.mainOptions.splice(index, 1)
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
    // 审批信息
    approvalItemChange(val, item) {
      if (val) {
        this.approvalData.mainList.push({
          name: item.name,
          desc: item.desc,
          field: item.field || '',
          default: item.default,
          width: 550,
        })
      } else {
        let index = this.approvalData.mainList.findIndex((el) => el.field == item.field)
        this.approvalData.mainList.splice(index, 1)
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
      } else {
        tag = '.drag_seal'
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
            let x = parseFloat(target.getAttribute('data-x')) || 0
            let y = parseFloat(target.getAttribute('data-y')) || 0

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
            min: { width: 100, height: 50 },
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
            var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
            var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

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
      } else {
        //seal
        this.seal.left = x
        this.seal.top = y
        this.seal.width = w
        this.seal.height = h
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
      let value = '/systemSet/printTemplate/editPayment?id=' + this.$route.query.id
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
            printOptions: this.printOptions,
            topData: this.topData,
            noteOptions: this.noteOptions,
            detailOptions: this.detailOptions,
            bottomData: this.bottomData,
            customData: this.customData,
            approvalData: this.approvalData,
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
        case '0007': //付款申请单
          // 顶部信息
          this.topData = {
            mainList: paymentApplication.mainTopList,
            rightList: paymentApplication.rightTopList,
          }
          // 单据表格信息
          this.noteOptions = {
            mainOptions: paymentApplication.mainNoteOptions,
            rightOptions: paymentApplication.rightNoteOptions,
          }
          // 明细表格信息
          this.detailOptions = {
            mainOptions: paymentApplication.mainDetailOptions,
            rightOptions: paymentApplication.rightDetailOptions,
          }
          // 底部信息
          this.bottomData = {
            mainList: paymentApplication.mainBottomList,
            rightList: paymentApplication.rightBottomList,
          }
          // 审批信息
          this.approvalData = {
            mainList: paymentApplication.mainApprovalList,
            rightList: paymentApplication.rightApprovalList,
          }

          break
        case '0008': //预付申请单
          // 顶部信息
          this.topData = {
            mainList: addAdvancePayment.mainTopList,
            rightList: addAdvancePayment.rightTopList,
          }
          // 单据表格信息
          this.noteOptions = {
            mainOptions: addAdvancePayment.mainNoteOptions,
            rightOptions: addAdvancePayment.rightNoteOptions,
          }
          // 明细表格信息
          this.detailOptions = {
            mainOptions: addAdvancePayment.mainDetailOptions,
            rightOptions: addAdvancePayment.rightDetailOptions,
          }
          // 底部信息
          this.bottomData = {
            mainList: addAdvancePayment.mainBottomList,
            rightList: addAdvancePayment.rightBottomList,
          }
          // 审批信息
          this.approvalData = {
            mainList: addAdvancePayment.mainApprovalList,
            rightList: addAdvancePayment.rightApprovalList,
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
      }
      return subTitle
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

                this.topData = temp.topData
                this.printOptions = temp.printOptions

                this.noteOptions = temp.noteOptions
                this.detailOptions = temp.detailOptions

                this.bottomData = temp.bottomData
                this.customData = temp.customData
                this.approvalData = temp.approvalData;
              } else {
                this.setData(obj.printType)
                this.printOptions.headerTitle = this.getSubTitle(obj.printType)
                this.getCompanyInfo()
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
    paymentApplication = deepClone(paymentApplication1)
    addAdvancePayment = deepClone(addAdvancePayment1)
    this.initData()
  },
}
</script>

