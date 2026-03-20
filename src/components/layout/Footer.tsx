import { siteName } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-stone-200 bg-[#f7f6f1]">
      <div className="mx-auto w-full max-w-[1100px] px-4 py-6 text-sm text-stone-500">
        <p>© 2025 {siteName}. 慢慢写，慢慢存放。</p>
      </div>
    </footer>
  );
}