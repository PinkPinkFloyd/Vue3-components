<template>
  <draggable
    v-if="data.mainOptions && data.mainOptions.length > 0"
    :animation="500"
    :scroll-sensitivity="80"
    v-model="data.mainOptions"
    class="print-table flex items-start justify-start mt-2.5"
    handle=".table-column-th, .table-column-td"
    item-key="prop"
    @update="dragEnd"
  >
    <template #item="{ element: item, index }">
      <div
        class="table-column border border-gray-800 min-w-[10px] cursor-move relative -ml-px first:ml-0"
        :data-prop="item.prop"
        :style="{ width: item.width ? item.width + 'px' : 'auto' }"
        :class="[item.prop == 'index' ? '' : 'candrag', 'table-column_' + flag]"
      >
        <div @dblclick="changeTableItem($event, item)" class="table-column-th h-[30px] p-0.5 text-center bg-gray-100 border-b border-gray-800">
          <input
            @input="tableColumnInput(item)"
            @blur="tableColumnBlur"
            @keyup.enter="item.isEdit = false"
            class="print-temp-inp column w-full h-[26px] border border-blue-500 p-0"
            maxlength="20"
            v-if="item.isEdit"
            v-model="item.label"
            type="text"
          />
          <div v-else class="table-column-th-text overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer h-full leading-[26px] font-bold">
            {{ item.label }}
          </div>
        </div>
        <div class="table-column-td h-[30px] border-t border-gray-800 p-[4px_2px]" v-for="(el, key) in item.list" :key="key">
          <div :style="{ 'text-align': item.align || 'left' }" class="table-column-td-text overflow-hidden text-ellipsis whitespace-nowrap h-full leading-[22px]">
            {{ el.value }}
          </div>
        </div>
        <div class="table-column-resize w-2 absolute top-0 bottom-0 -right-1 z-10 bg-transparent flex items-center justify-center cursor-col-resize group">
          <div class="table-column-line hidden group-hover:block w-0.5 h-full bg-blue-500"></div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts">
import { nextTick, onMounted, defineProps, defineModel } from 'vue';
import draggable from 'vuedraggable';
import interact from 'interactjs';

const props = defineProps<{
  flag?: string;
}>();

const data = defineModel<{ mainOptions: any[], rightOptions: any[] }>('data', { required: true });

const dragEnd = (e: any) => {
  // e.preventDefault() // Not needed/supported in vuedraggable@next like this
};

const changeTableItem = (e: any, row: any) => {
  data.value.mainOptions.forEach((item: any) => {
    item.isEdit = false;
  });
  row.isEdit = true;
  nextTick(() => {
    let node = e.currentTarget;
    setTimeout(() => {
      let input = node.querySelector('.print-temp-inp');
      if (input) {
        input.focus();
      }
    }, 100);
  });
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

const ListWidthSize = () => {
  const selector = '.table-column_' + props.flag;
  interact(selector).resizable({
    edges: { left: false, right: true, bottom: false, top: false },
    listeners: {
      move(event: any) {
        let target = event.target;
        let w = event.rect.width;
        target.style.width = parseFloat(w.toFixed(0)) + 'px';
      },
      end(event: any) {
        let target = event.target;
        let prop = target.dataset.prop;
        let w = parseFloat(event.rect.width.toFixed(0));
        data.value.mainOptions.forEach((item: any) => {
          if (item.prop == prop) {
            item.width = w;
          }
        });
      },
    },
    modifiers: [
      interact.modifiers.restrictEdges({ outer: 'parent' }),
      interact.modifiers.restrictSize({ min: { width: 40, height: 10 } }),
    ],
    margin: 5,
    inertia: true,
  });
};

onMounted(() => {
  ListWidthSize();
});
</script>

<style scoped>
/* Scoped styles if any additional ones are needed */
</style>
