<template>
  <div class="print-upload inline-block">
    <el-upload
      ref="uploadRef"
      class="upload-design"
      :show-file-list="false"
      action="#"
      :before-upload="beforeUpload"
      :accept="acceptList.join(',')"
    >
      <slot />
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const props = withDefaults(defineProps<{
  domIdName?: string;
  acceptList?: string[];
  maxSize?: number;
  uploadFolderName?: string;
  onlyUseOSS?: boolean;
}>(), {
  domIdName: 'tt-immediate',
  acceptList: () => ['.jpg', '.jpeg', '.png', '.bmp', '.gif'],
  maxSize: 5,
  uploadFolderName: '/images/richText/',
  onlyUseOSS: false
});

const emit = defineEmits(['returnSrc']);
const uploadRef = ref();

const beforeUpload = (file: File) => {
  const suffix = file.name.substring(file.name.lastIndexOf('.'));
  if (!props.acceptList.includes(suffix.toLowerCase())) {
    ElMessage.warning(`文件 ${file.name} 文件类型不符合，请重新选择！`);
    return false;
  }
  if (file.size > props.maxSize * 1024 * 1024) {
    ElMessage.warning(`文件大小超出 ${props.maxSize}M 限制！`);
    return false;
  }

  // Mock upload success
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    emit('returnSrc', [reader.result]); // Return base64 for demo
  };
  
  return false; // Prevent default upload
};
</script>

<style scoped>
.print-upload {
  cursor: pointer;
}
</style>
