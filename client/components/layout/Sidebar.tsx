import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { UserRole } from '@/types';
import { useApp } from '@/context/AppContext';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
  IconBook,
  IconChartBar,
  IconChartBarPopular,
  IconChevronLeft,
  IconChevronRight,
  IconFileText,
  IconLayoutDashboard,
  IconLogout,
  IconSettings2,
  IconUsers,
} from '@tabler/icons-react';

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
    { label: 'dashboard', icon: IconLayoutDashboard, path: '/admin' },
    { label: 'classes', icon: IconBook, path: '/admin/classes' },
    { label: 'users', icon: IconUsers, path: '/admin/users' },
    { label: 'reports', icon: IconChartBar, path: '/admin/reports' },
    { label: 'settings', icon: IconSettings2, path: '/admin/settings' },
  ],
  teacher: [
    { label: 'dashboard', icon: IconLayoutDashboard, path: '/teacher' },
    { label: 'myClasses', icon: IconBook, path: '/teacher/classes' },
    { label: 'assignments', icon: IconFileText, path: '/teacher/assignments' },
    { label: 'grades', icon: IconChartBarPopular, path: '/teacher/grades' },
    { label: 'settings', icon: IconSettings2, path: '/teacher/settings' },
  ],
  student: [
    { label: 'dashboard', icon: IconLayoutDashboard, path: '/student' },
    { label: 'classes', icon: IconBook, path: '/student/classes' },
    { label: 'assignments', icon: IconFileText, path: '/student/assignments' },
    { label: 'grades', icon: IconChartBarPopular, path: '/student/grades' },
    { label: 'settings', icon: IconSettings2, path: '/student/settings' },
  ],
};

export function Sidebar({ userRole, userName, userAvatar, onLogout, isOpen = true, onToggle }: SidebarProps) {
  const location = useLocation();
  const { translations } = useApp();
  const items = navItems[userRole];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-30 bg-black/50'
          onClick={() => onToggle?.(false)}
        />
      )}

      <motion.aside
        initial={false}
        animate={isMobile ? { x: isOpen ? 0 : -300 } : { width: isOpen ? 280 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200/50 bg-white/70 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70'
        style={{ width: isMobile ? 280 : undefined }}
      >
        {/* Header */}
        <div className='border-b border-slate-200/50 px-4 py-4 dark:border-slate-700/50'>
          <div className='flex items-center justify-between'>
            {isOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='flex items-center gap-2'>
                <img src='/logo.png' className='h-8' alt='Logo' />
                <span className='text-lg font-medium'>SMS System</span>
              </motion.div>
            )}

            {!isMobile && (
              <Button size='icon' variant='ghost' onClick={() => onToggle?.(!isOpen)}>
                {isOpen ? <IconChevronLeft /> : <IconChevronRight />}
              </Button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 gap-9 overflow-y-auto px-3 py-4'>
          {items.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;

            return (
              <Link
                key={path}
                to={path}
                onClick={() => isMobile && onToggle?.(false)}
                className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 transition-all ${
                  active
                    ? 'grid-flow-row bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                } ${!isOpen && !isMobile && 'justify-center'}`}
              >
                <Icon size={20} />
                {(isOpen || isMobile) && <span className='text-sm font-medium'>{translations[label as keyof typeof translations]}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className='border-t border-slate-200/50 p-3 dark:border-slate-700/50'>
          <div className={`flex items-center gap-3 ${!isOpen && !isMobile && 'justify-center'}`}>
            {userAvatar ? (
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
              </Avatar>
            ) : (
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500 font-semibold text-white'>
                {userName[0]}
              </div>
            )}

            {(isOpen || isMobile) && (
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-semibold'>{userName}</p>
                <p className='text-xs capitalize text-slate-500'>{userRole}</p>
              </div>
            )}
          </div>

          <Button variant='destructive' onClick={onLogout} className={`mt-4 w-full ${!isOpen && !isMobile && 'px-2'}`}>
            <IconLogout size={18} />
            {(isOpen || isMobile) && <span className='ml-2'>{translations.logout}</span>}
          </Button>
        </div>
      </motion.aside>
    </>
  );
}
