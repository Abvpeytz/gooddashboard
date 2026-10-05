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
    <div className='good-dashboard__sidenav bg-white rounded-2xl p-5 h-svh'>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-12 grow items-center justify-center gap-2 text-sm font-medium md:flex-none md:justify-start text-brand-400",
              {
                "text-brand-500": pathname === link.href,
              },
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
