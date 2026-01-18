// components/ui/NavItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({ href, label }: NavItemProps) {
  const { t } = useTranslations();
  const pathname = usePathname();
  
  const isActive = pathname === href;
  const translatedLabel = t(`nav.${label.toLowerCase()}`, label);
  
  return (
    <Link
      href={href}
      className={`text-sm font-medium block relative group transition-colors duration-300 ${
        isActive
          ? "text-primary" 
          : "text-muted-foreground hover:text-foreground" 
      }`}
    >
      {translatedLabel}
   
      <span
        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary/80 shadow-[0_0_8px_rgba(34,197,89,0.5)] transition-transform origin-left duration-300 sm:group-hover:scale-x-100 ${isActive ? 'scale-x-100 block' : 'scale-x-0 hidden sm:block'}`}
      ></span>
    </Link>
  );
}
