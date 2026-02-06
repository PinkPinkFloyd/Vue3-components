<template>
  <div class="p_set p-5">
    <el-row>
      <el-col :span="24">
        <section class="p_set_tit font-bold text-sm">页边距</section>
      </el-col>
      <el-col class="p_set_nowrap flex items-center mt-4" :span="11">
        左：
        <el-input-number v-model="printOptions.leftEdge" controls-position="right" :min="0" :max="30"></el-input-number>
        <em> &ensp; </em>mm
      </el-col>
      <el-col :span="2"></el-col>
      <el-col class="p_set_nowrap flex items-center mt-4" :span="11">
        右：
        <el-input-number v-model="printOptions.rightEdge" controls-position="right" :min="0" :max="30"></el-input-number>
        <em> &ensp; </em>mm
      </el-col>
      <el-col class="p_set_nowrap flex items-center mt-4" :span="11">
        上：<el-input-number v-model="printOptions.topEdge" controls-position="right" :min="0" :max="30"></el-input-number>
        <em> &ensp; </em>mm
      </el-col>
      <el-col :span="2"></el-col>
      <el-col class="p_set_nowrap flex items-center mt-4" :span="11">
        下：<el-input-number v-model="printOptions.bottomEdge" controls-position="right" :min="0" :max="30"></el-input-number>
        <em> &ensp; </em>mm
      </el-col>
    </el-row>
    <el-row class="p_set_nowrap flex items-center mt-4">
      <el-col :span="3">
        <section class="p_set_tit font-bold text-sm">标题</section>
      </el-col>
      <el-col :span="6">
        <el-checkbox v-model="printOptions.isTitle">打印标题</el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-select v-model="printOptions.titleAlign" placeholder="请选择">
          <el-option v-for="item in alignOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <b
          @click="printOptions.isTitleBold = !printOptions.isTitleBold"
          :class="printOptions.isTitleBold ? 'text-blue-500 border-blue-500' : 'border-gray-300'"
          class="p_bold_icon text-lg border px-2 py-0.5 cursor-pointer ml-4"
          >B</b
        >
      </el-col>
    </el-row>
    <el-row class="mt-2.5">
      <el-col :span="24">
        <el-input v-model="printOptions.title" placeholder="请输入标题" maxlength="200" type="text"></el-input>
      </el-col>
    </el-row>
    <el-row class="p_set_nowrap flex items-center mt-4">
      <el-col :span="4">
        <section class="p_set_tit font-bold text-sm">副标题</section>
      </el-col>
      <el-col :span="6">
        <el-checkbox v-model="printOptions.isSubtitle">打印副标题</el-checkbox>
      </el-col>
    </el-row>
    <el-row class="mt-2.5">
      <el-col :span="24">
        <el-input v-model="printOptions.subtitle" placeholder="请输入副标题" maxlength="200" type="text"></el-input>
      </el-col>
    </el-row>
    <!-- 页眉 -->
    <el-row class="p_set_nowrap flex items-center mt-4">
      <el-col :span="3">
        <section class="p_set_tit font-bold text-sm">页眉</section>
      </el-col>
      <el-col :span="6">
        <el-checkbox v-model="printOptions.isHeader">打印页眉</el-checkbox>
      </el-col>
      <el-col :span="8">
        <el-select v-model="printOptions.subTitleAlign" placeholder="请选择">
          <el-option v-for="item in alignOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <b
          @click="printOptions.isHeaderBold = !printOptions.isHeaderBold"
          :class="printOptions.isHeaderBold ? 'text-blue-500 border-blue-500' : 'border-gray-300'"
          class="p_bold_icon text-lg border px-2 py-0.5 cursor-pointer ml-4"
          >B</b
        >
      </el-col>
    </el-row>
    <el-row class="mt-2.5">
      <el-col :span="24">
        <el-input v-model="printOptions.headerTitle" maxlength="200" placeholder="请输入页眉" type="text"></el-input>
      </el-col>
    </el-row>
    <!-- 页脚 -->
    <el-row class="p_set_nowrap flex items-center mt-4">
      <el-col :span="3">
        <section class="p_set_tit font-bold text-sm">页脚</section>
      </el-col>
      <el-col :span="5">
        <el-checkbox v-model="printOptions.isFooter">打印页脚</el-checkbox>
      </el-col>
    </el-row>
    <el-row class="mt-2.5">
      <el-col :span="24">
        <el-input v-model="printOptions.footerTitle" maxlength="200" placeholder="请输入页脚" type="text"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';

const printOptions = defineModel<any>('printOptions', { required: true });

const alignOptions = [
  { value: 'left', label: '居左' },
  { value: 'center', label: '居中' },
  { value: 'right', label: '居右' },
];
</script>
