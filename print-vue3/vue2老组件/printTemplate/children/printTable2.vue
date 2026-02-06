<!--
 * @Author: sunsumin
 * @Date: 2023-05-31 13:03:59
 * @LastEditTime: 2023-05-31 16:09:11
 * @LastEditors: sunsumin
 * @Description: 打印模板-表格
 * @FilePath: printTable.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
  <div>
    <el-table
      :header-cell-style="{ 'text-align': 'center' }"
      border
      :data="data.tableData"
      style="width: 100%"
      @header-dragend="headerDragend"
      header-row-class-name="print-table-header"
      class="print-temp-table p_head_list"
      ref="table"
    >
      <template v-for="(item, index) in data.mainOptions">
        <!-- 索引 -->
        <el-table-column :key="index" :prop="item.prop" :label="item.label" :width="item.width" :align="item.align || 'center'">
          <!--   :type="item.prop == 'index' ? 'index' : ''" -->
          <!-- 自定义表头 -->
          <template slot="header">
            <input
              @input="tableColumnInput(item)"
              @blur="tableColumnBlur"
              @keyup.enter="
                item.isEdit = false
                $forceUpdate()
              "
              class="print-temp-inp column"
              :maxlength="10"
              v-if="item.isEdit"
              v-model="item.label"
              type="text"
            />
            <div v-else @dblclick="changeTableItem(item)" style="cursor: pointer">
              {{ item.label }}
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import draggable from 'vuedraggable'
import interact from 'interactjs'
export default {
  components: {
    draggable,
  },
  props: {
    data: Object, //tableData mainOptions  rightOptions
  },
  model: {
    prop: 'data',
  },
  data() {
    return {
    
    }
  },
  methods: {
    // 当拖动表头改变了列的宽度
    headerDragend(newWidth, oldWidth, column, event) {
      this.data.mainOptions.forEach((item) => {
        if (item.prop == column.property) item.width = newWidth
      })
      let differ = newWidth - oldWidth
      let arr = this.data.mainOptions
      arr.forEach((item, index) => {
        item.width = parseInt(item.width - differ / (arr.length - 1))
      })
      // 动完拖拽排序失效，再次执行
      this.$nextTick(() => {
        // this.rowDrop()
        this.columnDrop()
      })
    },
    //列拖拽
    columnDrop() {
      let wrapperTr = document.querySelector('.el-table__header-wrapper thead tr')
      let _this = this
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: ({ newIndex, oldIndex }) => {
          //   let arr = _this.options.filter((item) => item.show);
          // newIndex = _this.options.findIndex((item) => item == arr[newIndex]);
          // oldIndex = _this.options.findIndex((item) => item == arr[oldIndex]);
          // _this.options.splice(
          //   newIndex,
          //   0,
          //   _this.options.splice(oldIndex, 1)[0]
          // );
          // var newArray = _this.options.slice(0);
          // _this.options = [];
          // _this.$nextTick(function () {
          //   _this.options = newArray;
          // });

           _this.data.mainOptions.splice(newIndex, 0, _this.data.mainOptions.splice(oldIndex, 1)[0])
          var newArray = _this.data.mainOptions.slice(0)
          _this.data.mainOptions = []
          _this.$nextTick(function () {
            _this.data.mainOptions = newArray
            this.$refs['table'].doLayout()
          })

        //   this.$nextTick(() => {
        //     const oldItem = _this.data.mainOptions[oldIndex]
        //     _this.data.mainOptions.splice(oldIndex, 1)
        //     _this.data.mainOptions.splice(newIndex, 0, oldItem)
        //     console.log(_this.data.mainOptions)
        //     _this.$refs['table'].doLayout()
        //   })
        },
      })
    },
    //行拖拽
    rowDrop() {
      let tbody = document.querySelector('.el-table__body-wrapper tbody')
      let _this = this
      Sortable.create(tbody, {
        animation: 180,
        delay: 0,
        onEnd({ newIndex, oldIndex }) {
          // const currRow = _this.tableData[oldIndex];
          // const currNewRow = _this.tableData[newIndex];
          // let temp = JSON.parse(JSON.stringify(_this.tableData));
          // temp.splice(oldIndex, 1, currNewRow);
          // temp.splice(newIndex, 1, currRow);
          // _this.$set(_this, "tableData", temp);
          // _this.$refs["print_row3"].doLayout();

          _this.tableData.splice(newIndex, 0, _this.tableData.splice(oldIndex, 1)[0])
          var newArray = _this.tableData.slice(0)
          _this.tableData = []
          _this.$nextTick(function () {
            _this.tableData = newArray
          })
        },
      })
    },
    changeTableItem(row) {
      this.data.mainOptions.forEach((item) => {
        item.isEdit = false
      })
      row.isEdit = true
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
  },
  mounted() {
    this.rowDrop()
    this.columnDrop()

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
