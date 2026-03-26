# 🟤 Douban Style Site

一个模仿豆瓣风格的个人内容网站，支持广播、日记与后台管理系统。

👉 这是一个完整的全栈项目，从 UI 到数据层、鉴权与部署均已实现。

---

## 🌐 Live Demo

暂不公开展示。

---

## 📸 Preview

### 首页（Home）
![home](./public/images/preview-home.png)

### 广播列表（Broadcast）
![broadcast](./public/images/preview-broadcast.png)

### 日记页（Notes）
![notes](./public/images/preview-notes.png)

### 后台管理（Admin）
![admin](./public/images/preview-admin.png)

---

## ✨ Features

- 📢 广播系统（类似豆瓣动态流）
- 📝 日记系统
- 🏷️ 标签 / 归档筛选
- 🔐 后台管理系统（Admin）
- 🍪 Cookie 鉴权
- 🧾 Prisma 数据持久化

---

## 🧠 技术亮点

- Next.js App Router 全栈架构
- Server Actions 处理服务端逻辑
- 自实现 Admin 鉴权（非第三方）
- Prisma + Migration 管理数据库
- 组件拆分清晰（Broadcast / Notes / Layout）
- 支持 URL 参数筛选（tag / month）

---

## 🛠 Tech Stack

- Next.js
- React
- Prisma
- Tailwind CSS

---

## 📂 项目结构

```
src/
  app/
  components/
  lib/
  data/

prisma/
  schema.prisma
  migrations/
```

---

## 🚀 本地运行

```bash
npm install
npm run dev
```

---

## 🔐 环境变量

创建 `.env.local`：

```env
DATABASE_URL=
ADMIN_PASSWORD=
ADMIN_COOKIE_SECRET=
```

---

## 🧩 部署（VPS）

```bash
git pull
npm install
npm run build
pm2 restart app
```

---

## 🔄 开发流程

```bash
git add .
git commit -m "feat: xxx"
git push
```

---

## 📌 TODO

- [ ] 评论系统
- [ ] 图片上传
- [ ] AI 内容生成

---

## 👤 Author

个人全栈项目，用于实践 Web 应用开发

---

## 更新记录

### 2026-03-21 · 首页 Hero 后台化

✨ 新增：首页欢迎区后台编辑能力

本次更新将首页原本写死的 Welcome 区块，改造为可在后台编辑的动态模块，实现了一个轻量级 JSON CMS。

🧩 功能说明
新增后台页面：/admin/home-hero
支持通过表单编辑首页内容：
是否显示模块
顶部小标签（eyebrow）
主标题（title）
描述内容（description）
主按钮 / 次按钮（label + href）
保存后立即生效（通过 revalidatePath 刷新首页缓存）
🏗 技术实现
数据层

使用本地 JSON 文件作为持久化存储：

src/data/content/home-hero.json
类型定义

新增：

src/types/home-hero.ts
数据读写封装

新增：

src/lib/home-hero.ts
提供：
getHomeHero()：读取 JSON（带容错 fallback）
updateHomeHero()：写入 JSON
后台逻辑

新增 Server Action：

src/app/admin/home-hero/actions.ts
功能：
表单数据提取
服务端校验（必填项 + 按钮成对校验）
写入 JSON
revalidatePath("/") 使首页立即更新
后台页面

新增：

src/app/admin/home-hero/page.tsx
src/app/admin/home-hero/HomeHeroForm.tsx
结构：
Server Component 负责读取数据
Client Component（useActionState）负责表单交互与提示
🔄 首页改造
首页不再使用 site.ts 中的静态 homeHero
改为运行时读取 JSON 数据渲染
支持：
动态内容更新
模块开关（enabled）
按钮按需显示
🔐 权限控制
/admin/home-hero 已接入现有 admin 鉴权体系
未登录访问将自动跳转登录页
🧠 设计思路

本次实现采用：

JSON 文件 + Server Action + Admin 表单

构建一个轻量 CMS：

不依赖数据库
结构清晰、易扩展
适合个人站点内容管理
⚠️ 注意事项
home-hero.json 已纳入 Git 管理（当前阶段作为数据源）
不同环境（本地 / VPS）修改内容时需注意覆盖问题
当前适用于 VPS 部署，不建议在无状态平台（如 Vercel）写入本地文件

---

## 更新记录 

### 2026-03-24 · 标签系统更新

本次将站点中的“标签系统”从静态展示升级为真实内容驱动。

现在可以：
- 根据实际内容自动生成标签
- 在首页查看全站标签分布
- 点击标签快速筛选相关日记
- 清晰看到当前筛选状态与空结果提示

这一步让网站从“静态页面”更进一步接近一个完整的个人博客系统。

---

## 更新记录

### 2026-03-25 · 重构首页“最近项目”模块

### 3. 项目后台管理（Admin）

新增完整项目管理能力：

- 项目列表：`/admin/projects`
- 新建项目：`/admin/projects/new`
- 编辑项目：`/admin/projects/[slug]/edit`

支持：

- 基础信息编辑（title / description / tech / tags）
- 状态管理（进行中 / 已完成 / 已搁置）
- featured 控制（首页展示）
- 开发记录（logs）动态增删改
- 删除项目（带确认）

---

## 🗂 数据结构设计

项目数据已从代码中拆出，改为内容驱动：

content/projects/
├── wewkee-site.json
├── yt-download-system.json
└── photo-organizer.json


每个项目一个 JSON 文件，例如：

```json
{
  "slug": "wewkee-site",
  "title": "个人网站（Wewkee）",
  "status": "ongoing",
  "tech": ["Next.js", "VPS"],
  "logs": [
    {
      "date": "2026-03-24",
      "content": "重构首页最近项目模块"
    }
  ]
}

🔁 数据读写架构

content/projects/*.json     ← 数据源
        ↓
src/lib/projects.ts        ← 统一读写层（CRUD）
        ↓
前台页面（/projects）
后台 admin（编辑）

---

## 更新记录

### 2026-03-26

本次更新主要围绕首页信息结构优化、日记页整理，以及内容管理能力补充展开。

#### 1. 首页结构优化
- 原“归档”逻辑已取消，改为更符合阅读习惯的标签入口
- 首页右侧标签区拆分为：
  - **广播标签**：仅统计已发布广播
  - **日记标签**：仅统计已发布日记
- 两个标签模块均进行了精简显示：
  - 仅展示出现次数较高的标签
  - 控制展示数量，避免右侧区域过长
  - 底部提供“更多广播标签 / 更多日记标签”入口

#### 2. 日记页体验整理
- 移除 `/notes` 页面中的“归档”模块
- 保留标签筛选、当前结果统计、文章列表等核心浏览功能
- 日记页结构更简洁，浏览重点更集中

#### 3. 关于页面补全
- 补充 `/about` 页面内容
- 完善站点定位、自我介绍和内容说明
- 让导航中的“关于”页不再是空白页

#### 4. 外部链接支持后台管理
- 新增外部链接数据模型
- 首页“外部链接”区域改为从数据库读取
- 后台新增外部链接管理能力，支持：
  - 新建
  - 编辑
  - 删除
  - 发布 / 草稿状态控制

#### 5. 数据与展示逻辑统一
- 首页标签、日记列表、广播列表均统一基于已发布内容读取
- 标签点击后可直接进入对应列表页进行筛选浏览
- 进一步减少首页展示逻辑与列表页数据不一致的问题
特点：

单一数据源
前台 / 后台共用
修改后即时生效（revalidate）
