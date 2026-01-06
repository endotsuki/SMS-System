import { useState, useRef, useEffect } from 'react';
import { Search, X, BookOpen, FileText, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { mockClasses, mockAssignments, mockUsers } from '@/data/mock';
import { Input } from './input';
import { Button } from './button';

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

export function SearchBar({ placeholder = 'Search classes, assignments, users...' }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Search logic
  useEffect(() => {
    if (searchTerm.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const query = searchTerm.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search classes
    Object.values(mockClasses).forEach((cls) => {
      if (cls.name.toLowerCase().includes(query)) {
        searchResults.push({
          id: cls.id,
          type: 'class',
          title: cls.name,
          description: cls.name,
          icon: <BookOpen size={16} />,
          path: `/class/${cls.id}`,
        });
      }
    });

    // Search assignments
    Object.values(mockAssignments).forEach((assignment) => {
      if (assignment.title.toLowerCase().includes(query) || assignment.description.toLowerCase().includes(query)) {
        searchResults.push({
          id: assignment.id,
          type: 'assignment',
          title: assignment.title,
          description: assignment.description.substring(0, 50) + '...',
          icon: <FileText size={16} />,
          path: `/assignment/${assignment.id}`,
        });
      }
    });

    // Search users
    Object.values(mockUsers).forEach((user) => {
      if (user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)) {
        searchResults.push({
          id: user.id,
          type: 'user',
          title: user.name,
          description: `${user.role} · ${user.department}`,
          icon: <Users size={16} />,
        });
      }
    });

    setResults(searchResults.slice(0, 8)); // Limit to 8 results
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
        <Search
          size={18}
          className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400 dark:text-gray-500'
        />
        <Input
          ref={inputRef}
          type='text'
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm && setIsOpen(true)}
          className='w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-500 transition-colors focus:outline-none dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400'
        />

        {/* Clear button */}
        {searchTerm && (
          <Button
            variant='ghost'
            onClick={clearSearch}
            className='absolute right-3 top-1/2 h-auto -translate-y-1/2 transform cursor-pointer rounded p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700 dark:text-gray-500 dark:hover:bg-slate-700 dark:hover:text-gray-200'
          >
            <X size={16} />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <>
            {/* Backdrop */}
            <div onClick={() => setIsOpen(false)} className='fixed inset-0 z-40' />

            {/* Results Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.15 }}
              className='absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800'
            >
              <div className='scrollbar-hide max-h-96 overflow-y-auto'>
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full cursor-pointer items-start gap-3 border-b border-gray-100 px-4 py-3 text-left duration-150 last:border-b-0 dark:border-slate-700 ${
                      selectedIndex === index
                        ? 'border-l-4 border-l-blue-500 bg-blue-100 dark:bg-blue-900/50'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                    whileHover={{ paddingLeft: '1.25rem' }}
                  >
                    {/* Icon */}
                    <div className='mt-1 flex-shrink-0 text-gray-400 dark:text-gray-500'>{result.icon}</div>

                    {/* Content */}
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>{result.title}</p>
                      {result.description && <p className='truncate text-xs text-gray-500 dark:text-gray-400'>{result.description}</p>}
                    </div>

                    {/* Type badge */}
                    <span className='flex-shrink-0 rounded bg-gray-100 px-2 py-1 text-xs capitalize text-gray-600 dark:bg-slate-700 dark:text-gray-300'>
                      {result.type}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className='border-t border-gray-100 bg-gray-50 px-4 py-2 text-xs text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-400'>
                Showing {results.length} result{results.length !== 1 ? 's' : ''} · Use ↑↓ to navigate, Enter to select
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {isOpen && searchTerm && results.length === 0 && (
          <>
            <div onClick={() => setIsOpen(false)} className='fixed inset-0 z-40' />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className='absolute left-0 right-0 top-full z-50 mt-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-center shadow-lg dark:border-slate-700 dark:bg-slate-800'
            >
              <p className='text-sm text-gray-500 dark:text-gray-400'>No results found for "{searchTerm}"</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
