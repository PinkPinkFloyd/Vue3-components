<script setup lang="ts">
import StudioIcon from '@/components/StudioIcon.vue'
</script>
<template>
  <div class="studio-app">
    <header class="studio-header no-print">
      <RouterLink class="studio-brand" to="/"
        ><span class="brand-mark"><StudioIcon name="print" :size="22" /></span
        ><span>Print<span class="brand-light"> Studio</span></span></RouterLink
      >
      <nav class="studio-nav">
        <RouterLink to="/systemSet/printTemplate/index"
          ><StudioIcon name="grid" :size="16" />模板中心</RouterLink
        >
      </nav>
    </header>
    <RouterView />
  </div>
</template>
