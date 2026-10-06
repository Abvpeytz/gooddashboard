import { fetchCourses } from "@/app/lib/data";
import Card from "@/app/ui/dashboard/card";

export default async function CardWrapper() {
  const courses = await fetchCourses();

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
