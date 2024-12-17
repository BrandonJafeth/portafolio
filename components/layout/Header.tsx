"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { navLinks } from "@/config/navigation";
import { usePathname } from "next/navigation";
import NavItem from "@/components/ui/NavItem";
import {
  menuItemVariants,
  menuContainerVariants,
  iconVariants,
} from "@/components/animations/headerVariants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header role="banner">
      <nav
        aria-label="Main navigation"
        className="max-w-screen-xl mx-auto px-4 py-3 relative z-50"
      >
        <div className="w-full flex items-center justify-between px-6 py-2 sm:border sm:border-gray-700 dark:sm:border-white sm:rounded-full bg-transparent">
          <Link href="/" className="font-semibold text-xl text-foreground">
            BC
          </Link>

          <motion.button
            type="button"
            variants={iconVariants}
            whileTap="tap"
            className="text-gray-500 dark:text-gray-300 sm:hidden transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </motion.button>

    
          <ul className="hidden sm:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <NavItem href={href} label={label} isActive={pathname === href} />
              </li>
            ))}
          </ul>
        </div>

   
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm sm:hidden"
            onClick={toggleMenu}
          />
        )}

   
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-64 bg-background shadow-lg sm:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700"> 
                {/* Línea horizontal completa */}
                <span className="font-semibold text-xl text-foreground">BC</span>
                <motion.button
                  variants={iconVariants}
                  whileTap="tap"
                  type="button"
                  className="text-gray-500 dark:text-gray-300 transition-colors"
                  onClick={toggleMenu}
                  aria-label="Close navigation"
                >
                  <AiOutlineClose size={24} />
                </motion.button>
              </div>
              <ul className="flex flex-col gap-4 mt-3 p-4">
                {navLinks.map(({ href, label }, index) => (
                  <motion.li
                    key={href}
                    variants={menuItemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={toggleMenu}
                  >
                    <NavItem href={href} label={label} isActive={pathname === href} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
