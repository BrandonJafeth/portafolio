"use client";

import { ReactNode, useState, useEffect } from 'react';
import { LanguageContext, Language } from './LanguageContext';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  
  // Utilizamos un efecto para manejar el acceso a localStorage solo en el cliente
  useEffect(() => {
    // Marcamos que el componente está montado
    setMounted(true);
    
    // Recuperamos el idioma guardado en localStorage
    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        setLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error al acceder a localStorage:', error);
    }
  }, []);
  
  // Función para cambiar el idioma y guardarlo en localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Solo intentamos guardar en localStorage si estamos en el cliente
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', lang);
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
      }
    }
  };
  
  // Si el componente no está montado, devolvemos los children directamente
  // para evitar cambios de UI durante la hidratación
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage: handleSetLanguage }}>
        {children}
      </LanguageContext.Provider>
    );
  }
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}