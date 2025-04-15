"use client";

import { ReactNode, useState, useEffect } from 'react';
import { LanguageContext, Language } from './LanguageContext';
import { parseCookies, setCookie } from 'nookies';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  
  // Utilizamos un efecto para manejar el acceso a cookies y localStorage solo en el cliente
  useEffect(() => {
    // Marcamos que el componente está montado
    setMounted(true);
    
    // Primero intentamos recuperar el idioma desde las cookies (establecido por middleware)
    try {
      const cookies = parseCookies();
      const savedLanguage = cookies.language as Language;
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        setLanguage(savedLanguage);
      } else {
        // Si no hay cookie, intentamos con localStorage como respaldo
        const localLanguage = localStorage.getItem('language') as Language;
        if (localLanguage && (localLanguage === 'en' || localLanguage === 'es')) {
          setLanguage(localLanguage);
          // Sincronizamos la cookie con localStorage
          setCookie(null, 'language', localLanguage, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
        }
      }
    } catch (error) {
      console.error('Error al acceder a cookies o localStorage:', error);
    }
  }, []);
  
  // Función para cambiar el idioma y sincronizar en cookies y localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    
    // Solo intentamos guardar si estamos en el cliente
    if (typeof window !== 'undefined') {
      try {
        // Guardamos en localStorage como respaldo
        localStorage.setItem('language', lang);
        
        // Actualizamos la cookie (se sincronizará con el middleware)
        setCookie(null, 'language', lang, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
      } catch (error) {
        console.error('Error al guardar preferencia de idioma:', error);
      }
    }
  };
  
  // Si el componente no está montado, devolvemos los children con un valor por defecto
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