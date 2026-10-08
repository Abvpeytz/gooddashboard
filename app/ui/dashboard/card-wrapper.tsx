import { fetchCourses } from "@/app/lib/data";
import Card from "@/app/ui/dashboard/card";
import { createClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CardWrapper() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const courses = await fetchCourses(user.id);

  return (
    <>
      {courses.map((course) => (
        <Card
          key={course.id}
          title={course.title}
          slug={course.slug}
          description={course.description}
          textColor={course.textColor}
          bgColor={course.bgColor}
          progressStatus={course.progress}
        />
      ))}
    </>
  );
}
