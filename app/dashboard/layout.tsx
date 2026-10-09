import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid grid-rows-2 grid-cols-1 md:grid-cols-[200px_1fr] md:grid-rows-1 gap-2 m-2'>
      <div className='w-full flex-none'>
        <SideNav />
      </div>
      <main>{children}</main>
    </div>
  );
}
