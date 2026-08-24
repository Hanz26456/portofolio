import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";

const Footer = () => {
  const items = [
    { icon: <VscHome size={18} />, label: "Home", onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscAccount size={18} />, label: "About Me", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscArchive size={18} />, label: "Project", onClick: () => document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <footer className="mt-32 pb-10 flex flex-col items-center relative z-10">
      {/* Flex container adaptif */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6">
        
        {/* Judul - paling atas di mobile */}
        <div className="order-1 md:order-none flex flex-col items-center md:items-start gap-1">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">
            Portofolio
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Farhan Maulana. All rights reserved.
          </p>
        </div>

        {/* Ikon Sosmed - di tengah di mobile */}
        <div className="flex gap-4 order-2 md:order-none items-center">
          <a 
            href="https://github.com/Hanz26456" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-600 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200"
            aria-label="GitHub Farhan Maulana"
          >
            <i className="ri-github-fill ri-2x"></i>
          </a>
          <a 
            href="https://www.instagram.com/frhnmln26_/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-600 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200"
            aria-label="Instagram Farhan Maulana"
          >
            <i className="ri-instagram-fill ri-2x"></i>
          </a>
          <a 
            href="https://www.youtube.com/@FarhanCafe" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-zinc-600 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-white transition-colors duration-200"
            aria-label="YouTube Farhan Maulana"
          >
            <i className="ri-youtube-fill ri-2x"></i>
          </a>
        </div>

        {/* Dock - paling bawah di mobile */}
        <div className="order-3 md:order-none mt-6 md:mt-0">
          <Dock 
            items={items}
            panelHeight={30}
            baseItemSize={60}
            magnification={100}
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
