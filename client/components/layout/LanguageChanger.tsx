import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '../ui/button';
import { IconLanguage } from '@tabler/icons-react';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'km', label: 'ភាសាខ្មែរ' },
  { code: 'fr', label: 'Français' },
];

export function LanguageChanger() {
  const { language, setLanguage } = useApp();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='relative'>
      {/* Trigger */}
      <Button variant='outline' size='icon' onClick={() => setShowMenu((prev) => !prev)}>
        <IconLanguage size={20} />
      </Button>

      <AnimatePresence>
        {showMenu && (
          <>
            {/* Click outside */}
            <div onClick={() => setShowMenu(false)} className='fixed inset-0 z-40' />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className='absolute right-0 z-50 mt-5 w-48 overflow-hidden rounded-xl border border-white/20 bg-popover/60 p-1 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-slate-700/50'
            >
              {LANGUAGES.map((lang) => {
                const isActive = language === lang.code;
                const btnClasses = isActive
                  ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                  : 'text-gray-800 hover:bg-white/30 dark:text-gray-200 dark:hover:bg-slate-700/40';

                return (
                  <Button
                    key={lang.code}
                    variant='ghost'
                    size='sm'
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setShowMenu(false);
                    }}
                    className={`my-1 w-full px-4 py-2 text-left text-sm duration-150 ${btnClasses}`}
                  >
                    {lang.label}
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
