import Link from "next/link";
import { siteName, siteSubtitle, navigation } from "@/data/site";

export default function Header() {
  return (
    <header className="border-b border-stone-200 bg-[#f7f6f1]">
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between gap-6 px-4 py-5">
        <div>
          <Link href="/" className="text-xl font-semibold tracking-tight text-stone-800">
            {siteName}
          </Link>
          <p className="mt-1 text-sm text-stone-500">{siteSubtitle}</p>
        </div>

        <nav aria-label="主导航">
          <ul className="flex flex-wrap items-center gap-5 text-sm text-stone-600">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="transition hover:text-emerald-700">
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