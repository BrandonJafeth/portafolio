// components/ui/NavItem.tsx
"use client";

import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

export default function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`text-sm font-medium block relative group transition-colors ${
        isActive
          ? "text-gray-900 dark:text-gray-100" 
          : "text-gray-500 dark:text-gray-400 sm:hover:text-gray-700 dark:sm:hover:text-gray-300" 
      }`}
    >
      {label}
   
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-400 dark:bg-gray-500 scale-x-0 transition-transform origin-left duration-300 sm:group-hover:scale-x-100 sm:block hidden ${
          isActive ? "scale-x-100" : ""
        }`}
      ></span>
    </Link>
  );
}
