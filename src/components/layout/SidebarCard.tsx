import type { ReactNode } from "react";

type SidebarCardProps = {
  title: string;
  children: ReactNode;
};

export default function SidebarCard({ title, children }: SidebarCardProps) {
  return (
    <section className="rounded-md border border-stone-200 bg-white px-5 py-5">
      <div className="border-b border-stone-200 pb-3">
        <h2 className="text-base font-semibold tracking-tight text-stone-800">
          {title}
        </h2>
      </div>

      <div className="mt-4">{children}</div>
    </section>
  );
}