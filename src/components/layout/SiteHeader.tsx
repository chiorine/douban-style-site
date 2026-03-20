import Link from "next/link";
import { siteName, siteSubtitle, navigation } from "@/data/site";

type SiteHeaderProps = {
  currentPath?: string;
};

export default function SiteHeader({ currentPath = "/" }: SiteHeaderProps) {
  const isActive = (path: string) => currentPath === path;

  return (
    <header className="border-b border-stone-200 bg-[#f7f6f1]">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-4 px-4 py-5 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="text-xl font-semibold tracking-tight text-stone-800">
            {siteName}
          </Link>
          <p className="mt-1 text-sm text-stone-500">{siteSubtitle}</p>
                </div>

        <nav aria-label="主导航">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-stone-600">
            {navigation.map((item) => (
              <li key={item.href + item.name}>
                <Link
                  href={item.href}
                  className={
                    isActive(item.href)
                      ? "font-medium text-emerald-700"
                      : "transition hover:text-emerald-700"
                  }
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}