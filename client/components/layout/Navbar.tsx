import { useState, useEffect } from 'react';
import type { User } from '@/types';
import { NotificationCenter } from '@/components/notifications/NotificationCenter';
import { LanguageChanger } from './LanguageChanger';
import { SearchBar } from '../ui/search-bar';
import { Avatar, AvatarImage } from '../ui/avatar';
import { AnimatedThemeToggler } from '../ui/animate-theme';
import { Separator } from '../ui/separator';
import { IconMenu2 } from '@tabler/icons-react';
import { Button } from '../ui/button';

interface NavbarProps {
  user: User;
  sidebarOpen: boolean;
  onMenuClick?: () => void;
}

export function Navbar({ user, sidebarOpen, onMenuClick }: NavbarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav className='sticky top-0 z-30 border-b border-gray-200 bg-white/50 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/50'>
      <div className={`transition-all duration-300 ease-in-out ${isMobile ? 'ml-0' : sidebarOpen ? 'ml-[280px]' : 'ml-20'}`}>
        <div className='flex items-center justify-between gap-4 px-4 py-3 md:px-6 md:py-4'>
          {/* Mobile Menu + Search */}
          <div className='flex flex-1 items-center gap-3'>
            {isMobile && (
              <Button size='icon' variant='ghost' onClick={onMenuClick}>
                <IconMenu2 size={24} />
              </Button>
            )}
            <div className='hidden flex-1 md:block'>
              <SearchBar placeholder='Search classes, assignments, users...' />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className='flex items-center gap-2 md:gap-4'>
            <NotificationCenter userId={user.id} />
            <AnimatedThemeToggler />
            <div className='hidden md:block'>
              <LanguageChanger />
            </div>
            <Separator orientation='vertical' className='hidden h-9 md:block' />

            {/* User Info - Hidden on small mobile */}
            <div className='hidden items-center gap-3 sm:flex'>
              <div className='hidden text-right md:block'>
                <p className='truncate text-sm font-semibold text-slate-900 dark:text-white'>{user.name}</p>
                <p className='truncate text-xs capitalize text-slate-600 dark:text-slate-400'>{user.role}</p>
              </div>
              {user.avatar ? (
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                </Avatar>
              ) : (
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold text-white'>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobile && (
          <div className='border-t border-slate-200/50 px-4 pb-3 dark:border-slate-700/50'>
            <SearchBar placeholder='Search...' />
          </div>
        )}
      </div>
    </nav>
  );
}
