import postgres from "postgres";
import { Course } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchCourses() {
  try {
    const data = await sql<Course[]>`SELECT * FROM courses`;

    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
