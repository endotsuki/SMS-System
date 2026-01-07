import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockClasses, mockAssignments, mockUsers } from '@/data/mock';
import { Input } from './input';
import { Button } from './button';
import { IconBook, IconFileText, IconSearch, IconUsers, IconX } from '@tabler/icons-react';

interface SearchResult {
  id: string;
  type: 'class' | 'assignment' | 'user';
  title: string;
  description?: string;
  icon: React.ReactNode;
  path?: string;
}

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = 'Search...' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMobile, setIsMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const query = searchTerm.toLowerCase();
    const searchResults: SearchResult[] = [];

    Object.values(mockClasses).forEach((cls) => {
      if (cls.name.toLowerCase().includes(query)) {
        searchResults.push({
          id: cls.id,
          type: 'class',
          title: cls.name,
          description: cls.name,
          icon: <IconBook size={16} />,
          path: `/class/${cls.id}`,
        });
      }
    });

    Object.values(mockAssignments).forEach((assignment) => {
      if (assignment.title.toLowerCase().includes(query) || assignment.description.toLowerCase().includes(query)) {
        searchResults.push({
          id: assignment.id,
          type: 'assignment',
          title: assignment.title,
          description: assignment.description.substring(0, 50) + '...',
          icon: <IconFileText size={16} />,
          path: `/assignment/${assignment.id}`,
        });
      }
    });

    Object.values(mockUsers).forEach((user) => {
      if (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)) {
        searchResults.push({
          id: user.id,
          type: 'user',
          title: user.name,
          description: `${user.role} · ${user.department}`,
          icon: <IconUsers size={16} />,
        });
      }
    });

    setResults(searchResults.slice(0, 8));
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectResult(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    if (result.path) {
      navigate(result.path);
    }
    setSearchTerm('');
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className='relative max-w-md flex-1'>
      <div className='relative'>
        <IconSearch
          size={isMobile ? 16 : 18}
          className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500'
        />
        <Input
          ref={inputRef}
          type='text'
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm && setIsOpen(true)}
          className='w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-10 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400 md:pl-10'
        />

        {searchTerm && (
          <Button
            variant='ghost'
            onClick={clearSearch}
            className='absolute right-2 top-1/2 h-auto -translate-y-1/2 rounded p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:text-gray-500 dark:hover:bg-slate-700 dark:hover:text-gray-200 md:right-3'
          >
            <IconX size={isMobile ? 14 : 16} />
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <>
            <div onClick={() => setIsOpen(false)} className='fixed inset-0 z-40' />

            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.15 }}
              className='absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 md:max-w-2xl'
            >
              <div className='max-h-[70vh] overflow-y-auto md:max-h-96'>
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-start gap-2 border-b border-gray-100 px-3 py-2.5 text-left transition-colors last:border-b-0 dark:border-slate-700 md:gap-3 md:px-4 md:py-3 ${
                      selectedIndex === index
                        ? 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/50'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                    whileHover={{ paddingLeft: isMobile ? '0.875rem' : '1.25rem' }}
                  >
                    <div className='mt-0.5 flex-shrink-0 text-gray-400 dark:text-gray-500'>{result.icon}</div>

                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-xs font-medium text-gray-900 dark:text-white md:text-sm'>{result.title}</p>
                      {result.description && <p className='truncate text-xs text-gray-500 dark:text-gray-400'>{result.description}</p>}
                    </div>

                    <span className='flex-shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-xs capitalize text-gray-600 dark:bg-slate-700 dark:text-gray-300 md:px-2 md:py-1'>
                      {result.type}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className='hidden border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400 md:block'>
                Showing {results.length} result{results.length !== 1 ? 's' : ''} · Use ↑↓ to navigate, Enter to select
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && searchTerm && results.length === 0 && (
          <>
            <div onClick={() => setIsOpen(false)} className='fixed inset-0 z-40' />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-center shadow-lg dark:border-slate-700 dark:bg-slate-800 md:px-4 md:py-3'
            >
              <p className='text-xs text-gray-500 dark:text-gray-400 md:text-sm'>No results for "{searchTerm}"</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
