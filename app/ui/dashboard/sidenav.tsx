"use client";

import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { HomeIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

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
    <div className='good-dashboard__sidenav bg-white rounded-2xl pt-5 h-svh'>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex grow items-center justify-center gap-2 p-4 h-12 text-sm font-bold border-l-5 md:flex-none md:justify-start text-brand-400",
              {
                "border-white": pathname !== link.href,
                "border-brand-400 bg-brand-500": pathname === link.href,
              },
            )}
          >
            <span className='hidden uppercase md:block'>{link.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
