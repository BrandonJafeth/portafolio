"use client";

import { ReactNode, useState, useEffect } from 'react';
import { LanguageContext, Language } from './LanguageContext';
import { parseCookies, setCookie } from 'nookies';

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export function LanguageProvider({ children, initialLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  
  // Utilizamos un efecto para manejar el acceso a localStorage solo en el cliente
  useEffect(() => {
    // Si el idioma inicial es el default ('en'), verificamos localStorage por si hay preferencia guardada
    if (initialLanguage === 'en') {
      try {
        const localLanguage = localStorage.getItem('language') as Language;
        if (localLanguage && (localLanguage === 'en' || localLanguage === 'es') && localLanguage !== language) {
          setLanguage(localLanguage);
          setCookie(null, 'language', localLanguage, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
          });
        }
      } catch (error) {
        console.error('Error al acceder a localStorage:', error);
      }
    }
  }, [initialLanguage]);
  
  // Función para cambiar el idioma y sincronizar en cookies y localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('language', lang);
        setCookie(null, 'language', lang, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });
      } catch (error) {
        console.error('Error al guardar preferencia de idioma:', error);
      }
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}