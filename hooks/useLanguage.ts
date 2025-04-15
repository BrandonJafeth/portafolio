"use client";

import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '@/context/language';


export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  
  return context;
}