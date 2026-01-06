import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '../ui/button';

export function LanguageChanger() {
  const { language, setLanguage } = useApp();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <div className='relative'>
      {/* Trigger Button */}
      <Button variant='outline' size='icon' onClick={() => setShowLanguageMenu((prev) => !prev)}>
        <Globe size={20} />
      </Button>

      <AnimatePresence>
        {showLanguageMenu && (
          <>
            {/* Click Outside Overlay */}
            <div onClick={() => setShowLanguageMenu(false)} className='fixed inset-0 z-40' />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className='absolute right-0 z-50 mt-3 w-48 overflow-hidden rounded-xl border border-white/20 bg-popover/50 shadow-xl shadow-black/10 backdrop-blur-md dark:border-slate-700/50'
            >
              {[
                { code: 'en', label: 'English' },
                { code: 'km', label: 'ភាសាខ្មែរ' },
                { code: 'fr', label: 'Français' },
              ].map((lang) => {
                const isActive = language === lang.code;

                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as any);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left text-sm duration-150 ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300'
                        : 'text-gray-800 hover:bg-white/30 dark:text-gray-200 dark:hover:bg-slate-700/40'
                    } `}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
