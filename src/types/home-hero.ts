/**
 * 首页 Hero 欢迎区的类型定义
 * 数据源：src/data/content/home-hero.json
 * 读写工具：src/lib/home-hero.ts
 */

export interface HomeHeroAction {
  /** 按钮显示文字；留空则不渲染该按钮 */
  label: string;
  /** 跳转链接；留空则不渲染该按钮 */
  href: string;
}

export interface HomeHeroData {
  /** 是否在首页渲染欢迎区；false 则整个 section 不显示 */
  enabled: boolean;
  /** 顶部小标签，建议全大写短词，如 WELCOME */
  eyebrow: string;
  /** 主标题 */
  title: string;
  /** 正文描述 */
  description: string;
  /** 主操作按钮（label/href 均为空字符串时视为未配置） */
  primaryAction: HomeHeroAction;
  /** 次操作按钮（label/href 均为空字符串时视为未配置） */
  secondaryAction: HomeHeroAction;
}

/** Server Action 的返回结果 */
export interface ActionResult {
  success: boolean;
  message: string;
}
