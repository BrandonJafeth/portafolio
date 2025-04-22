"use client";

import { FaDownload } from 'react-icons/fa';
import { useTranslations } from '@/hooks/useTranslations';

export default function ResumePage() {
  const { t } = useTranslations();

  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex flex-col space-y-6">
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
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="h-[calc(100vh-200px)] w-full">
            <iframe 
              src="/Cv.pdf#view=FitH" 
              className="w-full h-full border-none"
              title="CV de Brandon Carrillo"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}