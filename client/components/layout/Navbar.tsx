import { Search, Moon, Sun, Globe } from "lucide-react";
import { motion } from "framer-motion";
import type { User } from "@/types";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

interface NavbarProps {
  user: User;
  sidebarOpen: boolean;
}

export function Navbar({ user, sidebarOpen }: NavbarProps) {
  const { theme, toggleTheme, language, setLanguage, translations } = useApp();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const roleColors: Record<string, string> = {
    admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    teacher: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    student: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  return (
    <motion.nav
      className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-30 transition-colors"
      layout
    >
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-[280px]" : "ml-20"}`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              />
              <input
                type="text"
                placeholder={translations.search}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-gray-900 dark:text-white transition-colors"
              />
            </div>
          </div>

          {/* Right side - Icons & User */}
          <div className="flex items-center gap-4 ml-6">
            {/* Notifications */}
            <NotificationCenter userId={user.id} />

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              title={theme === 'light' ? translations.darkMode : translations.lightMode}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            {/* Language Selector */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Globe size={20} />
              </motion.button>

              {/* Language Dropdown */}
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-50"
                >
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'km', label: 'Khmer' },
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
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 dark:bg-slate-700"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <div className="flex items-center gap-1 justify-end">
                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize ${
                      roleColors[user.role] || "bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-slate-600"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
