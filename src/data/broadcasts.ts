export type Broadcast = {
  id: string;
  nickname: string;
  avatar: string;
  content: string;
  publishedAt: string;
  tags: string[];
  status: string; // "draft" | "published"
  createdAt: Date;
  updatedAt: Date;
};

export const broadcasts: Broadcast[] = [
  {
    id: "1",
    nickname: "Wewkee",
    avatar: "/images/avatar.png",
    content:
      "把这个小站重新整理了一遍。现在它终于不像一个临时拼出来的页面，而更像一个可以慢慢写下去的地方。",
    publishedAt: "2026-03-19",
    tags: ["建站", "记录"],
    status: "published",
    createdAt: new Date("2026-03-19T09:00:00+08:00"),
    updatedAt: new Date("2026-03-19T09:00:00+08:00"),
  },
  {
    id: "2",
    nickname: "Wewkee",
    avatar: "/images/avatar.png",
    content:
      "越来越觉得，个人网站最重要的不是功能堆得多复杂，而是它有没有一种让人愿意停留片刻的气质。",
    publishedAt: "2026-03-18",
    tags: ["独立网站", "思考"],
    status: "published",
    createdAt: new Date("2026-03-18T09:00:00+08:00"),
    updatedAt: new Date("2026-03-18T09:00:00+08:00"),
  },
  {
    id: "3",
    nickname: "Wewkee",
    avatar: "/images/avatar.png",
    content:
      "今天把广播、日记、侧边栏这些模块都顺了一遍。很多小问题单看不大，但一个个处理掉之后，整个页面确实舒服了很多。",
    publishedAt: "2026-03-17",
    tags: ["前端", "优化"],
    status: "published",
    createdAt: new Date("2026-03-17T09:00:00+08:00"),
    updatedAt: new Date("2026-03-17T09:00:00+08:00"),
  },
  {
    id: "4",
    nickname: "Wewkee",
    avatar: "/images/avatar.png",
    content:
      "想把这里当作一个缓慢更新的角落。可以写项目，也可以写日常，不追求频率，只想留下真实的痕迹。",
    publishedAt: "2026-03-16",
    tags: ["生活记录", "写作"],
    status: "published",
    createdAt: new Date("2026-03-16T09:00:00+08:00"),
    updatedAt: new Date("2026-03-16T09:00:00+08:00"),
  },
];