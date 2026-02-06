<template>
  <BaseWrapper title="打印模板设置">
    <template #menuRight>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </template>
    <div class="print-temp flex items-start h-[calc(100vh-100px)]">
      <div class="temp-left w-[200px] border-r border-gray-200 pr-2">
        <div class="temp-left-input p-2">
          <el-input placeholder="模板分类" suffix-icon="Search" maxlength="50" v-model="filterText"></el-input>
        </div>
        <div class="h-[calc(100%-60px)] overflow-auto">
          <el-tree 
            ref="treeRef"
            :data="categoryList"
            node-key="type"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="nodeClick"
            highlight-current
          />
        </div>
      </div>
      <div class="temp-right flex-1 p-4 overflow-hidden flex flex-col">
        <div class="temp-right-head mb-4">
          <el-form :inline="true" :model="form">
            <el-form-item label="模板名称">
              <el-input v-model="form.printName" placeholder="模板名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        
        <div class="mb-2">
          <el-button type="text" @click="handleSetDefault">设为默认</el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleDelete">删除</el-button>
          <el-divider direction="vertical" />
          <el-button type="text" @click="handleCopy">复制</el-button>
        </div>

        <el-table
          ref="tableRef"
          :data="tableData"
          border
          stripe
          class="flex-1"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column type="index" label="序号" width="60" align="center" />
          <el-table-column prop="printTypeName" label="单据类型" min-width="160" align="center" />
          <el-table-column label="模板名称" min-width="180">
            <template #default="{ row }">
              <span class="text-blue-500 cursor-pointer" @click="toDetails(row)">{{ row.printName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="printPaperName" label="纸张类型" min-width="120" align="center" />
          <el-table-column label="默认模板" min-width="100" align="center">
            <template #default="{ row }">
              <span v-if="row.isDefult == '1'" class="text-green-500">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100" align="center">
            <template #default="{ row }">
              <el-button type="primary" link @click="openRelate('customer', row)">关联客户</el-button>
            </template>
          </el-table-column>
        </el-table>
        
        <div class="mt-4 flex justify-end">
          <el-pagination
            v-model:current-page="page.currentPage"
            v-model:page-size="page.pageSize"
            :page-sizes="[50, 100, 200]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- Create/Copy Dialog -->
    <el-dialog :title="isEdit ? '复制打印模板' : '创建打印模板'" v-model="visible" width="470px">
      <el-form ref="ruleFormRef" :model="addForm" :rules="rules" label-width="90px">
        <el-form-item label="模板类型" prop="templateType">
          <el-select v-model="addForm.templateType" :disabled="isEdit" class="w-full">
            <el-option label="简易模板" value="0001" />
            <el-option label="自定义模板" value="0002" />
          </el-select>
        </el-form-item>
        <el-form-item label="模板名称" prop="printName">
          <el-input v-model="addForm.printName" maxlength="50" />
        </el-form-item>
        <el-form-item label="单据类型" prop="printType">
          <el-select v-model="addForm.printType" :disabled="isEdit" class="w-full">
             <el-option v-for="item in noteTypes" :key="item.type" :label="item.name" :value="item.type" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.templateType == '0001'" label="纸张类型" prop="printPaper">
          <el-select v-model="addForm.printPaper" :disabled="canPaper || isEdit" class="w-full">
            <el-option label="A4（210*297mm）" value="0001" />
            <el-option label="二等分（241*140）" value="0002" />
            <el-option label="三等分（241*93）" value="0003" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">确定</el-button>
      </template>
    </el-dialog>
  </BaseWrapper>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import BaseWrapper from '@/components/BaseWrapper.vue';
import { usePublicMixins } from '@/composables/usePublicMixins';

const router = useRouter();
const { customerOpts, getStationCustomer } = usePublicMixins();

const categoryList = [
  { type: '1', name: '全部', children: [] },
  { type: '2', name: '销售管理', children: [
      { name: '销售报价单', type: '0001' },
      { name: '框架合同', type: '0002' },
      { name: '销售订单', type: '0003' },
      { name: '客户对账单', type: '0016' },
  ]},
  { type: '3', name: '采购管理', children: [
      { name: '采购询价单', type: '0004' },
      { name: '供应商报价单', type: '0005' },
      { name: '采购订单', type: '0006' },
      { name: '付款申请单', type: '0007' },
      { name: '预付申请单', type: '0008' },
  ]},
  // ... other categories simplified for demo
];

const filterText = ref('');
const treeRef = ref();
const tableRef = ref();
const tableData = ref<any[]>([]);
const selected = ref<any[]>([]);
const visible = ref(false);
const isEdit = ref(false);

const form = reactive({
  printName: '',
  printType: '',
  pageSize: 50,
  pageNum: 1
});

const page = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 50
});

const addForm = reactive({
  templateType: '0001',
  printType: '',
  printName: '',
  printPaper: '0001',
  isDefult: '0',
  printTxt: ''
});

const rules = {
  templateType: [{ required: true, message: '请选择模板类型', trigger: 'change' }],
  printType: [{ required: true, message: '请选择单据类型', trigger: 'change' }],
  printName: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
};

const noteTypes = computed(() => {
  let arr: any[] = [];
  categoryList.forEach((item: any) => {
    if (item.children) arr.push(...item.children);
  });
  return arr;
});

const canPaper = computed(() => {
  const arr = ['0009', '0010', '0011', '0012', '0013', '0014', '0015'];
  return arr.includes(addForm.printType);
});

watch(filterText, (val) => {
  treeRef.value?.filter(val);
});

const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.name.includes(value);
};

const nodeClick = (data: any) => {
  if (!data.children) {
    form.printType = data.type;
    handleSearch();
  } else if (data.type === '1') {
    form.printType = '';
    handleSearch();
  }
};

const handleSearch = () => {
  page.currentPage = 1;
  getList();
};

const handleReset = () => {
  form.printName = '';
  handleSearch();
};

const getList = () => {
  // Mock API call
  tableData.value = [
    { 
        printConfigId: '1', 
        printTypeName: '销售报价单', 
        printName: 'Demo Template 1', 
        printPaperName: 'A4', 
        isDefult: '1', 
        printType: '0001',
        printPaper: '0001'
    },
    { 
        printConfigId: '2', 
        printTypeName: '付款申请单', 
        printName: 'Payment Demo', 
        printPaperName: '二等分', 
        isDefult: '0', 
        printType: '0007',
        printPaper: '0002'
    }
  ];
  page.total = 2;
};

const handleAdd = () => {
  isEdit.value = false;
  visible.value = true;
  Object.assign(addForm, {
    templateType: '0001',
    printType: '',
    printName: '',
    printPaper: '0001',
    isDefult: '0',
    printTxt: ''
  });
};

const handleSave = () => {
  // Mock save
  ElMessage.success('Saved successfully (Mock)');
  visible.value = false;
  
  if (!isEdit.value) {
      toDetails({ 
          printConfigId: 'new-id', 
          printType: addForm.printType, 
          templateType: addForm.templateType,
          printPaper: addForm.printPaper
      });
  }
};

const handleCopy = () => {
  if (selected.value.length !== 1) {
    ElMessage.warning('请选择一行模板进行复制');
    return;
  }
  isEdit.value = true;
  const temp = selected.value[0];
  Object.assign(addForm, temp);
  addForm.printName += ' (Copy)';
  visible.value = true;
};

const handleDelete = () => {
  if (selected.value.length === 0) return;
  ElMessageBox.confirm('确认删除?', '提示').then(() => {
    ElMessage.success('Deleted (Mock)');
  });
};

const handleSetDefault = () => {
  if (selected.value.length !== 1) return;
  ElMessage.success('Set as default (Mock)');
};

const handleSelectionChange = (val: any[]) => {
  selected.value = val;
};

const handleSizeChange = (val: number) => {
  page.pageSize = val;
  getList();
};

const handleCurrentChange = (val: number) => {
  page.currentPage = val;
  getList();
};

const toDetails = (row: any) => {
  if (row.templateType == '0002') {
    // Custom logic
  } else {
    if (row.printType == '0007' || row.printType == '0008') {
      router.push({
        path: '/systemSet/printTemplate/editPayment',
        query: { id: row.printConfigId }
      });
    } else {
      router.push({
        path: '/systemSet/printTemplate/edit',
        query: { id: row.printConfigId }
      });
    }
  }
};

const openRelate = (type: string, row: any) => {
  ElMessage.info(`Open relation for ${type} (Mock)`);
};

onMounted(() => {
  getList();
  getStationCustomer();
});
</script>
