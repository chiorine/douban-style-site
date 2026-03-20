type TagListProps = {
  tags: string[];
};

export default function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-sm border border-stone-200 bg-stone-50 px-3 py-1 text-sm text-stone-600"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}