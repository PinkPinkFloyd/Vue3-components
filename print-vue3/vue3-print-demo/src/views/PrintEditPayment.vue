<template>
  <BaseWrapper title="付款申请单模板">
    <template #menuRight>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
      <el-button @click="toList">返回列表</el-button>
    </template>
    
    <div class="p_main flex justify-between relative overflow-auto h-[calc(100vh-140px)] bg-gray-200">
       <div class="p_left flex-1 overflow-auto flex justify-center p-5">
          <div class="p_print_page bg-white relative flex flex-col shadow-lg w-[210mm] min-h-[297mm] p-10">
             <!-- Simplified View for Demo -->
             <h1 class="text-center text-xl font-bold mb-4">付款申请单</h1>
             
             <!-- Components Placeholder -->
             <div class="border border-dashed border-gray-300 p-4 mb-4 text-center text-gray-500">
                Top Info Area (PrintMenu)
             </div>
             
             <div class="border border-dashed border-gray-300 p-4 mb-4 text-center text-gray-500 h-40">
                Table Area (PrintTable)
             </div>
             
             <div class="border border-dashed border-gray-300 p-4 mb-4 text-center text-gray-500">
                Bottom Info Area (PrintMenu)
             </div>
          </div>
       </div>
       
       <div class="p_right w-[300px] bg-white border-l border-gray-200 p-4">
          <h3 class="font-bold mb-4">Settings</h3>
          <p class="text-sm text-gray-600">This page logic is similar to PrintEdit.vue but for Payment templates.</p>
       </div>
    </div>
  </BaseWrapper>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import BaseWrapper from '@/components/BaseWrapper.vue';

const router = useRouter();

const handleSubmit = () => {
    ElMessage.success('保存成功 (Mock)');
};

const toList = () => {
    router.push('/systemSet/printTemplate/index');
};
</script>
