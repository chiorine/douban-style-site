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
