# AI Developer Context & Update Log

此文件用于记录项目的核心改动和技术演进，帮助后续协作的 AI 开发者快速理解项目现状。

## 项目核心架构
- **技术栈**: React 19 + Vite + Tailwind CSS v4 + Framer Motion + React Router v7
- **字体**: Lora（正文默认）、Playfair Display、Cinzel Decorative / Cinzel（标题）、Inter（`font-ui` 导航等）
- **组件化**: 位于 `src/components`，按功能模块划分子目录：`common/`、`home/`、`record/`、`spiritMedicine/`
- **内容管理**: 主数据在 `src/content/siteContent.ts`；**灵体医学分集唯一数据源**为 `src/content/spiritMedicineData.ts`（`siteContent.spiritMedicine.volumes` 由该文件派生）
- **AI 速读入口**: 根目录 **`AGENTS.md`** — 路由表、改哪里、playlist 规则；新会话优先读该文件而非全仓扫描

---

## 更新日志 (Update Log)

### 2026-03-21 [Session]: Spirit Medicine 对接 YouTube 播放列表 + AGENTS 指引

- **`src/content/spiritMedicineData.ts`**（新建）: 收录官方 playlist `PL-pt7dbiRizs3yIAao06SPk2NrDTBc9q_` 中 **17 集**（已删视频未列入）；按 FILE **2-1 → 2-5** 课程组排序；导出 `spiritMedicineEpisodeUrl`、`spiritMedicinePlaylistUrl`。
- **`SpiritMedicineContents.tsx`**: 目录改为读取 `spiritMedicineFileGroups`；每集右侧 **「Watch on YouTube」** 按钮（含 playlist 参数）；索引区增加 **打开完整播放列表** 链接。
- **`siteContent.ts`**: `spiritMedicine.volumes` 改为由 `spiritMedicineData` 扁平化生成的 `OldEpisode[]`，与页面一致。
- **i18n**: `spirit.watchYoutube`、`spirit.openPlaylist`（en/zh）。
- **`AGENTS.md`**（新建）: 给后续 AI/协作者的精简项目地图与修改指南。
- **本地预览**: `npm run dev` → 默认 `http://localhost:5173/spirit-medicine`。

### 2026-03-20 [Session 4]: 首页全面改版 — 星系宇宙主题

- **改动概述**: 将首页视觉风格升级为深空星辰主题，新增艺术字体，各板块分隔更明显。

- **具体改动**:
    - **`index.html`**: 新增 Google Fonts 引入：`Cinzel Decorative`（主标题艺术字体）+ `Cinzel`（副标题）；页面标题改为 "Spirit Ambassador Association"。
    - **`src/index.css`**: 
        - `body` 加入 `background-image: fixed` 固定星系背景图（Unsplash 深空星系），形成全页视差滚动效果。
        - 新增 CSS 变量 `--font-display: "Cinzel Decorative"` 和 `--font-cinzel: "Cinzel"`。
        - 新增 `.cosmic-title` utility class：Cinzel Decorative 字体 + 白→金渐变 + 金色光晕。
        - 新增 `.font-display` 和 `.font-cinzel` utility class 供 Tailwind 使用。
    - **`src/components/common/SectionDivider.tsx`** (新建): 宇宙风格板块分隔线组件，包含 `✦ ◈ ✦` 符号、两侧金色渐变横线、可选小标签文字。
    - **`src/views/HomeView.tsx`**: 在每两个 section 之间插入 `<SectionDivider>` 并附带语义标签。
    - **`src/components/home/Introduction.tsx`**: 标题改用 `cosmic-title` 样式（Cinzel Decorative + 金色渐变），顶部/底部添加装饰短线和 SAA 标签；卡片加强玻璃态效果和悬停发光。
    - **`src/components/home/TruthSection.tsx`**: 
        - 三季卡片各有独立主题色（Season 1 金铜、Season 2 天蓝、Season 3 紫罗兰）。
        - 每个卡片顶部有对应颜色细条纹，悬停时边框发光。
        - Abstract 引用块加了双横线 + Cinzel 标题。
    - **`src/components/home/Achievements.tsx`**: 标题改为 cosmic-title，卡片风格统一提升。
    - **`src/components/home/JoinSection.tsx`**: CTA 按钮改为金色渐变实心圆角，背景加琥珀光晕，顶部/底部加宇宙装饰符。

- **给 AI 协作者的提示**:
    - 所有 section 大标题统一使用 `className="cosmic-title"` + `style={{ fontSize: ... }}`，不要改回 Tailwind text-* 类，否则渐变效果失效。
    - `body` 的星系背景图使用 `background-attachment: fixed`，在 iOS 移动端此属性无效（固定定位不支持），如需移动端适配可改用 `background-attachment: scroll`。
    - `SectionDivider` 接受可选的 `label` 字符串属性。

---

### 2026-03-20 [Session 3]: Spirit Medicine 页面全新搭建

- **改动概述**: 完全重建 Woos Spirit Medicine (Season 2) 页面，参照 ess-esw.org/spirit-medicine/ 目录结构，采用深医学青蓝色风格（与 Record of Soul 的古铜风形成对比）。

- **具体改动**:
    - **新增目录**: `src/components/spiritMedicine/`
    - **`SpiritMedicineHero.tsx`** (新建): 医学实验室背景图 + 深青蓝遮罩（`rgba(6,78,104,0.68)`），标题 "Spirit Medicine" 带琥珀色下划线，标签 "Medical Documentary · Series II"，天蓝色统计栏。
    - **`SpiritMedicineContents.tsx`** (新建): 参照 Record of Soul 时间线排版（左侧竖线 + 编号节点 + 宽松间距），颜色体系全改为天蓝 `#38bdf8`；包含 5 个 FILE、11 个子章节，全部标注 "Coming Soon"；背景加入 4 张虚化医学主题图（显微镜、DNA、解剖、科研）。
    - **`src/views/WoosSpiritMedicineView.tsx`**: 重写为只组合 Hero + Contents 两个组件。

- **内容结构** (来自 ess-esw.org/spirit-medicine/):
    - FILE 2-1: General Principles and Definition of Spirit Medicine
    - FILE 2-2: Evidence for the Existence of Spirits (Ghosts)
    - FILE 2-3: Human Spirit (Soul) Physiology（含 2 个子章节）
    - FILE 2-4: Overview: Physiology & Pathology of Spirits（含 6 个子章节）
    - FILE 2-5: Pathology of Human Spirit (Soul)（含 3 个子章节）

- **给 AI 协作者的提示**（已过期 — 见 2026-03-21 日志）:
    - ~~Spirit Medicine 数据在 `SpiritMedicineContents.tsx`~~ → 现已在 **`src/content/spiritMedicineData.ts`** 统一维护。
    - 颜色主色调：`#38bdf8`，背景：`#0a2535`。

---

### 2026-03-20 [Session 2]: "Record of Soul" 页面美工升级 — 档案馆 + 纪录片风格

- **改动概述**: 将 Record of Soul 页面从普通布局重设计为"档案馆 + 纪录片"美学，整体配色从暗灰改为暖棕金铜色系。

- **具体改动**:
    - **`RecordOfSoulHero.tsx`**: 
        - 背景遮罩从蓝色改为多层叠加（52% 黑色平铺 + 径向晕影 + 扫描线纹理）。
        - 标题改用 Playfair Display 衬线字体，颜色 `#f5e8cc`（暖白）带金色光晕。
        - 顶部加 "Documentary Archive · Series I" 分类标签。
        - 统计数字包在带细金边框的表格中。
        - 底部原红色三角几何图形改为平滑渐变过渡。
        - 新增滚动提示指示器。
    - **`EpisodeTimeline.tsx`**: 
        - 背景改为 `#1a1610`（暖棕黑）。
        - 时间线竖线改为顶部亮→底部渐隐的金铜渐变。
        - 节点改为带序号（01-11）的圆形编号徽章。
        - 加入 5 张虚化灵体/宇宙主题背景图（3px blur + 0.3 opacity，可清晰辨认图像内容）。
    - **`EpisodeItem.tsx`**: 
        - "Open Dossier / Close Dossier" 展开按钮取代原 "Abstract & Key features"。
        - 标题改为 `font-bold` 衬线字体，`#e8e0d0` 颜色。
        - 摘要/关键特性文字亮度提升至 `#c0b090`。
        - 时长条改为金铜渐变。
        - Watch 按钮改为细边框风格 + 悬停高亮。

- **给 AI 协作者的提示**:
    - 背景虚化图在 `EpisodeTimeline.tsx` 顶部的 `ghostImages` 数组中管理，调整 `blur`（当前 3px）和 `opacity`（当前 0.30-0.35）可控制清晰度。
    - `EpisodeItem` 接受可选 `index` 属性用于错开入场动画延迟。

---

### 2026-03-20 [Session 1]: 网页主页 Hero 封面动态化

- **改动详情**:
    - **新增组件**: `src/components/common/StarBackground.tsx`。使用 HTML5 Canvas 实现了一个轻量级的星辰流动动画。
    - **进阶动画**: `src/components/common/GalaxyBackground.tsx`。实现了旋涡星系中心动画，包含 4 条旋臂、明亮的星系核以及深蓝色调的星云效果。
    - **Hero 组件更新**: `src/components/home/Hero.tsx`。将背景由 `StarBackground` 升级为 `GalaxyBackground`。
    - **样式优化**: Hero 区域 `bg-black` 底层背景色，保留 `isHovered` 交互逻辑（悬停切换星云图）。

- **给 AI 协作者的提示**: 
    - 调整星辰数量或速度：`GalaxyBackground.tsx` 的 `STAR_COUNT` 和 `ROTATION_SPEED` 常量。
    - Canvas 容器须保持 `pointer-events-none`。

---

## 当前页面路由状态

| 路径 | 页面 | 状态 |
|---|---|---|
| `/` | 首页 | ✅ 完成（星系主题改版） |
| `/record-of-soul` | Season 1: Woos Record of Soul | ✅ 完成（11集，档案馆风格） |
| `/spirit-medicine` | Season 2: Woos Spirit Medicine | ✅ 目录与 YouTube 播放列表同步（17 集 + 每集按钮） |
| `/universal-matrix` | Season 3: Universal Matrix | ⚪ 待开发 |

## 待完成事项

- [x] Season 2 (Spirit Medicine): YouTube 播放列表已对接（见 `spiritMedicineData.ts`）
- [ ] Season 3 (Universal Matrix): 参照 Spirit Medicine 模式搭建页面
- [ ] 移动端汉堡菜单（Navbar 当前在移动端显示静态 "MENU" 文字）
- [ ] 页面 `<title>` 已更新为 "Spirit Ambassador Association"
