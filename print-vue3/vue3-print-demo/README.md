# Vue 3 Print Demo

这是一个将 Vue 2 老项目组件重构为 Vue 3 + TypeScript + Vite + Tailwind CSS 的 Demo 项目。

## 功能

*   **项目初始化**: 全新 Vue 3 项目结构。
*   **组件迁移**: 
    *   `PrintIndex`: 模板列表页 (使用 Element Plus Table)。
    *   `PrintEdit`: 模板编辑页 (使用 interactjs 实现拖拽，Vue 3 Composition API)。
    *   `PrintMenu`: 拖拽菜单组件 (使用 vuedraggable)。
    *   `PrintTable`: 拖拽表格配置组件。
*   **Mock 数据**: 所有后端接口均已 Mock，`const/hiprintTemplate` 下保留了部分数据结构。
*   **样式重构**: 使用 Tailwind CSS 替代部分 SCSS，保留了核心布局逻辑。

## 运行

1.  安装依赖:
    ```bash
    npm install
    ```

2.  启动项目:
    ```bash
    npm run dev
    ```

## 变更说明

*   **技术栈升级**: Vue 2 -> Vue 3, Webpack -> Vite, JS -> TS.
*   **依赖替换**:
    *   `element-ui` -> `element-plus`
    *   `vuedraggable` -> `vuedraggable@next`
    *   `ali-oss` -> 移除 (使用 Mock 上传)
*   **代码优化**:
    *   Mixins -> Composables (`usePublicMixins`).
    *   Options API -> Script Setup.
    *   移除 `v-permissions`, `v-dialogDrag` 等自定义指令 (Demo 中不实现)。

## 注意事项

*   仅 `0008` (预付申请单) 模板有较完整的 Mock 数据结构 (`src/const/hiprintTemplate/purchase/addAdvancePayment.ts`)，其他模板使用 Mock 占位符。
*   部分复杂交互（如打印预览具体逻辑）在 Demo 中为简化实现。
