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
    <header role="banner" className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300 pointer-events-none">
      <nav
        aria-label="Main navigation"
        className="w-full max-w-screen-xl relative z-50 pointer-events-auto"
      >
        <div className="w-full flex items-center justify-between px-6 py-3 border border-white/10 bg-background/60 backdrop-blur-xl rounded-full shadow-lg transition-all duration-300">
          <Link href="/" className="font-bold text-xl text-foreground tracking-tight hover:text-primary transition-colors">
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
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
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
                    className="absolute right-0 mt-2 w-32 bg-popover border border-border rounded-lg shadow-xl p-1 z-50 overflow-hidden"
                  >
                    <ul>
                      <li>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                            language === 'en' 
                              ? 'bg-primary/20 text-primary font-medium' 
                              : 'text-foreground hover:bg-muted'
                          }`}
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
                          className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                            language === 'es' 
                              ? 'bg-primary/20 text-primary font-medium' 
                              : 'text-foreground hover:bg-muted'
                          }`}
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
                className="h-full w-full bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl pointer-events-auto"
              >
                <div className="flex items-center justify-between p-4 border-b border-border"> 
                  <span className="font-bold text-xl text-foreground">BC</span>
                  <motion.button
                    variants={iconVariants}
                    whileTap="tap"
                    type="button"
                    className="text-muted-foreground hover:text-foreground transition-colors"
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
                    className="mt-4 border-t border-border pt-4"
                  >
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">
                        {language === 'en' ? 'Language' : 'Idioma'}
                      </p>
                      <div className="flex gap-3">
                        <button
                          className={`px-4 py-2.5 text-sm rounded-lg flex-1 transition-all duration-200 ${
                            language === 'en' 
                              ? 'bg-primary/20 text-primary font-bold border border-primary/20 shadow-sm' 
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                          onClick={() => setLanguage('en')}
                        >
                          EN
                        </button>
                        <button
                          className={`px-4 py-2.5 text-sm rounded-lg flex-1 transition-all duration-200 ${
                            language === 'es' 
                              ? 'bg-primary/20 text-primary font-bold border border-primary/20 shadow-sm' 
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
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
