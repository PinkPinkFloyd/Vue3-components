<!--
 * @Author: sunsumin
 * @Date: 2023-04-12 16:29:25
 * @LastEditTime: 2023-05-30 17:51:45
 * @LastEditors: sunsumin
 * @Description: 拖拽上传图片
 * @FilePath: uploadImg.vue
 * Copyright (c) 2023 by Suzhou Tiantian, All Rights Reserved. 
-->
<template>
  <div class="print-upload">
    <el-upload
      ref="upload"
      class="upload-design"
      :show-file-list="false"
      action=""
      :http-request="httpRequest"
      :before-upload="beforeUpload"
      :accept="acceptList.join(',')"
    >
    <slot/>
    </el-upload>
  </div>
</template>

<script>
// 获取sts授权
import {
  getOSSSTS,
  getAttachName, // 获取唯一名称
} from '@/api/oss'
const OSS = require('ali-oss')
import { getStore } from '@/util/store'
export default {
  props: {
    // 上传按钮 DomID
    domIdName: {
      type: String,
      default: 'tt-immediate',
      require: true,
    },
    acceptList: {
      type: Array,
      default: () => {
        return ['.jpg', '.jpeg', '.png', '.bmp', '.gif']
      },
    },
    // 文件上传最大大小
    maxSize: {
      type: Number,
      default: 5,
    },
    uploadFolderName: {
      type: String,
      default: '/images/richText/',
    },
    // 没有点击事件，直接走oss上传
    onlyUseOSS: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    ossFiles: {
      handler(arr) {
        if (arr && arr.length > 0) {
          this.$emit('returnSrc', JSON.parse(JSON.stringify(arr)))
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      // oss上传地址
      ossLink: `tenant/${getStore({ name: 'tenantId' })}${this.uploadFolderName}`,
      // "tenant/" + getStore({ name: "tenantId" }) + "/images/richText/",
      stsOption: {
        accessKeyId: '',
        accessKeySecret: '',
        stsToken: '',
        region: '',
        bucket: '',
      },
      uploadingImg: false,
      ossFiles: [],
    }
  },
  methods: {
    // 获取oss授权信息
    async getSTS(file) {
      try {
        const { data: res } = await getOSSSTS()
        const data = res.data
        if (res.code === 200) {
          this.stsOption.accessKeyId = data.accessKeyId
          this.stsOption.accessKeySecret = data.accessKeySecret
          this.stsOption.stsToken = data.securityToken
          this.stsOption.region = data.region
          this.stsOption.bucket = data.bucket

          // 更换文件名
          this.generateId(1).then(async (data) => {
            const path = this.ossLink + data[0] + '.' + this.getExt(file.name.toLowerCase())
            this.ossFiles = []
            this.handleUpload(path, file)
          })
        } else {
          this.$message.error('获取 STS 授权失败，请联系管理员！')
        }
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 上传文件处理

    async httpRequest(e) {
      const file = e.file
      await this.getSTS(file)
    },
    beforeUpload(file) {
      let self = this
      if (!file) {
        return false
      }
      const suffix = self.getExt(file.name.toLowerCase())
      if (self.acceptList.indexOf('.' + suffix) === -1) {
        self.$message.warning(`文件 ${file.name} 文件类型不符合，请重新选择！`)
        return false
      }
      if (file.size > self.maxSize * 1024 * 1024) {
        self.$message.warning(
          `文件 ${file.name} 大小为 ${(parseInt(file.size) / 1024 / 1024).toFixed(2)}M 超出上传限制，请选择小于 ${maxSize} M 的文件！`
        )
        return false
      }
    },

    // 获取文件后缀
    getExt(fileName) {
      return fileName.substring(fileName.lastIndexOf('.') + 1)
    },
    async generateId(num) {
      let generateId = []
      if (num && num > 0) {
        let response = await getAttachName(num)
        let data = response.data.data
        if (response.data.code == 200) {
          generateId = data
        } else {
          this.$message.error('获取唯一 ID 失败，请联系管理员！')
        }
      }
      return generateId
    },
    // 上传
    async handleUpload(path, file) {
      const self = this
      const ossClient = new OSS(self.stsOption)
      try {
        await ossClient
          .multipartUpload(path, file, {
            progress(percentage) {
              // todo 优化图片上传时页面loading提示
              // this.uploadingImg = true;
              // progress[file.uid] = 100 - Math.ceil(percentage * 100);
              // pgress.value = 100 - Math.ceil(percentage * 100);
            },
          })
          .then(function (resp) {
            // 非手动上传
            if (!self.onlyUseOSS) {
              self.$refs['upload'].clearFiles()
            }
            if (resp.res.status === 200) {
              const link = `https://${resp.bucket}.oss-cn-hangzhou.aliyuncs.com/${resp.name}`
              self.ossFiles = [link]
            } else {
              self.$message.error('上传失败')
            }
          })
          .catch(function (err) {
            self.$loading().close()
            console.log('OSS上传失败：', err)
            self.$message.error('OSS上传失败')
          })
      } catch (e) {
        self.$loading().close()
        console.log('发生异常：', e)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.print-upload{

}
</style>
