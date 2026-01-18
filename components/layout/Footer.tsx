"use client";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useTranslations } from "@/hooks/useTranslations";
import siteConfig from "@/config/site.config";

export default function Footer() {
  const { t } = useTranslations();
  
  return (
    <footer className="bg-background border-t border-white/10 py-12">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center gap-8">
        <a
          href="https://www.instagram.com/jb_ca_07/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <FaInstagram size={24} />
        </a>
        
        <a
          href={siteConfig.socialLinks?.github || "https://github.com/BrandonJafeth"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <FaGithub size={24} />
        </a>
        
        <a
          href={siteConfig.socialLinks?.linkedin || "https://www.linkedin.com/in/brandonca/"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      <p className="text-center mt-8 text-sm text-muted-foreground">
        {t('footer.copyright')}
      </p>
    </footer>
  );
}
