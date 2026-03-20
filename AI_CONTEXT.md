# AI Developer Context & Update Log

此文件用于记录项目的核心改动和技术演进，帮助后续协作的 AI 开发者快速理解项目现状。

## 项目核心架构
- **技术栈**: React 19 + Vite + Tailwind CSS + Framer Motion
- **组件化**: 位于 `src/components`，按功能模块划分子目录。
- **状态管理**: 简单状态通过 React Hooks 管理，复杂交互使用 Framer Motion。

## 更新日志 (Update Log)

### 2026-03-20: 网页主页 Hero 封面动态化
- **改动详情**:
    - **新增组件**: `src/components/common/StarBackground.tsx`。使用 HTML5 Canvas 实现了一个轻量级的星辰流动动画。
    - **进阶动画**: `src/components/common/GalaxyBackground.tsx` (由远程开发者添加)。实现了一个更加复杂的旋涡星系中心动画，包含 4 条旋臂、明亮的星系核以及深蓝色调的星云效果。
    - **Hero 组件更新**: `src/components/home/Hero.tsx`。将背景组件由 `StarBackground` 升级为 `GalaxyBackground`，以获得更震撼的视觉效果。
    - **样式优化**: 为 Hero 区域设置了 `bg-black` 作为 Canvas 的底层背景色，并保留了原有的 `isHovered` 交互逻辑。
- **给 AI 协作者的提示**: 
    - 如果需要调整星辰数量或移动速度，可直接在 `GalaxyBackground.tsx` 的 `STAR_COUNT` 和 `ROTATION_SPEED` 常量中修改。
    - 确保 `Hero.tsx` 中的 Canvas 容器具有 `pointer-events-none` 属性，以免干扰页面点击。

### 2026-03-20: "Record of Soul" 页面重构与内容同步
- **改动详情**:
    - **数据同步**: 从官方链接抓取并一字不落地同步了 11 集剧集的详细 Abstract 和 Key features。
    - **数据结构重构**: 在 `src/content/siteContent.ts` 中引入了 `Episode` 和 `RecordOfSoulContent` 类型，支持更复杂的剧集元数据（包括 Abstract, Key features, videoLength 等）。同时保留了 `DocumentaryPage` 以兼容其他视图。
    - **组件重构**:
        - **RecordOfSoulHero.tsx**: 还原了蓝天背景效果，集成了蓝色 Overlay，并使用 CSS `clip-path` 实现了底部的多层红色/灰色几何图形。
        - **EpisodeItem.tsx**: 实现了交互式剧集卡片，支持 Abstract 内容的点击展开/折叠（使用 Framer Motion 动画）。
        - **EpisodeTimeline.tsx**: 构建了带时间线引导视觉的剧集列表。
    - **Bug 修复**: 解决了由于组件缺失 React 导入和属性引用错误导致的白屏问题。
- **给 AI 协作者的提示**:
    - 剧集详情的展开逻辑由 `EpisodeItem` 内的 `isOpen` 状态控制。
    - 背景图和静态文本主要集中在 `siteContent.ts` 的 `recordOfSoul` 对象中。
    - 底部几何图形依赖 CSS `clip-path`，修改时需注意坐标点的百分比计算。
