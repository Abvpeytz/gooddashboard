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
    <div className='good-dashboard__sidenav flex flex-col bg-ink-100 rounded-2xl pt-5 h-svh'>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow items-center justify-center gap-2 p-4 h-12 text-sm font-semibold border-l-5 md:flex-none md:justify-start text-ink-900",
              {
                "border-transparent": pathname !== link.href,
                "border-sun-500": pathname === link.href,
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
          className='flex w-full items-center justify-center gap-2 p-4 h-12 text-sm font-semibold md:flex-none md:justify-start text-ink-900'
        >
          <span className='hidden uppercase md:block'>Log out</span>
        </button>
      </form>
    </div>
  );
}
