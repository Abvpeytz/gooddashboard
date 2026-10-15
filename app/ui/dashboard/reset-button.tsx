"use client";

import { resetCourse } from "@/app/lib/actions";

export default function ResetButton({ slug }: { slug: string }) {
  return (
    <form
      action={resetCourse.bind(null, slug)}
      onSubmit={(e) => {
        if (!confirm("Reset all progress for this course?")) e.preventDefault();
      }}
    >
      <button type='submit' className='text-sm underline text-ink-900'>
        Reset progress
      </button>
    </form>
  );
}
