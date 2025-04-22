"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";
import { navLinks } from "@/config/navigation";
import NavItem from "@/components/ui/NavItem";
import { useLanguage } from "@/hooks/useLanguage";
import {
  menuItemVariants,
  menuContainerVariants,
  iconVariants,
} from "@/components/animations/headerVariants";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage } = useLanguage();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleLanguageMenu = () => setIsLanguageOpen((prev) => !prev);

  return (
    <header role="banner">
      <nav
        aria-label="Main navigation"
        className="max-w-screen-xl mx-auto px-4 py-3 relative z-50"
      >
        <div className="w-full flex items-center justify-between px-6 py-2 sm:border sm:border-gray-600 dark:sm:border-white sm:rounded-full bg-transparent">
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

          {/* Desktop Navigation */}
          <ul className="hidden sm:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <NavItem href={href} label={label} />
              </li>
            ))}
            
            {/* Language Selector (Desktop) */}
            <li className="relative">
              <motion.button
                variants={iconVariants}
                whileTap="tap"
                className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                onClick={toggleLanguageMenu}
                aria-label="Change language"
              >
                <FaGlobeAmericas className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </motion.button>
              
              {/* Language Dropdown */}
              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1 z-50"
                  >
                    <ul>
                      <li>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm rounded-md ${language === 'en' ? 'bg-green-100 dark:bg-green-600 text-green-600 dark:text-green-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          onClick={() => {
                            setLanguage('en');
                            setIsLanguageOpen(false);
                          }}
                        >
                          English
                        </button>
                      </li>
                      <li>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm rounded-md ${language === 'es' ? 'bg-green-100 dark:bg-green-600 text-green-600 dark:text-green-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                          onClick={() => {
                            setLanguage('es');
                            setIsLanguageOpen(false);
                          }}
                        >
                          Español
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>
        </div>

        {/* Overlay for mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/30 sm:hidden z-40"
              onClick={toggleMenu}
            />
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <div className="fixed top-0 right-0 h-full w-64 sm:hidden z-50 pointer-events-none">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="h-full w-full bg-background shadow-lg pointer-events-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700"> 
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
                      <NavItem href={href} label={label} />
                    </motion.li>
                  ))}
                  
                  {/* Language Selector (Mobile) */}
                  <motion.li
                    variants={menuItemVariants}
                    custom={navLinks.length}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-2 border-t border-gray-200 dark:border-gray-700 pt-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                        {language === 'en' ? 'Language' : 'Idioma'}
                      </p>
                      <div className="flex gap-2">
                        <button
                          className={`px-4 py-2 text-sm rounded-md flex-1 ${language === 'en' ? 'bg-green-100 dark:bg-green-600 text-green-600 dark:text-green-100' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                          onClick={() => setLanguage('en')}
                        >
                          EN
                        </button>
                        <button
                          className={`px-4 py-2 text-sm rounded-md flex-1 ${language === 'es' ? 'bg-green-100 dark:bg-green-600 text-green-600 dark:text-green-100' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                          onClick={() => setLanguage('es')}
                        >
                          ES
                        </button>
                      </div>
                    </div>
                  </motion.li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}
