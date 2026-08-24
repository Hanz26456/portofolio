import React, { useState, useEffect } from 'react';
import { FiX, FiGithub } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[9999] p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/10 dark:shadow-violet-500/25 w-full max-w-lg overflow-hidden transform transition-all duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        {/* GAMBAR PROYEK */}
        <div className="relative w-full h-56 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white leading-snug">
              {project.title}
            </h2>
            <button
              onClick={handleClose}
              className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 -mt-1 -mr-1 cursor-pointer"
              aria-label="Tutup modal"
            >
              <FiX size={22} />
            </button>
          </div>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed max-h-60 overflow-y-auto pr-1">
            {project.fullDescription}
          </p>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 hover:bg-violet-700 text-white p-3 px-5 rounded-full w-full cursor-pointer shadow-md shadow-violet-500/20 transition-colors"
          >
            <FiGithub size={18} />
            <span>Kode Sumber</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.25s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
