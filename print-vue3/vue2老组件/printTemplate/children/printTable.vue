<!--
 * @Author: sunsumin
 * @Date: 2023-05-31 13:03:59
 * @LastEditTime: 2023-06-10 12:53:05
 * @LastEditors: sunsumin
 * @Description: 打印模板-表格
 * @FilePath: printTable.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
  <draggable
    v-if="data.mainOptions.length > 0"
    draggable=".candrag"
    :animation="500"
    :ScrollSensitivity="80"
    v-model="data.mainOptions"
    class="print-table"
    :handle="['.table-column-td','.table-column-th']"
    @update="dragEnd($event)"
    tag="div"
  >
    <div
      class="table-column"
      :data-prop="item.prop"
      :style="{ width: item.width ? item.width + 'px' : 'auto' }"
      v-for="(item, index) in data.mainOptions"
      :key="index"
      :class="[item.prop == 'index' ? '' : 'candrag','table-column_'+flag]"
     
    >
      <div @dblclick="changeTableItem($event, item)" class="table-column-th">
        <input
          @input="tableColumnInput(item)"
          @blur="tableColumnBlur"
          @keyup.enter="
            item.isEdit = false
            $forceUpdate()
          "
          class="print-temp-inp column"
          :maxlength="20"
          v-if="item.isEdit"
          v-model="item.label"
          type="text"
        />
        <div v-else class="table-column-th-text">
          {{ item.label }}
        </div>
      </div>
      <div class="table-column-td" v-for="(el, key) in item.list" :key="key">
        <div :style="{ 'text-align': item.align || 'left' }" class="table-column-td-text">{{ el.value }}</div>
      </div>
      <div class="table-column-resize">
        <div class="table-column-line"></div>
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import interact from 'interactjs'
export default {
  components: {
    draggable,
  },
  props: {
    data: Object, // mainOptions  rightOptions
    flag: {
      type: String,
      default: ()=>''
    },
  },
  model: {
    prop: 'data',
  },
  methods: {
    dragEnd(e) {
      e.preventDefault()
    },
    changeTableItem(e, row) {
      this.data.mainOptions.forEach((item) => {
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
    },
    tableColumnInput(item) {
      let temp = this.data.rightOptions.find((el) => item.prop == el.prop)
      temp.label = item.label
    },
    tableColumnBlur() {
      this.data.mainOptions.forEach((item) => {
        item.isEdit = false
      })
      this.$forceUpdate()
    },
    ListWidthSize() {
      let _this = this
      let obg = interact('.table-column_'+_this.flag)
      // 缩放
      obg.resizable({
        // resize from all edges and corners
        edges: { left: false, right: true, bottom: false, top: false },

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
            // target.style.height = parseFloat(h.toFixed(0)) + 'px'

            // target.setAttribute('data-w', parseFloat(w.toFixed(2)))
            // target.setAttribute('data-h', parseFloat(h.toFixed(2)))
          },
          end(event) {
            let target = event.target
            let prop = target.dataset.prop
            let w = parseFloat(event.rect.width.toFixed(0))
            _this.data.mainOptions.forEach((item) => {
              if (item.prop == prop) {
                item.width = w
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
            min: { width: 40, height: 10 },
          }),
        ],
        margin:5,
        inertia: true,
      })
    },
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

<style>
</style>
