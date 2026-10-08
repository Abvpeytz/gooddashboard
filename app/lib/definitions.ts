export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  progress: number;
  textColor: string;
  bgColor: string;
};

export type Module = {
  id: number;
  slug: string;
  title: string;
  order_index: number;
  completed: boolean;
};

export type CourseWithModules = Course & { modules: Module[] };
