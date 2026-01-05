import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { UserRole } from "@/types";
import { useApp } from "@/context/AppContext";
import { Button } from "../ui/button";

interface SidebarProps {
  userRole: UserRole;
  userName: string;
  userAvatar?: string;
  onLogout: () => void;
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const navItems: Record<UserRole, Array<{ label: string; icon: any; path: string }>> = {
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    { label: "Classes", icon: BookOpen, path: "/admin/classes" },
    { label: "Users", icon: Users, path: "/admin/users" },
    { label: "Reports", icon: BarChart3, path: "/admin/reports" },
    { label: "Settings", icon: Settings, path: "/admin/settings" },
  ],
  teacher: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/teacher" },
    { label: "My Classes", icon: BookOpen, path: "/teacher/classes" },
    { label: "Assignments", icon: FileText, path: "/teacher/assignments" },
    { label: "Grades", icon: BarChart3, path: "/teacher/grades" },
    { label: "Settings", icon: Settings, path: "/teacher/settings" },
  ],
  student: [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student" },
    { label: "Classes", icon: BookOpen, path: "/student/classes" },
    { label: "Assignments", icon: FileText, path: "/student/assignments" },
    { label: "Grades", icon: BarChart3, path: "/student/grades" },
    { label: "Settings", icon: Settings, path: "/student/settings" },
  ],
};

export function Sidebar({
  userRole,
  userName,
  userAvatar,
  onLogout,
  isOpen = true,
  onToggle,
}: SidebarProps) {
  const location = useLocation();
  const { translations } = useApp();
  const items = navItems[userRole];

  const getNavLabel = (key: string): string => {
    const labelMap: Record<string, keyof typeof translations> = {
      'Dashboard': 'dashboard',
      'My Classes': 'myClasses',
      'Classes': 'classes',
      'Assignments': 'assignments',
      'Grades': 'grades',
      'Users': 'users',
      'Reports': 'reports',
      'Settings': 'settings',
    };
    const translationKey = labelMap[key];
    return translationKey ? translations[translationKey] : key;
  };

  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? 280 : 80,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen z-40 backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col shadow-lg"
    >
      {/* Logo/Header */}
      <div className="px-6 py-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <motion.div
            animate={{
              opacity: isOpen ? 1 : 0,
              width: isOpen ? "auto" : 0,
              display: isOpen ? "block" : "none"
            }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <h1 className="text-lg font-bold text-slate-900 dark:text-white whitespace-nowrap">
              LearnX
            </h1>
          </motion.div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle?.(!isOpen)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
          >
            {isOpen ? (
              <ChevronLeft size={20} className="text-slate-600 dark:text-slate-400" />
            ) : (
              <ChevronRight size={20} className="text-slate-600 dark:text-slate-400" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="gap-2 flex flex-col">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: isOpen ? 2 : 0 }}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${isActive
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    } ${!isOpen ? "justify-center" : ""}`}
                  title={!isOpen ? getNavLabel(item.label) : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{
                        opacity: 1,
                        width: "auto",
                      }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {getNavLabel(item.label)}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="border-t border-slate-200/50 dark:border-slate-700/50 p-3 space-y-2">
        {/* User Profile */}
        <div className={`flex items-center gap-3 px-2 ${!isOpen ? "justify-center" : ""}`}>
          <div className="flex-shrink-0">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-10 h-10 rounded-lg object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: "auto",
              }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="min-w-0 flex-1"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {userName}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 capitalize truncate">
                {userRole}
              </p>
            </motion.div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${!isOpen ? "justify-center" : ""
            }`}
          title={!isOpen ? translations.logout : undefined}
        >
          <LogOut size={18} className="flex-shrink-0" />
          {isOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: "auto",
              }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm font-medium whitespace-nowrap"
            >
              {translations.logout}
            </motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
}