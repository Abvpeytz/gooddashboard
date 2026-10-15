"use client";

import { toggleModule } from "@/app/lib/actions";
import { useTransition, useOptimistic } from "react";

interface ModuleProps {
  module: {
    id: number;
    slug?: string;
    title: string;
    module_content?: string;
    completed: boolean;
  };
  courseSlug: string;
}

export default function Module({ module, courseSlug }: ModuleProps) {
  const { id, title, module_content, completed } = module;
  const [isPending, startTransition] = useTransition();
  const [optimisticCompleted, setOptimisticCompleted] =
    useOptimistic(completed);

  const handleClick = (id: number, complete: boolean, slug: string) => {
    startTransition(async () => {
      setOptimisticCompleted(!complete);
      await toggleModule(id, complete, slug);
    });
  };

  return (
    <div className='flex flex-col items-start gap-3 p-4 rounded-2xl min-h-75 bg-ink-300'>
      {title && <h3 className='text-2xl'>{title}</h3>}
      {module_content && <p>{module_content}</p>}

      <button
        onClick={() => handleClick(id, completed, courseSlug)}
        className='mt-auto rounded-3xl py-2 px-4 font-bold bg-black text-white'
        disabled={isPending}
      >
        {optimisticCompleted ? "✓ Completed" : "Mark as read"}
      </button>
    </div>
  );
}
