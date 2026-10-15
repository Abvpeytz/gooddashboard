import { notFound, redirect } from "next/navigation";
import { fetchCourseBySlug } from "@/app/lib/data";
import { createClient } from "@/app/lib/supabase/server";
import Module from "@/app/ui/dashboard/module";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const course = await fetchCourseBySlug(slug, user.id);
  if (!course) notFound();

  return (
    <main className='grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 gap-1 p-4 bg-ink-100 rounded-2xl h-full'>
      <div className='col-span-2 row-span-1 p-4 bg-ink-800 text-white rounded-2xl'>
        <h1 className='font-medium text-2xl'>{course.title}</h1>
        <p>{course.description}</p>
        <p>{course.progress}% complete</p>
      </div>

      {course.modules.map((module) => (
        <Module key={module.id} module={module} courseSlug={slug} />
      ))}
    </main>
  );
}
