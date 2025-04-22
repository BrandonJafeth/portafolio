// components/ui/NavItem.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/hooks/useTranslations";
import { useEffect, useState } from "react";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({ href, label }: NavItemProps) {
  const { t } = useTranslations();
  const pathname = usePathname();
  // Usamos useState para evitar inconsistencias de hidratación
  const [mounted, setMounted] = useState(false);
  
  // useEffect solo se ejecuta en el cliente
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isActive = pathname === href;
  const translatedLabel = t(`nav.${label.toLowerCase()}`, label);
  
  return (
    <Link
      href={href}
      className={`text-sm font-medium block relative group transition-colors ${
        mounted && isActive
          ? "text-gray-900 dark:text-gray-100" 
          : "text-gray-500 dark:text-gray-400 sm:hover:text-gray-700 dark:sm:hover:text-gray-300" 
      }`}
    >
      {translatedLabel}
   
      {/* Solo renderizamos el indicador cuando el componente está montado */}
      {mounted && (
        <span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-400 dark:bg-gray-500 transition-transform origin-left duration-300 sm:group-hover:scale-x-100 sm:block hidden"
          style={{ transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
        ></span>
      )}
    </Link>
  );
}
