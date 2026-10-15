"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "@/app/lib/actions";

const links = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "About",
    href: "/dashboard/about",
    icon: QuestionMarkCircleIcon,
  },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <div className='good-dashboard__sidenav flex flex-col bg-gray rounded-2xl pt-5 h-svh'>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow items-center justify-center gap-2 p-4 h-12 text-sm font-semibold border-l-5 md:flex-none md:justify-start text-black",
              {
                "border-transparent": pathname !== link.href,
                "border-green-dark": pathname === link.href,
              },
            )}
          >
            <span className='hidden uppercase md:block'>{link.name}</span>
          </Link>
        );
      })}
      <form action={signOut} className='mt-auto'>
        <button
          type='submit'
          className='flex w-full items-center justify-center gap-2 p-4 h-12 text-sm font-semibold md:flex-none md:justify-start text-black'
        >
          <span className='hidden uppercase md:block cursor-pointer'>Log out</span>
        </button>
      </form>
    </div>
  );
}
