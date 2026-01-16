# CODEBUDDY.md 本文件为 CodeBuddy 在该代码库中工作时提供指导。

## 常用命令

- **启动开发服务器**: `npm run dev` - 在所有网络接口运行 Vite 开发服务器
- **生产环境构建**: `npm run build` - 在 dist/ 目录创建优化后的生产构建
- **代码检查和修复**: `npm run lint` - 运行 ESLint 并自动修复 Vue 和 JS 文件
- **代码格式化**: `npm run format` - 运行 Prettier 格式化源文件
- **预览生产构建**: `npm run preview` - 本地预览生产构建

## 项目架构

这是一个 Vue 3 JSON 查看器应用，使用 Monaco Editor 进行输入，以图形或树形视图显示 JSON 数据。

### 核心数据流

应用遵循转换流水线：**输入内容 → 解析 → 遍历 → 布局 → 渲染**

1. **输入层** (`src/views/editor/live-editor/LiveEditor.vue`)
   - Monaco Editor 组件用于编辑 JSON/Properties 内容
   - 支持 JSON 和 Properties 格式，自动检测内容类型
   - Properties 格式自动包装在 `{ root: ... }` 对象中，以获得更清晰的可视化效果

2. **解析层** (`src/utils/`)
   - `jsonParser.js`: 使用 `jsonc-parser` 将 JSON 解析为 AST
   - `propertiesParser.js`: 将 Properties 格式（键值对）转换为 JSON 对象
   - `isPropertiesFormat()` 检测内容类型并选择适当的解析器
   - `parser()` 是主入口点，返回 `{ nodes, edges }`

3. **遍历层** (`src/utils/traverse.js`)
   - 使用深度优先方法递归遍历解析后的 AST
   - 通过 `addNodeToGraph()` 和 `addEdgeToGraph()` 创建图节点和边
   - 处理复杂情况：嵌套对象、数组、兄弟属性、数组元素
   - 使用状态管理跟踪：`bracketOpen`（打开的括号）、`objectsFromArray`（数组中的对象）、`brothersNode`（兄弟节点）等
   - 区分属性节点和值节点，以构建正确的层级结构

4. **布局层** (`src/utils/calculateNodePostion.js`)
   - 使用 ELKjs（Eclipse Layout Kernel）进行自动图布局
   - 默认布局方向：RIGHT（水平）
   - 支持分层布局，具有适当的间距和边路由
   - 布局选项：分层算法、正交边、固定节点顺序

5. **渲染层** (`src/components/flow/`)
   - `CustomFlow.vue`: Vue Flow 组件包装器，用于图形显示
   - `CustomItem.vue`: 渲染具有类型特定样式的单个节点
   - 节点类型：数组（橙色容器带 `[]`）、对象（紫色容器带 `{}`）、基本类型
   - 数组和对象显示子元素数量，并具有展开/折叠图标
   - 悬停提示显示完整内容，不包含 `[]`/`{}` 后缀

### 关键组件结构

- **EditorView.vue**: 主容器，协调工具栏、实时编辑器和底部工具
- **LiveEditor.vue**: 将屏幕分割为 Monaco 编辑器（左侧）和可视化（右侧）
- **CustomTree.vue**: 使用 vue-json-pretty 的替代树形视图
- **MonacoEditor.vue**: 包装 Monaco Editor，支持 v-model、JSON 格式化和语言检测

### 重要约定

- **数组/对象显示**: 数组显示为 `key[]`，对象显示为 `key{}`
- **Properties 格式**: 嵌套键（如 `user.name`）转换为嵌套对象
- **节点定位**: 所有节点从 ELKjs 布局获得绝对位置
- **边样式**: 边带有动画和箭头标记，从父节点指向子节点
- **类型检测**: 内容首先作为 Properties 解析，失败则回退到 JSON
- **容器样式**: 数组使用橙色主题（#ff6b00），对象使用紫色主题（#761cea），带有半透明边框和背景

### Vue Flow 集成

应用使用 `@vue-flow/core` 进行图形渲染：
- 通过 `label` 属性和 h() 函数渲染 CustomItem 组件来自定义节点
- 节点具有来自 ELKjs 的固定位置，不允许拖动（`nodesDraggable.value = false`）
- 支持缩放（0.2x 到 4x）和适应视图功能
- Background 组件提供网格模式以获得更好的可视化效果

### 状态管理

所有状态都是使用 Vue 3 Composition API（`ref`、`computed`）的本地组件状态。无全局状态管理。关键响应式数据：
- `content`: 原始编辑器内容（JSON 或 Properties 字符串）
- `nodesList`: 带有布局位置的 Vue Flow 节点数组
- `edgesList`: Vue Flow 边数组
- `viewType`: 在图形（1）和树形（2）视图之间切换
- `isExpand`: 切换编辑器面板可见性

### 依赖说明

- **elkjs**: 提供图布局算法 - 在 `calculateNodePostion.js` 中修改布局选项
- **jsonc-parser**: 解析带注释的 JSON - 扩展标准 JSON 解析器
- **monaco-editor**: VS Code 的编辑器引擎 - 在 `MonacoEditor.vue` 中配置
- **vue3-page-split**: 编辑器和可视化之间的可调整大小分割面板
