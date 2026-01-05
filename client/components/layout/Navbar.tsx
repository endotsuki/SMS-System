import { Moon, Sun, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@/types";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { SearchBar } from "../ui/search-bar";

interface NavbarProps {
  user: User;
  sidebarOpen: boolean;
}

export function Navbar({ user, sidebarOpen }: NavbarProps) {
  const { theme, toggleTheme, language, setLanguage, translations } = useApp();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  return (
    <nav className="sticky top-0 z-30 backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
      <div className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-[280px]" : "ml-20"}`}>
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Search */}
          <SearchBar placeholder="Search classes, assignments, users..." />

          {/* Right side - Icons & User */}
          <div className="flex items-center gap-4 ml-6">
            {/* Notifications */}
            <NotificationCenter userId={user.id} />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title={theme === 'light' ? translations.darkMode : translations.lightMode}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Globe size={20} />
              </button>

              {/* Language Dropdown */}
              <AnimatePresence>
                {showLanguageMenu && (
                  <>
                    <div
                      onClick={() => setShowLanguageMenu(false)}
                      className="fixed inset-0 z-40"
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
                    >
                      {[
                        { code: 'en', label: 'English' },
                        { code: 'km', label: 'ភាសាខ្មែរ' },
                        { code: 'fr', label: 'Français' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setShowLanguageMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                            language === lang.code
                              ? 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</span>
              </div>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-slate-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}