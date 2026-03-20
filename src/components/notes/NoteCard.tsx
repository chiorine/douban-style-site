import Link from "next/link";
import type { NoteForPage } from "@/types/note";

type NoteCardProps = {
  note: NoteForPage;
};

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="px-6 py-5">
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm text-stone-500">
          <time dateTime={note.date}>{note.date}</time>
          <span>·</span>
          <span>{note.readingTime}</span>
        </div>

        <h2 className="text-xl font-semibold text-stone-800">
          <Link href={`/notes/${note.slug}`} className="hover:text-emerald-700">
            {note.title}
          </Link>
        </h2>

        <p className="text-[15px] leading-7 text-stone-600">{note.summary}</p>

                <div className="flex flex-wrap gap-2 pt-1">
          {note.tags.map((tag) => (
            <Link
              key={tag}
              href={`/notes?tag=${tag}`}
              className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-2.5 py-0.5 text-xs text-stone-500 transition hover:text-emerald-700"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}