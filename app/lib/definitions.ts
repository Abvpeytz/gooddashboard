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