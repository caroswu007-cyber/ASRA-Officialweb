# AI Developer Context & Update Log

此文件用于记录项目的核心改动和技术演进，帮助后续协作的 AI 开发者快速理解项目现状。

## 项目核心架构
- **技术栈**: React 19 + Vite + Tailwind CSS + Framer Motion
- **组件化**: 位于 `src/components`，按功能模块划分子目录。
- **状态管理**: 简单状态通过 React Hooks 管理，复杂交互使用 Framer Motion。

## 更新日志 (Update Log)

### 2026-03-20: 网页主页 Hero 封面动态化
- **改动详情**:
    - **新增组件**: `src/components/common/StarBackground.tsx`。使用 HTML5 Canvas 实现了一个轻量级的星辰流动动画，支持自适应缩放和简单的闪烁效果。
    - **Hero 组件更新**: `src/components/home/Hero.tsx`。将原本的 Unsplash 静态宇宙图片背景替换为 `StarBackground` 组件。
    - **样式优化**: 为 Hero 区域设置了 `bg-black` 作为 Canvas 的底层背景色，并保留了原有的 `isHovered` 交互逻辑。
- **给 AI 协作者的提示**: 
    - 如果需要调整星辰数量或移动速度，可直接在 `StarBackground.tsx` 的 `starCount` 和 `speed` 变量中修改。
    - 确保 `Hero.tsx` 中的 Canvas 容器具有 `pointer-events-none` 属性，以免干扰页面点击。
