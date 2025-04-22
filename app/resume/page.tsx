"use client";

import { FaDownload } from 'react-icons/fa';
import { useTranslations } from '@/hooks/useTranslations';
import { useEffect, useState } from 'react';

export default function ResumePage() {
  const { t } = useTranslations();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <main className="container mx-auto px-4 py-4 md:py-8 max-w-5xl">
      <div className="flex flex-col space-y-4 md:space-y-6 h-[calc(100vh-80px)]">
        <div className="flex justify-end">
          <a 
            href="/Cv.pdf" 
            download
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-sm md:text-base"
          >
            <FaDownload className="mr-1 md:mr-2" />
            {t('resume.download')}
          </a>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex-grow">
          {isMobile ? (
            <object
              data="/Cv.pdf"
              type="application/pdf"
              className="w-full h-full"
            >
              <p className="p-4 text-center">
                Tu navegador no puede mostrar PDFs. 
                <a 
                  href="/Cv.pdf" 
                  download
                  className="text-green-600 ml-1"
                >
                  Descárgalo aquí
                </a>
              </p>
            </object>
          ) : (
            <iframe 
              src="/Cv.pdf#view=FitH" 
              className="w-full h-full border-none"
              title="CV de Brandon Carrillo"
            ></iframe>
          )}
        </div>
      </div>
    </main>
  );
}