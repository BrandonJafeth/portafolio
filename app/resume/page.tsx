"use client";

import { FaDownload } from 'react-icons/fa';
import { useTranslations } from '@/hooks/useTranslations';

export default function ResumePage() {
  const { t } = useTranslations();

  return (
    <main className="container mx-auto px-4 pt-32 pb-16 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col space-y-6">
        
        {/* Header Actions */}
        <div className="w-full flex justify-end items-center px-2">
          <a 
            href="/BrandonCarrillo_Cv.pdf" 
            download
            className="group inline-flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <FaDownload className="text-xs" />
            {t('resume.download')}
          </a>
        </div>
        
        {/* PDF Viewer Container */}
        <div className="w-full h-[80vh] rounded-2xl overflow-hidden border border-border/40 bg-background/50 shadow-2xl backdrop-blur-sm relative group">
            {/* Decorative gradient behind */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none" />
            
            <iframe 
              src="/BrandonCarrillo_Cv.pdf#view=FitH" 
              className="w-full h-full border-none relative z-10"
              title="CV de Brandon Carrillo"
            />
        </div>
      </div>
    </main>
  );
}