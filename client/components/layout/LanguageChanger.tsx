import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '../ui/button';
import { IconLanguage } from '@tabler/icons-react';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'km', label: 'ភាសាខ្មែរ', short: 'ខ្មែរ' },
  { code: 'fr', label: 'Français', short: 'FR' },
];

export function LanguageChanger() {
  const { language, setLanguage } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className='relative'>
      <Button variant='outline' size='icon' onClick={() => setShowMenu((prev) => !prev)}>
        <IconLanguage size={isMobile ? 18 : 20} />
      </Button>

      <AnimatePresence>
        {showMenu && (
          <>
            <div onClick={() => setShowMenu(false)} className='fixed inset-0 z-40' />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className='absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-white/20 bg-popover/60 p-1 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-slate-700/50 md:w-48'
            >
              {LANGUAGES.map((lang) => {
                const isActive = language === lang.code;
                return (
                  <Button
                    key={lang.code}
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setShowMenu(false);
                    }}
                    className={`my-0.5 w-full px-3 py-2 text-left text-xs transition-colors md:px-4 md:text-sm ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-800 hover:bg-white/30 dark:text-gray-200 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    {isMobile ? lang.short : lang.label}
                  </Button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
