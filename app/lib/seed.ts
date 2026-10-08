/**
 * Supabase seed script
 *
 * Run:            npx tsx scripts/seed.ts
 * Clean re-seed:  npx tsx scripts/seed.ts --reset   (deletes modules + progress first)
 *
 * Requires in .env.local:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   <- never expose this client-side
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const RESET = process.argv.includes("--reset");

// ─── SEED DATA ────────────────────────────────────────────────────────────────

const USERS = [
  {
    email: "alice@example.com",
    password: "Password123!",
    name: "Alice Johnson",
  },
  { email: "bob@example.com", password: "Password123!", name: "Bob Smith" },
  {
    email: "cara@example.com",
    password: "Password123!",
    name: "Cara Williams",
  },
];

// Courses only contain columns that exist on the table:
// title, slug, description, textColor, bgColor (id is generated, progress is computed)
const COURSES = [
  {
    slug: "code-quality",
    title: "Code Quality",
    description: "Clean, maintainable code practices",
    bgColor: "#dbeafe",
    textColor: "#1e3a5f",
    modules: [
      { slug: "git", title: "Git Basics", order_index: 1 },
      { slug: "merge-requests", title: "Merge Requests", order_index: 2 },
      { slug: "code-review", title: "Code Review", order_index: 3 },
      { slug: "linting", title: "Linting & Formatting", order_index: 4 },
    ],
  },
  {
    slug: "internet-safety",
    title: "Internet Safety",
    description: "Security fundamentals for developers",
    bgColor: "#dcfce7",
    textColor: "#14532d",
    modules: [
      { slug: "phishing", title: "Phishing Awareness", order_index: 1 },
      { slug: "secrets", title: "Secrets & API Keys", order_index: 2 },
      { slug: "dependencies", title: "Dependency Safety", order_index: 3 },
    ],
  },
  {
    slug: "team-workflow",
    title: "Team Workflow",
    description: "How we collaborate and ship",
    bgColor: "#fef9c3",
    textColor: "#713f12",
    modules: [
      { slug: "standups", title: "Standups & Ceremonies", order_index: 1 },
      { slug: "ticketing", title: "Ticketing & Planning", order_index: 2 },
      { slug: "deployment", title: "Deployment Process", order_index: 3 },
    ],
  },
  {
    slug: "dev-environment",
    title: "Dev Environment",
    description: "Optimising your local setup",
    bgColor: "#f3e8ff",
    textColor: "#3b0764",
    modules: [
      { slug: "tooling", title: "Essential Tooling", order_index: 1 },
      { slug: "env-vars", title: "Environment Variables", order_index: 2 },
      { slug: "docker", title: "Docker Basics", order_index: 3 },
    ],
  },
];

// Sample progress, keyed by user email -> list of "course-slug/module-slug"
const SAMPLE_PROGRESS: Record<string, string[]> = {
  "alice@example.com": [
    "code-quality/git",
    "code-quality/merge-requests",
    "code-quality/code-review",
  ],
  "bob@example.com": ["code-quality/git"],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function log(msg: string) {
  console.log(`  ${msg}`);
}
function section(msg: string) {
  console.log(`\n▶ ${msg}`);
}

// ─── SEEDERS ──────────────────────────────────────────────────────────────────

async function resetTables() {
  section("Reset (--reset)");

  // Deleting modules also cascades to user_progress, but we clear progress explicitly.
  const { error: progressErr } = await supabase
    .from("user_progress")
    .delete()
    .gt("id", 0);
  if (progressErr)
    throw new Error(`Reset user_progress: ${progressErr.message}`);

  const { error: modulesErr } = await supabase
    .from("modules")
    .delete()
    .gt("id", 0);
  if (modulesErr) throw new Error(`Reset modules: ${modulesErr.message}`);

  log("✓ Cleared user_progress and modules");
  log(
    "ℹ Sequences are not reset. If you hit a *_pkey error, run the setval SQL.",
  );
}

/** Returns a map of "course-slug/module-slug" -> module id */
async function seedCoursesAndModules() {
  section("Courses & Modules");

  const moduleIdByKey = new Map<string, number>();

  for (const { modules, ...course } of COURSES) {
    const { data: courseRow, error: courseErr } = await supabase
      .from("courses")
      .upsert(course, { onConflict: "slug" })
      .select("id")
      .single();

    if (courseErr)
      throw new Error(`Course "${course.slug}": ${courseErr.message}`);
    log(`✓ Course: ${course.title}`);

    const moduleRows = modules.map((m) => ({ ...m, course_id: courseRow.id }));

    const { data: moduleData, error: moduleErr } = await supabase
      .from("modules")
      .upsert(moduleRows, { onConflict: "course_id,slug" })
      .select("id, slug");

    if (moduleErr)
      throw new Error(`Modules for "${course.slug}": ${moduleErr.message}`);

    for (const m of moduleData ?? []) {
      moduleIdByKey.set(`${course.slug}/${m.slug}`, m.id);
      log(`    ↳ ${m.slug}`);
    }
  }

  return moduleIdByKey;
}

/** Returns a map of email -> user id */
async function seedUsers() {
  section("Users");

  const userIdByEmail = new Map<string, string>();

  // Fetch existing auth users once (default page size is 50, plenty for seed data)
  const { data: listData, error: listErr } =
    await supabase.auth.admin.listUsers();
  if (listErr) throw new Error(`List users: ${listErr.message}`);
  const existing = listData.users;

  for (const user of USERS) {
    let userId: string;
    const match = existing.find((u) => u.email === user.email);

    if (match) {
      log(`⚠ Auth user already exists: ${user.email}`);
      userId = match.id;
    } else {
      const { data, error } = await supabase.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true, // skip confirmation email (dev only)
        user_metadata: { full_name: user.name }, // read by the handle_new_user trigger, if installed
      });
      if (error) throw new Error(`Auth user "${user.email}": ${error.message}`);
      userId = data.user.id;
      log(`✓ Auth user created: ${user.email}`);
    }

    // public.users columns: id, name, email (password lives in auth.users only).
    // If the handle_new_user trigger is installed, this upsert just updates the row it created.
    const { error: publicUserErr } = await supabase
      .from("users")
      .upsert(
        { id: userId, email: user.email, name: user.name },
        { onConflict: "id" },
      );
    if (publicUserErr)
      throw new Error(`public.users "${user.email}": ${publicUserErr.message}`);
    log("    ↳ public.users row upserted");

    userIdByEmail.set(user.email, userId);
  }

  return userIdByEmail;
}

async function seedSampleProgress(
  userIdByEmail: Map<string, string>,
  moduleIdByKey: Map<string, number>,
) {
  section("Sample Progress (for local testing)");

  const now = new Date().toISOString();
  const rows: { user_id: string; module_id: number; completed_at: string }[] =
    [];

  for (const [email, moduleKeys] of Object.entries(SAMPLE_PROGRESS)) {
    const userId = userIdByEmail.get(email);
    if (!userId) throw new Error(`Sample progress: unknown user ${email}`);

    for (const key of moduleKeys) {
      const moduleId = moduleIdByKey.get(key);
      if (moduleId === undefined)
        throw new Error(`Sample progress: unknown module ${key}`);
      rows.push({ user_id: userId, module_id: moduleId, completed_at: now });
    }
  }

  const { error } = await supabase
    .from("user_progress")
    .upsert(rows, { onConflict: "user_id,module_id" });

  if (error) throw new Error(`Progress: ${error.message}`);
  log(`✓ Upserted ${rows.length} progress rows`);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting seed...");

  if (RESET) await resetTables();

  const moduleIdByKey = await seedCoursesAndModules();
  const userIdByEmail = await seedUsers();
  await seedSampleProgress(userIdByEmail, moduleIdByKey);

  console.log("\n✅ Seed complete.\n");
}

main().catch((err) => {
  console.error("\n❌ Seed failed:", err.message);
  process.exit(1);
});
