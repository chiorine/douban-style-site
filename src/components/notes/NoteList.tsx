import type { NoteForPage } from "@/types/note";
import NoteCard from "./NoteCard";

type NoteListProps = {
  items: NoteForPage[];
};

export default function NoteList({ items }: NoteListProps) {
  return (
    <section className="rounded-md border border-stone-200 bg-white">
      <div className="divide-y divide-stone-200">
        {items.map((item) => (
          <NoteCard key={item.slug} note={item} />
        ))}
      </div>
    </section>
  );
}