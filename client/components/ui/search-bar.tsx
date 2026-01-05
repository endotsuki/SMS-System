import { useState, useRef, useEffect } from "react";
import { Search, X, BookOpen, FileText, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { mockClasses, mockAssignments, mockUsers } from "@/data/mock";
import { Input } from "./input";
import { Button } from "./button";

interface SearchResult {
  id: string;
  type: "class" | "assignment" | "user";
  title: string;
  description?: string;
  icon: React.ReactNode;
  path?: string;
}

interface SearchBarProps {
  placeholder?: string;
}

export function SearchBar({ placeholder = "Search classes, assignments, users..." }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
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
      if (
        cls.name.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: cls.id,
          type: "class",
          title: cls.name,
          description: cls.name,
          icon: <BookOpen size={16} />,
          path: `/class/${cls.id}`,
        });
      }
    });

    // Search assignments
    Object.values(mockAssignments).forEach((assignment) => {
      if (
        assignment.title.toLowerCase().includes(query) ||
        assignment.description.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: assignment.id,
          type: "assignment",
          title: assignment.title,
          description: assignment.description.substring(0, 50) + "...",
          icon: <FileText size={16} />,
          path: `/assignment/${assignment.id}`,
        });
      }
    });

    // Search users
    Object.values(mockUsers).forEach((user) => {
      if (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: user.id,
          type: "user",
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
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectResult(results[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    if (result.path) {
      navigate(result.path);
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="flex-1 max-w-md relative">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
        />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm && setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 rounded-full border border-gray-200 dark:border-slate-600 text-sm bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-colors"
        />
        
        {/* Clear button */}
        {searchTerm && (
          <Button
            variant="ghost"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 h-auto text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors cursor-pointer"
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
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Results Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden"
            >
              <div className="max-h-96 overflow-y-auto scrollbar-hide">
                {results.map((result, index) => (
                  <motion.button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full flex items-start gap-3 px-4 py-3 border-b border-gray-100 dark:border-slate-700 last:border-b-0 transition-all duration-150 text-left cursor-pointer ${
                      selectedIndex === index
                        ? "bg-blue-100 dark:bg-blue-900/50 border-l-4 border-l-blue-500"
                        : "hover:bg-slate-50 dark:hover:bg-slate-700/40"
                    }`}
                    whileHover={{ paddingLeft: "1.25rem" }}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1 text-gray-400 dark:text-gray-500">
                      {result.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {result.title}
                      </p>
                      {result.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {result.description}
                        </p>
                      )}
                    </div>

                    {/* Type badge */}
                    <span className="flex-shrink-0 text-xs px-2 py-1 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 capitalize">
                      {result.type}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-xs text-gray-500 dark:text-gray-400">
                Showing {results.length} result{results.length !== 1 ? "s" : ""} · Use ↑↓ to navigate, Enter to select
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* No results message */}
      <AnimatePresence>
        {isOpen && searchTerm && results.length === 0 && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50 px-4 py-3 text-center"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No results found for "{searchTerm}"
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
