"use client";

import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState } from 'react';

export default function ResumePage() {
  const { t } = useTranslations();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Verificar al cargar
    checkIfMobile();
    
    // Verificar al cambiar el tamaño de la ventana
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-4 md:py-8 max-w-5xl">
      {isMobile ? (
        // Visualización para móviles
        <div className="flex flex-col h-[calc(100vh-100px)]">
          <div className="flex justify-between items-center mb-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <h2 className="text-sm text-gray-700 dark:text-gray-300">
              {t('common.downloadCV')}
            </h2>
            <div className="flex space-x-2">
              <a 
                href="/Cv.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
              >
                <FaExternalLinkAlt className="mr-1" />
                {t('common.open')}
              </a>
              <a 
                href="/Cv.pdf" 
                download
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
              >
                <FaDownload className="mr-1" />
                {t('resume.download')}
              </a>
            </div>
          </div>
          
          <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <iframe 
              src="/Cv.pdf" 
              className="w-full h-full border-none"
              title="CV de Brandon Carrillo"
            />
          </div>
        </div>
      ) : (
        // Visualización para desktop
        <div className="flex flex-col space-y-4 md:space-y-6 h-[calc(100vh-80px)]">
          <div className="flex justify-end">
            <a 
              href="/Cv.pdf" 
              download
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaDownload className="mr-2" />
              {t('resume.download')}
            </a>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex-grow">
            <iframe 
              src="/Cv.pdf#view=FitH" 
              className="w-full h-full border-none"
              title="CV de Brandon Carrillo"
            />
          </div>
        </div>
      )}
    </main>
  );
}