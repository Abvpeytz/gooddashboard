"use client";

import { toggleModule } from "@/app/lib/actions";
import clsx from "clsx";
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
    <div
      className={clsx(
        "flex flex-col items-start gap-3 p-4 rounded-2xl min-h-75 bg-white",
        {
          "opacity-50": optimisticCompleted,
        },
      )}
    >
      {title && <h3 className='text-2xl'>{title}</h3>}
      {module_content && <p>{module_content}</p>}

      <button
        onClick={() => handleClick(id, completed, courseSlug)}
        className={clsx(
          "mt-auto rounded-3xl py-2 px-4 font-bold bg-black text-white hover:bg-black/75 cursor-pointer",
          {
            "bg-green text-white hover:bg-green/75": optimisticCompleted,
          },
        )}
        disabled={isPending}
      >
        {optimisticCompleted ? "Completed" : "Mark as read"}
      </button>
    </div>
  );
}
