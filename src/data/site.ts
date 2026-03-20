// ────────────────────────────────────────────────────────────
// 站点核心配置
// 后续接入后台时，此文件的字段将作为数据库默认值或初始 seed 使用。
// ────────────────────────────────────────────────────────────

/** 站点名称，全局统一使用此变量，不要在页面中硬编码 */
export const siteName = "Wewkee";

/** 导航栏副标题 / 一句话说明 */
export const siteSubtitle = "记录广播、日记、项目与生活";

/** 站点描述，用于 <meta description> 及首页 About 区块 */
export const siteDescription =
  "Wewkee——一处缓慢更新的个人角落，记录阅读、写作、项目与日常想法。不赶时间，不追热点。";

/** 首页欢迎区块副标题 */
export const siteTagline = "你好，欢迎来到 Wewkee。";

// ────────────────────────────────────────────────────────────
// 导航菜单（后续可从后台动态写入）
// ────────────────────────────────────────────────────────────
export const navigation = [
  { name: "首页", href: "/" },
  { name: "广播", href: "/broadcast" },
  { name: "日记", href: "/notes" },
  { name: "项目", href: "#" },
  { name: "关于", href: "#" },
];

// ────────────────────────────────────────────────────────────
// 作者 / 博主信息
// ────────────────────────────────────────────────────────────
export const avatar = "/images/avatar.png";

export const nickname = "Wewkee";

export const bio =
  "写一点字，读一点书，偶尔做些不起眼但自己喜欢的小项目。希望把零散的日常、念头和记录，慢慢放进这个安静的角落。";

export const location = "上海";

export const website = "https://example.com";

export const links = [
  { name: "GitHub", url: "https://github.com/" },
  { name: "豆瓣", url: "https://www.douban.com/" },
  { name: "GIF Factory Upload", url: "http://100.88.172.12:8088/" },
  { name: "照片上传整理工具", url: "http://100.88.172.12:5000/login" },
 ];

export const tags = [
  "阅读",
  "电影",
  "写作",
  "前端",
  "散步",
  "摄影",
  "生活记录",
  "独立网站",
];