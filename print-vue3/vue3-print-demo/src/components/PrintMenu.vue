<template>
  <div :style="{ height: flag == 'kk' ? '100%' : 'auto' }">
    <draggable 
      v-if="data.mainList && data.mainList.length > 0" 
      :animation="500" 
      :scroll-sensitivity="80" 
      v-model="data.mainList"
      class="p_head_list flex flex-wrap" 
      :class="flag == 'kk' ? 'custom h-full' : ''" 
      item-key="field"
      handle=".p_head_item_drag"
    >
      <template #item="{ element: item, index }">
        <div 
          @dblclick="editItem($event, index, item)" 
          class="p_head_item relative border border-transparent hover:border-dashed hover:border-blue-500 cursor-move pr-1.5" 
          :style="{ width: item.width ? item.width + 'px' : '200px', height: item.height ? item.height + 'px' : 'auto' }"
          :data-field="item.field" 
          :class="['p_head_item_' + flag]"
        >
          <div class="p_head_item_drag">
            <div v-if="item.isEdit" class="print-temp-inp-box w-full flex items-center justify-center">
              <input 
                @input="itemInput(item)" 
                @blur="itemBlur" 
                @keyup.enter="item.isEdit = false" 
                class="print-temp-inp w-full border border-blue-500 py-[1px]" 
                maxlength="20" 
                v-model="item.name" 
                type="text" 
              />
            </div>
            <div class="p_head_item_term" v-else-if="item.term == 1">
              <div :style="{ fontWeight: item.isBold ? 'bold' : '' }">{{ item.name }}：</div>
              <span v-html="submitText(item.desc)"></span>
            </div>
            <span v-else class="block break-all max-w-full cursor-pointer">{{ item.name }}：{{ item.desc }}</span>
          </div>
          <i 
            @click="deleteItem(index, item)" 
            v-if="item.default == 0" 
            class="el-icon-close close absolute -top-2 -right-2 bg-gray-300 rounded-full text-gray-600 cursor-pointer z-30 text-xs w-3.5 h-3.5 flex items-center justify-center hidden group-hover:flex"
          >x</i>
        </div>
      </template>
    </draggable>

    <el-dialog title="编辑字段" v-model="visible" width="40%">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item style="margin-top: 10px" label="字段名称：" prop="name">
          <el-input maxlength="20" placeholder="字段名称" type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 10px" label="字段内容：" prop="desc">
          <el-input maxlength="500" placeholder="字段内容" type="text" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">取消</el-button>
          <el-button type="primary" @click="submitItem">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="编辑条款" v-model="termVisible" width="40%">
      <el-form :model="termForm" :rules="termRules" ref="termFormRef" label-width="80px">
        <el-form-item style="margin-top: 10px" label="条款名称：" prop="name">
          <div class="flex w-full">
             <el-input style="width: calc(100% - 40px);" :class="termForm.isBold ? 'font-bold' : ''" maxlength="20" placeholder="条款名称" type="text" v-model="termForm.name"></el-input>
             <b @click="termForm.isBold = !termForm.isBold" :class="termForm.isBold ? 'text-blue-500 border-blue-500' : 'border-gray-300'" class="p_term_bold_icon ml-2.5 border text-center leading-7 w-[30px] cursor-pointer inline-block align-middle h-7">B</b>
          </div>
        </el-form-item>
        <el-form-item style="margin-top: 10px" label="条款内容：" prop="desc">
          <el-input show-word-limit rows="5" maxlength="500" placeholder="条款内容" type="textarea" v-model="termForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="termVisible = false">取消</el-button>
          <el-button type="primary" @click="submitTermItem">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, defineProps, defineModel } from 'vue';
import draggable from 'vuedraggable';
import interact from 'interactjs';
import type { FormInstance } from 'element-plus';

const props = defineProps<{
  flag?: string;
}>();

const data = defineModel<{ mainList: any[], rightList: any[] }>('data', { required: true });

const visible = ref(false);
const termVisible = ref(false);
const formRef = ref<FormInstance>();
const termFormRef = ref<FormInstance>();
const addIndex = ref(0);

const form = reactive({
  name: '',
  desc: '',
  width: 200,
  default: 0,
  field: '',
  show: true,
});

const termForm = reactive({
  name: '',
  desc: '',
  width: 200,
  default: 0,
  field: '',
  show: true,
  term: 1,
  isBold: false
});

const rules = {
  name: [{ required: true, message: '请输入字段名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入字段内容', trigger: 'blur' }],
};

const termRules = {
  name: [{ required: true, message: '请输入条款名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入条款内容', trigger: 'blur' }],
};

const itemInput = (item: any) => {
  let temp = data.value.rightList.find((el: any) => item.desc == el.desc);
  if (temp) temp.name = item.name;
};

const itemBlur = () => {
  data.value.mainList.forEach((item: any) => {
    item.isEdit = false;
  });
};

const deleteItem = (index: number, item: any) => {
  data.value.mainList.splice(index, 1);
  let newIndex = data.value.rightList.findIndex((el: any) => el.field == item.field);
  if (newIndex > -1) {
    data.value.rightList.splice(newIndex, 1);
  }
};

const editItem = (e: any, index: number, row: any) => {
  if (row.default == 1) {
    data.value.mainList.forEach((item: any) => {
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
  } else if (row.term == 1) {
    addIndex.value = index;
    Object.assign(termForm, JSON.parse(JSON.stringify(row)));
    termForm.isBold = !!row.isBold;
    termVisible.value = true;
  } else {
    addIndex.value = index;
    Object.assign(form, JSON.parse(JSON.stringify(row)));
    visible.value = true;
  }
};

const submitItem = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      data.value.mainList.splice(addIndex.value, 1, JSON.parse(JSON.stringify(form)));
      let newIndex = data.value.rightList.findIndex((el: any) => form.field == el.field);
      if (newIndex !== -1) {
         data.value.rightList.splice(newIndex, 1, JSON.parse(JSON.stringify(form)));
      }
      visible.value = false;
    }
  });
};

const submitTermItem = () => {
  termFormRef.value?.validate((valid) => {
    if (valid) {
      data.value.mainList.splice(addIndex.value, 1, JSON.parse(JSON.stringify(termForm)));
      let newIndex = data.value.rightList.findIndex((el: any) => termForm.field == el.field);
      if (newIndex !== -1) {
          data.value.rightList.splice(newIndex, 1, JSON.parse(JSON.stringify(termForm)));
      }
      termVisible.value = false;
    }
  });
};

const submitText = (text: string) => {
  if (!text) return '';
  let arr: string[] = [];
  text.split('\n').forEach(item => arr.push(`<div>${item.trim()}</div>`));
  return arr.join('');
};

const ListWidthSize = () => {
  const selector = '.p_head_item_' + props.flag;
  interact(selector).resizable({
    edges: { left: false, right: true, bottom: props.flag == 'kk', top: false },
    listeners: {
      move(event: any) {
        let target = event.target;
        let w = event.rect.width;
        let h = event.rect.height;
        target.style.width = parseFloat(w.toFixed(0)) + 'px';
        target.setAttribute('data-w', parseFloat(w.toFixed(0)));
        if (props.flag == 'kk') {
          target.style.height = parseFloat(h.toFixed(2)) + 'px';
          target.setAttribute('data-h', parseFloat(h.toFixed(0)));
        }
      },
      end(event: any) {
        let target = event.target;
        let field = target.dataset.field;
        let w = parseFloat(event.rect.width.toFixed(0));
        let h = parseFloat(event.target.offsetHeight.toFixed(0));
        if (props.flag == 'kk') {
          h = parseFloat(event.rect.height.toFixed(0));
        }
        data.value.mainList.forEach((item: any) => {
          if (item.field == field) {
            item.width = w;
            if (props.flag == 'kk') {
              item.height = h;
            }
          }
        });
      },
    },
    modifiers: [
      interact.modifiers.restrictEdges({ outer: 'parent' }),
      interact.modifiers.restrictSize({ min: { width: 40, height: 20 } }),
    ],
    inertia: true,
  });
};

onMounted(() => {
  ListWidthSize();
});
</script>

<style scoped>
.p_head_item:hover .close {
  display: flex;
}
</style>
