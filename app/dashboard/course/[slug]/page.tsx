import { notFound, redirect } from "next/navigation";
import { fetchCourseBySlug } from "@/app/lib/data";
import { createClient } from '@/app/lib/supabase/server';

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
    <main>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <p>{course.progress}% complete</p>

      <ul>
        {course.modules.map((m) => (
          <li key={m.id}>
            {m.completed ? "✓" : "○"} {m.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
