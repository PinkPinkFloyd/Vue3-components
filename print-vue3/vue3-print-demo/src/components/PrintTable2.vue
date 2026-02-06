<template>
  <div>
    <el-table
      border
      :data="data.tableData"
      style="width: 100%"
      @header-dragend="headerDragend"
      header-row-class-name="print-table-header"
      class="print-temp-table"
      ref="tableRef"
    >
      <template v-for="(item, index) in data.mainOptions" :key="index">
        <el-table-column 
          :prop="item.prop" 
          :label="item.label" 
          :width="item.width" 
          :align="item.align || 'center'"
        >
          <template #header>
            <input
              @input="tableColumnInput(item)"
              @blur="tableColumnBlur"
              @keyup.enter="item.isEdit = false"
              class="print-temp-inp column w-full border border-blue-500"
              maxlength="10"
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

<script setup lang="ts">
import { ref, onMounted, nextTick, defineProps, defineModel } from 'vue';
import Sortable from 'sortablejs';
import type { ElTable } from 'element-plus';

const data = defineModel<{ mainOptions: any[], tableData: any[], rightOptions: any[] }>('data', { required: true });
const tableRef = ref<InstanceType<typeof ElTable>>();

const headerDragend = (newWidth: number, oldWidth: number, column: any) => {
  data.value.mainOptions.forEach((item: any) => {
    if (item.prop == column.property) item.width = newWidth;
  });
  let differ = newWidth - oldWidth;
  let arr = data.value.mainOptions;
  if(arr.length > 1) {
      arr.forEach((item: any) => {
        item.width = parseInt(String(item.width - differ / (arr.length - 1)));
      });
  }
  
  nextTick(() => {
    columnDrop();
  });
};

const columnDrop = () => {
  const wrapperTr = document.querySelector('.el-table__header-wrapper thead tr');
  if (!wrapperTr) return;
  
  Sortable.create(wrapperTr as HTMLElement, {
    animation: 180,
    delay: 0,
    onEnd: ({ newIndex, oldIndex }: any) => {
      if (newIndex === undefined || oldIndex === undefined) return;
      
      const movedItem = data.value.mainOptions.splice(oldIndex, 1)[0];
      data.value.mainOptions.splice(newIndex, 0, movedItem);
      
      // Force refresh
      const newArray = data.value.mainOptions.slice(0);
      data.value.mainOptions = [];
      nextTick(() => {
        data.value.mainOptions = newArray;
        tableRef.value?.doLayout();
      });
    },
  });
};

const changeTableItem = (row: any) => {
  data.value.mainOptions.forEach((item: any) => {
    item.isEdit = false;
  });
  row.isEdit = true;
};

const tableColumnInput = (item: any) => {
  let temp = data.value.rightOptions.find((el: any) => item.prop == el.prop);
  if (temp) temp.label = item.label;
};

const tableColumnBlur = () => {
  data.value.mainOptions.forEach((item: any) => {
    item.isEdit = false;
  });
};

onMounted(() => {
  columnDrop();
});
</script>
