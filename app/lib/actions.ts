"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { deleteUserProgressByCourse, toggleUserProgressForModule } from "@/app/lib/data";

const LoginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const parsed = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return "Invalid credentials.";
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return "Invalid credentials.";
  }

  // redirect throws internally, so it must sit outside any try/catch.
  const redirectTo = (formData.get("redirectTo") as string) || "/dashboard";
  redirect(redirectTo);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

// Toggle one module's completion for the current user.
export async function toggleModule(
  moduleId: number,
  completed: boolean,
  courseSlug: string,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  await toggleUserProgressForModule(user.id, moduleId, completed);

  revalidatePath("/", "layout");
  redirect(`/dashboard/course/${courseSlug}`);
}

// Reset all progress for a course (by slug) for the current user.
export async function resetCourse(courseSlug: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  await deleteUserProgressByCourse(user.id, courseSlug);

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
