"use client";

import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navLinks } from "@/config/navigation";



export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Función para renderizar el enlace correcto
  const renderNavItem = (href: string, label: string) => {
    if (href.endsWith(".pdf")) {
      // Enlace al PDF (usa <a>)
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground block"
        >
          {label}
        </a>
      );
    }

    // Para rutas internas, usamos <Link>
    return (
      <Link
        href={href}
        className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground block"
      >
        {label}
      </Link>
    );
  };

  return (
    <header role="banner">
      <nav aria-label="Main navigation" className="max-w-screen-xl mx-auto px-4 py-3 relative z-50">
        <div className="w-full flex items-center justify-between px-6 py-2 sm:border sm:rounded-full bg-transparent">
          {/* Enlace al inicio usando <Link> */}
          <Link href="/" className="font-semibold text-xl">
            BC
          </Link>

          <button
            type="button"
            className="text-foreground/80 hover:text-foreground transition-colors block sm:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>

          <ul className="hidden sm:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                {renderNavItem(href, label)}
              </li>
            ))}
          </ul>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-background border-l transform transition-transform duration-300 ease-in-out sm:hidden ${isOpen ? "translate-x-0 menu-open" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-xl">BC</span>
            <button
              type="button"
              className="text-foreground/80 hover:text-foreground transition-colors"
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
