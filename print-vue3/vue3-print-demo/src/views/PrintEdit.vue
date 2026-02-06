<template>
  <BaseWrapper :title="pageTitle">
    <template #menuRight>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
      <el-button @click="toList">返回列表</el-button>
    </template>
    <template #menu>
      <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="模板名称" prop="printName">
              <el-input v-model="form.printName" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="纸张类型" prop="printPaper">
              <el-select v-model="form.printPaper" disabled>
                <el-option v-for="(item, index) in paperSize" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="默认模板" prop="isDefult">
              <el-switch v-model="form.isDefult" active-color="#13ce66" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <div class="p_main flex justify-between relative overflow-auto h-[calc(100vh-140px)] bg-gray-200">
      <div class="p_left flex-1 overflow-auto flex justify-center p-5">
        <div :style="pagerStyle" class="p_print_page bg-white relative flex flex-col shadow-lg">
          <div>
            <!-- Header -->
            <div :style="{ textAlign: printOptions.titleAlign } as any" class="p_left_head relative text-center">
              <div>
                <div v-if="printOptions.isTitle" :style="{ fontWeight: printOptions.isTitleBold ? 'bold' : 'normal' }" class="text-lg mb-1">
                  {{ printOptions.title }}
                </div>
                <div v-if="printOptions.isSubtitle" class="text-sm mb-1">
                  {{ printOptions.subtitle }}
                </div>
                <div v-if="printOptions.isHeader" :style="{ fontWeight: printOptions.isHeaderBold ? 'bold' : 'normal', textAlign: printOptions.subTitleAlign } as any" class="text-lg">
                  {{ printOptions.headerTitle }}
                </div>
              </div>
              
              <!-- Logo Drag -->
              <div v-if="logo.url" class="drag_logo absolute border border-transparent hover:border-dashed hover:border-blue-500 box-border z-10" id="logo" :data-x="logo.left" :data-y="logo.top" :style="{ transform: `translate(${logo.left}px, ${logo.top}px)`, width: `${logo.width}px`, height: `${logo.height}px` }">
                <img :src="logo.url" class="w-full h-full" />
              </div>
              <!-- Code Drag -->
              <div v-if="code.show" class="drag_code absolute border border-transparent hover:border-dashed hover:border-blue-500 box-border z-10" id="code" :data-x="code.left" :data-y="code.top" :style="{ transform: `translate(${code.left}px, ${code.top}px)`, width: `${code.width}px`, height: `${code.height}px` }">
                <img :src="code.url" class="w-full h-full" />
              </div>
            </div>

            <!-- Components -->
            <PrintMenu flag="a" @click="rightActive = 1" :class="rightActive == 1 ? 'bg-blue-50' : ''" v-model:data="topData" />
            <PrintTable flag="d" @click="rightActive = 2" :class="rightActive == 2 ? 'bg-blue-50' : ''" v-model:data="tableOptions" />
            <PrintMenu flag="b" @click="rightActive = 3" :class="rightActive == 3 ? 'bg-blue-50' : ''" v-model:data="bottomData" />
          </div>

          <!-- Seal Area -->
          <div :class="rightActive == 4 ? 'bg-blue-50' : ''" class="flex-1 relative" @click="rightActive = 4">
             <PrintMenu flag="kk" v-model:data="customData" />
             <div v-if="seal.url" class="drag_seal absolute border border-transparent hover:border-dashed hover:border-blue-500 box-border z-10" id="seal" :data-x="seal.left" :data-y="seal.top" :style="{ transform: `translate(${seal.left}px, ${seal.top}px)`, width: `${seal.width}px`, height: `${seal.height}px` }">
                <div class="relative w-full h-full group">
                   <i class="el-icon-close absolute -top-2 -right-2 bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer hidden group-hover:flex" @click="seal.url = ''">x</i>
                   <img :src="seal.url" class="w-full h-full" />
                </div>
             </div>
          </div>

          <!-- Footer -->
          <div class="text-center text-xs mt-auto">
            <span v-if="printOptions.isFooter">{{ printOptions.footerTitle }} &ensp;</span>第1页/共1页
          </div>
        </div>
      </div>

      <!-- Right Menu -->
      <div class="p_right w-[430px] bg-white border-l border-gray-200 overflow-y-auto">
        <section v-for="(item, index) in rightMenu" :key="index" class="border-b border-gray-100">
          <div @click="toggleMenu(item.flag, item)" class="p_right_tit cursor-pointer bg-gray-50 h-10 line-height-10 px-5 flex items-center font-bold text-sm">
            <i :class="item.show ? '-rotate-90' : ''" class="transition-transform mr-2">▼</i>
            {{ item.title }}
          </div>
          <div v-show="item.show" class="p-4">
             <!-- Top Info -->
             <div v-if="item.flag == 1" class="flex flex-wrap">
                <div v-for="(el, key) in topData.rightList" :key="key" class="w-1/3 mb-2">
                   <el-checkbox v-model="el.show" @change="topItemChange($event, el)">{{ el.name }}</el-checkbox>
                </div>
                <div class="w-full mt-4">
                   <el-button link type="primary" @click="addTopItem">+ 添加字段</el-button>
                   <UploadImg class="ml-4" @returnSrc="upLogo">
                      <el-button link type="primary">+ 添加LOGO</el-button>
                   </UploadImg>
                </div>
             </div>
             <!-- Table Info -->
             <div v-if="item.flag == 2" class="flex flex-wrap">
                <div v-for="(el, key) in tableOptions.rightOptions" :key="key" class="w-1/3 mb-2">
                   <el-checkbox v-model="el.show" @change="columnChange($event, el)">{{ el.label }}</el-checkbox>
                </div>
             </div>
             <!-- Bottom Info -->
             <div v-if="item.flag == 3" class="flex flex-wrap">
                <div v-for="(el, key) in bottomData.rightList" :key="key" class="w-1/3 mb-2">
                   <el-checkbox v-model="el.show" @change="bottomItemChange($event, el)">{{ el.name }}</el-checkbox>
                </div>
             </div>
             <!-- Custom Info -->
             <div v-if="item.flag == 4" class="flex flex-wrap">
                <div class="w-full">
                   <el-button link type="primary" @click="addCustomItem">+ 添加字段</el-button>
                   <el-button link type="primary" @click="addCustomTerm">+ 添加自定义条款</el-button>
                   <UploadImg class="ml-4" @returnSrc="upSeal">
                      <el-button link type="primary">+ 添加盖章</el-button>
                   </UploadImg>
                </div>
             </div>
             <!-- Setting -->
             <PrintSet v-if="item.flag == 0" v-model:printOptions="printOptions" />
          </div>
        </section>
      </div>
    </div>

    <!-- Dialogs reuse logic from PrintMenu but simpler here for top/custom items addition -->
    <!-- Note: PrintMenu has its own dialogs for editing, this is for adding -->
    <el-dialog title="添加字段" v-model="addItemVisible" width="40%">
        <el-form :model="addItemForm" label-width="80px">
            <el-form-item label="字段名称">
                <el-input v-model="addItemForm.name"></el-input>
            </el-form-item>
            <el-form-item label="字段内容">
                <el-input v-model="addItemForm.desc"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="addItemVisible = false">取消</el-button>
            <el-button type="primary" @click="submitAddItem">确定</el-button>
        </template>
    </el-dialog>

  </BaseWrapper>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import interact from 'interactjs';
import BaseWrapper from '@/components/BaseWrapper.vue';
import PrintMenu from '@/components/PrintMenu.vue';
import PrintTable from '@/components/PrintTable.vue';
import PrintSet from '@/components/PrintSet.vue';
import UploadImg from '@/components/UploadImg.vue';
import { getTemplateName } from '@/const/hiprintTemplate';
import { deepClone } from '@/utils/util';

// Mock imports for template data
import { 
    getCommonFields, 
    getTopTableFields, 
    getGroupTableFields,
    getTableFields 
} from '@/const/hiprintTemplate';

const route = useRoute();
const router = useRouter();

const form = reactive({
  printType: '',
  printName: '',
  isDefult: false,
  printConfigId: '',
  printPaper: '0001',
  printTxt: ''
});

const rules = {
  printName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
  printPaper: [{ required: true, message: '请选择纸张类型', trigger: 'change' }]
};

const paperSize = [
  { value: '0001', label: 'A4（210*297mm）' },
  { value: '0002', label: '二等分（241*140）' },
  { value: '0003', label: '三等分（241*93）' },
];

const printOptions = reactive({
  topEdge: 5, rightEdge: 5, bottomEdge: 5, leftEdge: 5,
  isTitle: true, titleAlign: 'center', subTitleAlign: 'center', isTitleBold: true,
  title: '', subtitle: '', isSubtitle: true,
  isHeader: true, isHeaderBold: true, headerTitle: '',
  isFooter: false, footerTitle: ''
});

const logo = reactive({ url: '', width: 180, height: 60, top: 10, left: 10 });
const code = reactive({ url: '/img/code.png', width: 80, height: 80, top: 0, left: 0, show: false });
const seal = reactive({ url: '', width: 120, height: 120, top: 0, left: 500 });

const topData = reactive({ mainList: [] as any[], rightList: [] as any[] });
const tableOptions = reactive({ mainOptions: [] as any[], rightOptions: [] as any[] });
const bottomData = reactive({ mainList: [] as any[], rightList: [] as any[] });
const customData = reactive({ mainList: [] as any[], rightList: [] as any[] });

const rightActive = ref(1);
const rightMenu = reactive([
  { title: '顶部信息', show: true, flag: 1 },
  { title: '表格信息', show: false, flag: 2 },
  { title: '底部信息', show: false, flag: 3 },
  { title: '自定义信息', show: false, flag: 4 },
  { title: '打印设置', show: false, flag: 0 },
]);

const addItemVisible = ref(false);
const addItemType = ref(''); // 'top' | 'custom' | 'customTerm'
const addItemForm = reactive({ name: '', desc: '', width: 200, field: '', default: 0, show: true });

const pageTitle = computed(() => {
    return form.printType ? getTemplateName(form.printType) + '模板' : '模板编辑';
});

// DPI util
const getDPI = () => {
    // Mock DPI
    return [96, 96]; 
}

const mmConversionPx = (value: number) => {
    var inch = value / 25.4;
    var c_value = inch * getDPI()[0];
    return c_value;
}

const pagerStyle = computed(() => {
    // Simplified logic
    let width = form.printPaper == '0001' ? mmConversionPx(210) : mmConversionPx(241);
    let height = form.printPaper == '0001' ? mmConversionPx(297) : mmConversionPx(140);
    return {
        paddingTop: `${mmConversionPx(printOptions.topEdge)}px`,
        paddingRight: `${mmConversionPx(printOptions.rightEdge)}px`,
        paddingBottom: `${mmConversionPx(printOptions.bottomEdge)}px`,
        paddingLeft: `${mmConversionPx(printOptions.leftEdge)}px`,
        width: `${width}px`,
        height: `${height}px`
    };
});

const toggleMenu = (flag: number, item: any) => {
    if (rightActive.value != flag && flag !== 0) {
        rightActive.value = flag;
    }
    rightMenu.forEach(m => m.show = false);
    item.show = true;
};

const topItemChange = (val: any, item: any) => {
    if (val) {
        if(item.field === 'code') {
            code.show = true;
            nextTick(() => imageDrag('.drag_code', code));
        } else {
            topData.mainList.push({ ...item, width: 200 });
        }
    } else {
        if(item.field === 'code') {
            code.show = false;
        } else {
            const idx = topData.mainList.findIndex((el: any) => el.field === item.field);
            if(idx > -1) topData.mainList.splice(idx, 1);
        }
    }
};

const columnChange = (val: any, item: any) => {
    if (val) {
        tableOptions.mainOptions.push({ ...item });
    } else {
        const idx = tableOptions.mainOptions.findIndex((el: any) => el.prop === item.prop);
        if(idx > -1) tableOptions.mainOptions.splice(idx, 1);
    }
};

const bottomItemChange = (val: any, item: any) => {
    if(val) {
        bottomData.mainList.push({ ...item, width: 200 });
    } else {
        const idx = bottomData.mainList.findIndex((el: any) => el.field === item.field);
        if(idx > -1) bottomData.mainList.splice(idx, 1);
    }
}

const addTopItem = () => {
    addItemType.value = 'top';
    Object.assign(addItemForm, { name: '', desc: '', width: 200, field: '', default: 0, show: true });
    addItemVisible.value = true;
};

const addCustomItem = () => {
    addItemType.value = 'custom';
    Object.assign(addItemForm, { name: '', desc: '', width: 200, field: '', default: 0, show: true });
    addItemVisible.value = true;
};

const addCustomTerm = () => {
    // Logic for custom term
    addItemType.value = 'customTerm';
    // ...
    addItemVisible.value = true;
}

const submitAddItem = () => {
    const item = { ...addItemForm, field: String(Date.now()) };
    if (addItemType.value === 'top') {
        topData.rightList.push(item);
        topData.mainList.push({ ...item }); // Also add to main for display
    } else if (addItemType.value === 'custom') {
        customData.mainList.push(item);
    }
    addItemVisible.value = false;
};

const upLogo = (links: string[]) => {
    logo.url = links[0];
    nextTick(() => imageDrag('.drag_logo', logo));
};

const upSeal = (links: string[]) => {
    seal.url = links[0];
    nextTick(() => imageDrag('.drag_seal', seal));
};

const imageDrag = (selector: string, dataObj: any) => {
    interact(selector).draggable({
        listeners: {
            move(event: any) {
                dataObj.left = (dataObj.left || 0) + event.dx;
                dataObj.top = (dataObj.top || 0) + event.dy;
            }
        },
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        inertia: true
    }).resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
            move(event: any) {
                dataObj.width = event.rect.width;
                dataObj.height = event.rect.height;
                dataObj.left += event.deltaRect.left;
                dataObj.top += event.deltaRect.top;
            }
        }
    });
};

const handleSubmit = () => {
    ElMessage.success('保存成功 (Mock)');
};

const toList = () => {
    router.push('/systemSet/printTemplate/index');
};

const initData = () => {
    const id = route.query.id;
    if (id) {
        // Mock fetch details
        form.printType = '0001';
        form.printName = 'Demo Template';
        
        // Mock populate lists based on printType (simplified)
        // In real migration, use setData logic from edit.vue
        topData.rightList = [
            { name: '客户名称', field: 'customerName', show: true, desc: '@客户名称' },
            { name: '单据编号', field: 'quotationCode', show: true, desc: '@单据编号' },
            { name: '二维码', field: 'code', show: false, desc: '@二维码' }
        ];
        topData.mainList = deepClone(topData.rightList.filter(i => i.show));
        
        tableOptions.rightOptions = [
            { label: '产品名称', prop: 'productName', show: true },
            { label: '数量', prop: 'qty', show: true }
        ];
        tableOptions.mainOptions = deepClone(tableOptions.rightOptions.filter(i => i.show));
        // Add fake list data for table columns
        tableOptions.mainOptions.forEach(op => {
            op.list = [{ value: '@' + op.label }];
        });
        
        printOptions.title = '销售报价单';
    }
};

onMounted(() => {
    initData();
});
</script>

<style scoped>
/* Add any necessary styles, mostly Tailwind used */
</style>
