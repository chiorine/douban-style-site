"use client";

import { deleteProjectAction } from "./actions";

type DeleteProjectButtonProps = {
  slug: string;
  title: string;
};

export default function DeleteProjectButton({
  slug,
  title,
}: DeleteProjectButtonProps) {
  const deleteFn = deleteProjectAction.bind(null, slug);

  return (
    <form action={deleteFn}>
      <button
        type="submit"
        className="text-xs text-stone-400 transition hover:text-red-500"
        onClick={(e) => {
          if (!confirm(`确认删除项目「${title}」？此操作不可撤销。`)) {
            e.preventDefault();
          }
        }}
      >
        删除
      </button>
    </form>
  );
}
