# Vue 3 Print Components

一个从实际业务打印模块中抽离出来的 Vue 3 打印模板 Demo，覆盖打印模板管理、版式配置、字段编排和图片元素拖拽等典型场景。

仓库同时保留 Vue 2 旧组件和 Vue 3 重构版本，用于展示复杂业务组件从 Vue 2 Options API 迁移到 Vue 3 Composition API + TypeScript 的过程。

## 功能

- 打印模板分类、搜索、分页和列表管理
- 新建、复制、删除模板以及设置默认模板
- A4、二等分、三等分等纸张规格配置
- 标题、副标题、表头、页脚和对齐方式设置
- 表头字段、明细列、底部字段和自定义条款编排
- LOGO、二维码、印章等图片元素上传、拖拽和缩放
- 通用单据与付款类单据的独立编辑页面
- Mock 数据驱动，无需后端即可体验主要交互

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 前端框架 | Vue 3、Composition API、`<script setup>` |
| 开发语言 | TypeScript |
| 构建工具 | Vite |
| UI 与样式 | Element Plus、Tailwind CSS、SCSS |
| 路由 | Vue Router |
| 拖拽交互 | interact.js、vuedraggable、SortableJS |
| 状态与工具 | Pinia、Lodash |

## 项目结构

```text
.
└── print-vue3/
    ├── vue2老组件/              # Vue 2 原业务组件与模板配置，作为迁移对照
    └── vue3-print-demo/          # 可直接运行的 Vue 3 Demo
        ├── src/views/            # 模板列表和编辑页面
        ├── src/components/       # 打印菜单、表格、设置和上传组件
        ├── src/composables/      # 从旧 Mixins 抽离的组合式逻辑
        ├── src/const/            # 打印模板与字段配置
        └── src/router/           # Demo 路由
```

## 本地运行

进入 Vue 3 Demo 目录：

```bash
cd print-vue3/vue3-print-demo
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

当前版本已通过生产构建验证。

## 页面入口

| 路径 | 说明 |
| --- | --- |
| `/systemSet/printTemplate/index` | 打印模板列表 |
| `/systemSet/printTemplate/edit` | 通用打印模板编辑器 |
| `/systemSet/printTemplate/editPayment` | 付款类模板编辑器 |
| `/systemSet/hiprintTemplate/design` | 自定义模板设计入口 |

## 重构要点

- 将 Vue 2 Options API 重构为 Vue 3 Composition API 和 `<script setup>`。
- 将 JavaScript 逐步迁移到 TypeScript，补充组件数据结构和交互参数类型。
- 将通用 Mixins 拆分为 Composables，减少隐式依赖。
- 将 Element UI 升级为 Element Plus，并使用 Vite 替换旧构建链路。
- 保留打印模板领域模型，同时用 Mock 数据隔离后端接口和业务权限系统。
- 使用 `v-model` 组织编辑器父子组件的数据同步，使模板配置与画布展示保持一致。

## 当前状态

这是一个用于技术展示的纯前端 Demo。模板列表、保存、删除、客户关联和图片上传等外部能力使用 Mock 实现；真实项目中需要接入后端接口、对象存储和打印服务。

目前示例数据重点覆盖预付申请单等代表性模板，其余业务单据保留了可扩展的模板配置结构。

## 面试讲解重点

1. 如何将大型 Vue 2 业务组件渐进式迁移到 Vue 3，而不是完全推倒重写。
2. 如何把标题、字段、表格、页脚和图片元素抽象为可配置的打印区域。
3. 如何利用 interact.js 处理绝对定位元素的拖拽、缩放和坐标持久化。
4. 如何通过 Mock 和领域配置抽离后端依赖，形成可单独运行的组件 Demo。
