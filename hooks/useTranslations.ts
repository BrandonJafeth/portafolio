"use client";

import { useLanguage } from '@/hooks/useLanguage';
import { useEffect, useState } from 'react';

// Definición de tipos específicos en lugar de any
type NestedTranslations = {
  [key: string]: string | NestedTranslations | Record<string, unknown>;
};

type TranslationsType = Record<string, string | NestedTranslations | Record<string, unknown>>;

// Caché para almacenar las traducciones cargadas
const translationsCache: Record<string, TranslationsType> = {};

export function useTranslations() {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<TranslationsType>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTranslations() {
      setIsLoading(true);
      try {
        // Si las traducciones ya están en caché, las usamos
        if (translationsCache[language]) {
          setTranslations(translationsCache[language]);
        } else {
          // Si no, cargamos el archivo de traducciones dinámicamente
          const translationData = await import(`@/translations/${language}.json`);
          // Acceder de forma segura usando destructuring
          const { default: translationContent } = translationData;
          
          translationsCache[language] = translationContent;
          setTranslations(translationContent);
        }
      } catch (error) {
        console.error(`Error al cargar traducciones para ${language}:`, error);
        // Si hay un error, intentamos cargar el inglés como fallback
        if (language !== 'en') {
          try {
            const fallbackData = await import('@/translations/en.json');
            const { default: fallbackContent } = fallbackData;
            setTranslations(fallbackContent);
          } catch (e) {
            console.error('Error al cargar traducciones de respaldo:', e);
            setTranslations({});
          }
        } else {
          setTranslations({});
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadTranslations();
  }, [language]);

  // Función para obtener una traducción por clave
  const t = (key: string, fallback?: string): string => {
    if (isLoading) return fallback || key;

    try {
      const keys = key.split('.');
      let currentObj: unknown = translations;

      // Navegamos por el objeto de traducciones usando las claves
      for (const k of keys) {
        if (!currentObj || typeof currentObj !== 'object') {
          return fallback || key;
        }
        
        currentObj = (currentObj as Record<string, unknown>)[k];
      }

      // Verificar que el valor final es una cadena
      if (typeof currentObj === 'string') {
        return currentObj;
      }
      
      return fallback || key;
    } catch (error) {
      console.error(`Error al acceder a la traducción: ${key}`, error);
      return fallback || key;
    }
  };

  return { t, isLoading, language };
}