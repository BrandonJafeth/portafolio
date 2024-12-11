"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navLinks } from "@/config/navigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveSection(pathname);
    }
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderNavItem = (href: string, label: string) => {
    const isActive = activeSection === href;

    return (
      <Link
        href={href}
        className={`text-sm font-medium block relative group transition-colors ${
          isActive
            ? "text-gray-900 dark:text-gray-100" // Adaptable en modo claro/oscuro
            : "text-gray-500 dark:text-gray-400 sm:hover:text-gray-700 dark:sm:hover:text-gray-300"
        }`}
      >
        {label}
        {/* Línea animada debajo del link, solo en desktop */}
        <span
          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gray-400 dark:bg-gray-500 scale-x-0 transition-transform origin-left duration-300 sm:group-hover:scale-x-100 sm:block hidden ${
            isActive ? "scale-x-100" : ""
          }`}
        ></span>
      </Link>
    );
  };

  return (
    <header role="banner">
      <nav
        aria-label="Main navigation"
        className="max-w-screen-xl mx-auto px-4 py-3 relative z-50"
      >
        <div className="w-full flex items-center justify-between px-6 py-2 sm:border sm:rounded-full bg-transparent">
          <Link href="/" className="font-semibold text-xl text-foreground">
            BC
          </Link>

          <button
            type="button"
            className="text-gray-500 dark:text-gray-300 sm:hover:text-gray-700 dark:sm:hover:text-gray-100 transition-colors block sm:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>

          {/* Links para desktop */}
          <ul className="hidden sm:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>{renderNavItem(href, label)}</li>
            ))}
          </ul>
        </div>

        {/* Fondo al abrir el menú móvil */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Menú móvil */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-background border-l transform transition-transform duration-300 ease-in-out sm:hidden ${
            isOpen ? "translate-x-0 menu-open" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-xl text-foreground">BC</span>
            <button
              type="button"
              className="text-gray-500 dark:text-gray-300 transition-colors"
              onClick={toggleMenu}
              aria-label="Close navigation"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          <ul className="flex flex-col gap-4 mt-3 p-4">
            {navLinks.map(({ href, label }) => (
              <li
                key={href}
                onClick={() => setIsOpen(false)}
                className="menu-enter"
              >
                {renderNavItem(href, label)}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
