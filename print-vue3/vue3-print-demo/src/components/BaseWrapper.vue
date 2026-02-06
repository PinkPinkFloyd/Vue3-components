<template>
  <div class="base-wrapper p-4 bg-white min-h-screen">
    <div class="header flex justify-between items-center mb-4 border-b pb-2">
      <h1 class="text-xl font-bold">{{ title }}</h1>
      <div class="menu-right">
        <slot name="menuRight"></slot>
      </div>
    </div>
    <div class="menu mb-4">
      <slot name="menu"></slot>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
  loading?: boolean;
}>();
</script>
