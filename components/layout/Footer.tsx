import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2C2C34] text-white py-8 dark:bg-[#34343b]">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center gap-8">
        <a
          href="https://www.instagram.com/jb_ca_07/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-gray-300 transition-colors"
        >
          <FaInstagram size={24} />
        </a>
        
        <a
          href="https://github.com/BrandonJafeth"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-300 transition-colors"
        >
          <FaGithub size={24} />
        </a>
        
        <a
          href="https://www.linkedin.com/in/brandon-carrillo-%C3%A1lvarez-13187927a/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-gray-300 transition-colors"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
      <p className="text-center mt-4 text-sm">
      Copyright © | {new Date().getFullYear()} Brandon Carrillo
      </p>
    </footer>
  );
}
