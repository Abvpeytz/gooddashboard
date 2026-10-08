import postgres from "postgres";
import { Course, CourseWithModules, Module } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  prepare: false,
});

// export async function fetchCourses() {
//   try {
//     const data = await sql<Course[]>`SELECT * FROM courses`;

//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

export async function fetchCourses(userId: string) {
  try {
    return await sql<Course[]>`
      SELECT
        c.id,
        c.title,
        c.slug,
        c.description,
        c."textColor",
        c."bgColor",
        COALESCE(
          ROUND(100.0 * COUNT(up.completed_at) / NULLIF(COUNT(m.id), 0)),
          0
        )::int AS progress
      FROM courses c
      LEFT JOIN modules m ON m.course_id = c.id
      LEFT JOIN user_progress up
        ON up.module_id = m.id AND up.user_id = ${userId}
      GROUP BY c.id
      ORDER BY c.id
    `;
  } catch (error) {
    console.log("Database Error:", error);
    throw new Error("Failed to fetch courses");
  }
}

export async function fetchCourseBySlug(
  slug: string,
  userId: string,
): Promise<CourseWithModules | null> {
  try {
    const [course] = await sql<Omit<Course, "progress">[]>`
      SELECT id, title, slug, description, "textColor", "bgColor"
      FROM courses
      WHERE slug = ${slug}
    `;
    if (!course) {
      return null;
    }

    const modules = await sql<Module[]>`
      SELECT
        m.id,
        m.slug,
        m.title,
        m.order_index,
        (up.completed_at IS NOT NULL) AS completed
      FROM modules m
      LEFT JOIN user_progress up
        ON up.module_id = m.id AND up.user_id = ${userId}
      WHERE m.course_id = ${course.id}
      ORDER BY m.order_index
    `;

    const done = modules.filter((m) => m.completed).length;
    const progress = modules.length
      ? Math.round((done / modules.length) * 100)
      : 0;

    return { ...course, progress, modules };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch course.");
  }
}
