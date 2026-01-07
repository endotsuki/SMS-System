import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '@/context/NotificationContext';
import { NotificationService } from '@/services/notificationService';
import { useApp } from '@/context/AppContext';
import { Button } from '../ui/button';
import { IconBell, IconTrash, IconX } from '@tabler/icons-react';

interface NotificationCenterProps {
  userId: string;
}

export function NotificationCenter({ userId }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { notifications, unreadCount, markAsRead, deleteNotification, markAllAsRead } = useNotification();
  const { translations } = useApp();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const unsubscribe = NotificationService.subscribe(userId, () => {});
    return () => unsubscribe();
  }, [userId]);

  const displayNotifications = notifications.slice(0, 10);

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      assignment: '📝',
      grade: '⭐',
      announcement: '📢',
      submission: '✅',
      message: '💬',
    };
    return icons[type] || '🔔';
  };

  const getNotificationColor = (type: string) => {
    const colors: Record<string, string> = {
      assignment: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
      grade: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
      announcement: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
      submission: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
    };
    return colors[type] || 'border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800';
  };

  return (
    <div className='relative'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => setIsOpen(!isOpen)}
        className='relative p-2 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
      >
        <IconBell size={isMobile ? 18 : 20} />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className='absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white md:h-5 md:w-5'
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className='fixed inset-0 z-30' onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-x-4 top-16 z-40 flex max-h-[80vh] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800 md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-2 md:w-96'
            >
              {/* Header */}
              <div className='flex items-center justify-between border-b border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800 md:p-4'>
                <h3 className='text-sm font-bold text-gray-900 dark:text-white md:text-base'>{translations.notifications}</h3>
                <div className='flex items-center gap-1 md:gap-2'>
                  {unreadCount > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={markAllAsRead}
                      className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50'
                    >
                      Mark all
                    </motion.button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className='rounded p-1 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700'
                  >
                    <IconX size={16} className='md:size-18 text-gray-500' />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className='flex-1 overflow-y-auto'>
                {displayNotifications.length > 0 ? (
                  <div className='divide-y divide-gray-200 dark:divide-slate-700'>
                    {displayNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={`relative cursor-pointer border-l-4 p-3 transition-colors hover:bg-opacity-75 dark:hover:bg-opacity-75 ${getNotificationColor(notification.type)} md:p-4`}
                        onClick={() => {
                          if (notification.status === 'unread') {
                            markAsRead(notification.id);
                          }
                          if (notification.action) {
                            window.location.href = notification.action.url;
                          }
                        }}
                      >
                        <div className='flex items-start gap-2 md:gap-3'>
                          <span className='flex-shrink-0 text-xl md:text-2xl'>{getNotificationIcon(notification.type)}</span>
                          <div className='min-w-0 flex-1'>
                            <p className='text-xs font-semibold text-gray-900 dark:text-white md:text-sm'>{notification.title}</p>
                            <p className='mt-0.5 line-clamp-2 text-xs text-gray-600 dark:text-gray-400'>{notification.message}</p>
                            {notification.senderName && <p className='mt-1 text-xs text-gray-500'>From: {notification.senderName}</p>}
                            <p className='mt-1 text-xs text-gray-500 md:mt-2'>{formatTime(notification.createdAt)}</p>
                          </div>
                          <div className='flex flex-shrink-0 items-center gap-1'>
                            {notification.status === 'unread' && <div className='h-2 w-2 rounded-full bg-blue-500' />}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className='rounded p-1 transition-colors hover:bg-gray-300 dark:hover:bg-slate-600'
                            >
                              <IconTrash size={14} className='text-gray-500 dark:text-gray-400' />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className='p-6 text-center text-gray-500 dark:text-gray-400 md:p-8'>
                    <IconBell size={isMobile ? 28 : 32} className='mx-auto mb-2 opacity-50' />
                    <p className='text-xs md:text-sm'>No notifications yet</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {displayNotifications.length > 0 && (
                <div className='border-t border-gray-200 p-2.5 text-center dark:border-slate-700 md:p-3'>
                  <a href='#' className='text-xs text-blue-600 hover:underline dark:text-blue-400 md:text-sm'>
                    View all
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
