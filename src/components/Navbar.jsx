import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { RiSunLine, RiMoonLine } from "react-icons/ri";

const Navbar = ({ hidden = false }) => {
  // ⛔ Saat hidden, jangan render apa pun
  if (hidden) return null;

  const [active, setActive] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 150);
    handleScroll(); // init posisi saat mount
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar relative z-50 py-6 flex items-center justify-between px-2 sm:px-6 md:px-12">
      {/* Logo */}
      <div className="logo">
        <a href="#home" className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300 flex items-center gap-2">
          <span>Portofolio</span>
          <span className="inline-block w-2 h-2 rounded-full bg-violet-500 animate-pulse"></span>
        </a>
      </div>

      {/* Menu & Theme Toggle */}
      <div className="flex items-center gap-3 sm:gap-6">
        <ul
          className={`flex items-center sm:gap-8 gap-4 
            md:static fixed left-1/2 -translate-x-1/2 md:translate-x-0 
            md:opacity-100 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg 
            md:bg-transparent md:backdrop-blur-none
            border border-zinc-200/70 dark:border-zinc-800/70 md:border-none
            shadow-lg md:shadow-none
            p-3.5 sm:p-4 rounded-full md:rounded-none
            transition-all duration-300 md:transition-none
            ${active ? "top-4 opacity-100" : "-top-20 md:top-0 opacity-0 md:opacity-100"}`}
        >
          <li>
            <a href="#home" className="sm:text-base text-sm font-medium text-zinc-700 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-white transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="sm:text-base text-sm font-medium text-zinc-700 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-white transition-colors">
              About
            </a>
          </li>
          <li>
            <a href="#project" className="sm:text-base text-sm font-medium text-zinc-700 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-white transition-colors">
              Project
            </a>
          </li>
          <li>
            <a href="#contact" className="sm:text-base text-sm font-medium text-zinc-700 hover:text-violet-600 dark:text-zinc-300 dark:hover:text-white transition-colors">
              Contact
            </a>
          </li>
        </ul>

        {/* Theme Switcher Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
          title={isDark ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap"}
          className="p-2.5 rounded-full bg-white/90 hover:bg-zinc-100 dark:bg-zinc-800/90 dark:hover:bg-zinc-700 text-zinc-700 dark:text-amber-300 border border-zinc-200/80 dark:border-zinc-700/80 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer"
        >
          {isDark ? (
            <RiSunLine className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
          ) : (
            <RiMoonLine className="w-5 h-5 text-violet-600 transition-transform duration-300 -rotate-12 hover:rotate-0" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
