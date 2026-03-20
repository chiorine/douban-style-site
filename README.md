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
