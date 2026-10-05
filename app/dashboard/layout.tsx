import SideNav from "@/app/ui/dashboard/sidenav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
  description: "The official Next.js Learn Dashboard built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-rows-2 grid-cols-1 md:grid-cols-[300px_1fr] md:grid-rows-1 gap-5 m-5'>
      <div className='w-full flex-none'>
        <SideNav />
      </div>
      <div className='bg-white rounded-2xl p-5'>{children}</div>
    </div>
  );
}
