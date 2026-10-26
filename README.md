# Print Studio · Vue 3 打印模板工作台

从真实业务打印模块中抽离的 Vue 3 Demo。仓库保留 `print-vue3/vue2老组件` 作为迁移对照；可运行项目位于 `print-vue3/vue3-print-demo`。

## 功能

- 模板中心：销售、采购、财务、仓储分类，名称搜索、分页、创建、复制、删除及按单据类型设置默认模板。
- 六种完整样例：销售报价单、销售订单、采购订单、付款申请单、预付申请单和销售出库单。
- 单据工作台：企业抬头、客户或供应商信息、产品明细、金额税额、备注、商务条款和双方签字区。
- 付款单包含审批流程、关联订单和可调整的申请比例；明细、订单和申请金额同步计算。
- 示例数据 / 字段模式切换，画布缩放，区域联动配置，字段显示、拖动排序与双击编辑。
- 明细列勾选、表头拖动排序、列边界拖动调宽、列标题修改和示例行数设置。
- 企业 LOGO、二维码和印章图片上传、拖动、缩放及移除。
- A4、二等分和三等分版式，主题色、字号、页边距与单页溢出提示。
- 无辅助线打印预览，调用浏览器打印 / 另存为 PDF；打印样式隐藏工作台与配置面板。
- 模板通过 localStorage 保存到当前浏览器，刷新后可恢复；未保存修改离开时提示。

## 本地运行

```bash
cd print-vue3/vue3-print-demo
npm install
npm run dev
```

Vite 的基础路径为 `/Vue3-components/`，本地地址见终端输出。

```bash
npm run build
```

构建包含 `vue-tsc` 类型检查。GitHub Pages 工作流通过推送 main 发布 `dist`。

## 结构

- `src/views/`：列表、通用单据和付款单路由，保留原有入口。
- `src/components/TemplateCatalog.vue`：模板中心及列表操作。
- `src/components/TemplateEditor.vue`：编辑状态、画布缩放、预览和打印。
- `src/components/TemplateInspector.vue`：字段、表格、条款、图片与版式配置。
- `src/components/PrintDocument.vue`：编辑画布、预览和打印共用的单据布局。
- `src/components/DocumentFields.vue`、`DocumentTable.vue`、`DocumentAsset.vue`：字段排序、明细列交互与图片拖拽缩放。
- `src/composables/useTemplates.ts`：本地持久化与默认模板管理。
- `src/data/printTemplates.ts`、`src/types/print.ts`：业务样例和类型定义。

旧版的 PrintMenu、PrintTable、PrintSet 等组件仍保留在源码中，供重构对照；新页面使用共享的 Document 组件。

## 使用说明

所有公司、联系人、账户和产品数据均为虚构示例，不会调用后端或发送业务数据。图片使用浏览器 FileReader 读取，不会上传外部服务。数据保存在当前浏览器和站点地址下，清理浏览器数据会移除本地模板。

样例按单页单据设计，A4 最多展示 6 行，二等分最多 2 行，三等分最多 1 行。联单使用紧凑版式并省略长条款；切换纸张会应用对应的字号和页边距。自定义内容超过单页时，画布提示调整。完整多页明细分页不在本 Demo 范围内。

在 Chrome / Edge 中使用打印功能，选择实际纸张尺寸，关闭浏览器自带页眉页脚；可选择“另存为 PDF”。最终分页以浏览器打印预览为准。
