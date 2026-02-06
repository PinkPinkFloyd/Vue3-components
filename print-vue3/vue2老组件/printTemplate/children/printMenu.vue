<!--
 * @Author: sunsumin
 * @Date: 2023-05-31 13:05:44
 * @LastEditTime: 2023-12-19 15:08:50
 * @LastEditors: sunsumin
 * @Description: 打印模板自定义菜单项
 * @FilePath: printMenu.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
  <div :style="{ height: flag == 'kk' ? '100%' : 'auto' }">
    <draggable v-if="data.mainList.length > 0" :animation="500" :ScrollSensitivity="80" v-model="data.mainList"
      class="p_head_list" :class="flag == 'kk' ? 'custom' : ''" tag="div" handle=".p_head_item_drag">
      <div @dblclick="editItem($event, index, item)" class="p_head_item" v-for="(item, index) in data.mainList"
        :key="index"
        :style="{ width: item.width ? item.width + 'px' : '200px', height: item.height ? item.height + 'px' : 'auto' }"
        :data-field="item.field" :class="['p_head_item_' + flag]">
        <div class="p_head_item_drag">
          <div v-if="item.isEdit" class="print-temp-inp-box">
            <input @input="itemInput(item)" @blur="itemBlur" @keyup.enter="
              item.isEdit = false
            $forceUpdate()
              " class="print-temp-inp" :maxlength="20" v-model="item.name" type="text" />
          </div>
          <div class="p_head_item_term" v-else-if="item.term == 1">
            <div :style="{ fontWeight: item.isBold ? 'bold' : '' }">{{ item.name }}：</div>
            <span v-html="submitText(item.desc)">
            </span>
          </div>
          <span v-else>{{ item.name }}：{{ item.desc }}</span>
        </div>
        <i @click="deleteItem(index, item)" v-if="item.default == 0" class="el-icon-close close"></i>
      </div>
    </draggable>
    <el-dialog v-dialogDrag title="编辑字段" :visible.sync="visible" :close-on-click-modal="false" width="40%">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item style="margin-top: 10px" label="字段名称：" prop="name">
          <el-input v-strim :maxlength="20" placeholder="字段名称" type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px" label="字段内容：" prop="desc">
          <el-input v-strim :maxlength="500" placeholder="字段内容" type="text" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="
          visible = false
        $refs.form.clearValidate()
          ">取消</el-button>
        <el-button type="primary" @click="submitItem">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="编辑条款" :visible.sync="termVisible" :close-on-click-modal="false" width="40%">
      <el-form :model="termForm" :rules="termRules" ref="termForm" label-width="80px">
        <el-form-item style="margin-top: 10px" label="条款名称：" prop="name">
          <el-input style="width: calc(100% - 40px);" :class="termForm.isBold ? 'p_term_bold' : ''" v-strim
            :maxlength="20" placeholder="条款名称" type="text" v-model="termForm.name"></el-input>
          <b @click="termForm.isBold = !termForm.isBold" :class="termForm.isBold ? 'active' : ''"
            class="p_term_bold_icon">B</b>
        </el-form-item>
        <el-form-item style="margin-top: 10px" label="条款内容：" prop="desc">
          <el-input v-strim show-word-limit rows="5" :maxlength="500" placeholder="条款内容" type="textarea"
            v-model="termForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="
          termVisible = false
        $refs.termForm.clearValidate()
          ">取消</el-button>
        <el-button type="primary" @click="submitTermItem">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import interact from 'interactjs'
export default {
  components: {
    draggable,
  },
  props: {
    data: Object,
    flag: {
      type: String,
      default: () => '',
    },
  },
  model: {
    prop: 'data', //mainList  rightList
  },
  data() {
    return {
      addIndex: 0,
      visible: false,
      form: {
        name: '',
        desc: '',
        width: 200,
        default: 0,
        field: '',
        show: true,
      },
      rules: {
        name: [{ required: true, message: '请输入字段名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入字段内容', trigger: 'blur' }],
      },
      termVisible: false,
      termForm: {
        name: '',
        desc: '',
        width: 200,
        default: 0,
        field: '',
        show: true,
        term: 1,
        isBold: false
      },
      termRules: {
        name: [{ required: true, message: '请输入条款名称', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入条款内容', trigger: 'blur' }],
      },
    }
  },
  methods: {
    itemInput(item) {
      let temp = this.data.rightList.find((el) => item.desc == el.desc)
      temp.name = item.name
    },
    itemBlur() {
      this.data.mainList.forEach((item) => {
        item.isEdit = false
      })

      this.$forceUpdate()
    },
    deleteItem(index, item) {
      this.data.mainList.splice(index, 1)
      let newIndex = this.data.rightList.findIndex((el) => el.field == item.field)
      if (newIndex > -1) {
        this.data.rightList.splice(newIndex, 1)
      }
    },
    editItem(e, index, row) {
      if (row.default == 1) {
        this.data.mainList.forEach((item) => {
          item.isEdit = false
        })
        row.isEdit = true
        this.$nextTick(() => {
          let node = e.currentTarget
          setTimeout(() => {
            let input = node.querySelector('.print-temp-inp')
            if (input) {
              input.focus()
            }
          }, 100)
        })
        this.$forceUpdate()
      } else if (row.term == 1) {
        this.addIndex = index
        row.isBold = row.isBold ? true : false;
        this.termForm = JSON.parse(JSON.stringify(row))
        this.termVisible = true
      } else {
        this.addIndex = index
        this.form = JSON.parse(JSON.stringify(row))
        this.visible = true
      }
    },
    submitItem() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.data.mainList.splice(this.addIndex, 1, this.form)

          let newIndex = this.data.rightList.findIndex((el) => this.form.field == el.field)
          this.data.rightList.splice(newIndex, 1, this.form)
          this.visible = false
        }
      })
    },
    submitTermItem() {
      this.$refs.termForm.validate((valid) => {
        if (valid) {
          this.data.mainList.splice(this.addIndex, 1, this.termForm)

          let newIndex = this.data.rightList.findIndex((el) => this.termForm.field == el.field)
          this.data.rightList.splice(newIndex, 1, this.termForm)
          this.termVisible = false
        }
      })
    },
    ListWidthSize() {
      let _this = this
      let obg = interact('.p_head_item_' + this.flag)
      // 缩放
      obg.resizable({
        // resize from all edges and corners
        edges: { left: false, right: true, bottom: _this.flag == 'kk' ? true : false, top: false },
        listeners: {
          start(event) {
            // console.log(event.type, event.target);
          },
          move(event) {
            let target = event.target
            // 大小
            let w = event.rect.width
            let h = event.rect.height
            target.style.width = parseFloat(w.toFixed(0)) + 'px'

            target.setAttribute('data-w', parseFloat(w.toFixed(0)))
            if (_this.flag == 'kk') {//自定义高度拖动的大小，其他auto
              target.style.height = parseFloat(h.toFixed(2)) + 'px'
              target.setAttribute('data-h', parseFloat(h.toFixed(0)))
            }

          },
          end(event) {
            let target = event.target
            let field = target.dataset.field
            let w = parseFloat(event.rect.width.toFixed(0))
            let h = parseFloat(event.target.offsetHeight.toFixed(0));
            if (_this.flag == 'kk') {
              h = parseFloat(event.rect.height.toFixed(0));
            }
            _this.data.mainList.forEach((item) => {
              if (item.field == field) {
                item.width = w;
                if (_this.flag == 'kk') {
                  item.height = h;
                }

              }
            })
          },
        },
        modifiers: [
          //  不能拖出上级元素
          interact.modifiers.restrictEdges({
            outer: 'parent',
          }),
          // 设置最小值
          interact.modifiers.restrictSize({
            min: { width: 40, height: 20 },
          }),
        ],
        margin: 5,

        inertia: true,
      })
    },
    submitText(text) {
      let arr = [];
      text.split('\n').forEach(item => arr.push(`<div>${item.trim()}</div>`));
      // return arr.join('<br>');
      return arr.join('');
    }





  },
  mounted() {
    this.ListWidthSize()
    // 火狐浏览器拖拽需要阻止默认事件
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
}
</script>

<style></style>
