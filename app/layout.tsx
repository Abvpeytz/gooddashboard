import type { Metadata } from "next";
import '@/app/ui/globals.css';
import { fraunces, jakarta } from './ui/fonts';

export const metadata: Metadata = {
  title: "Good Dashboard",
  description: "A dashboard created by Andreas Vestergaard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang='en'
      className={`${jakarta.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col font-base bg-brand-500'>{children}</body>
    </html>
  );
}
