import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { IconBell, IconDatabase, IconEye, IconEyeOff, IconLock, IconShield } from '@tabler/icons-react';

export default function AdminSettings() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { translations, theme, toggleTheme, language, setLanguage } = useApp();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-semibold text-gray-900 dark:text-white'>{translations.systemSettings}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>{translations.manageSchool}</p>
      </motion.div>

      <div className='mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* Main Settings */}
        <div className='space-y-8 lg:col-span-2'>
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'
          >
            <h2 className='mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>{translations.accountSettings}</h2>

            <div className='space-y-6'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>{translations.profile}</label>
                <input
                  type='text'
                  value={currentUser.name}
                  readOnly
                  className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>{translations.emailAddress}</label>
                <input
                  type='email'
                  value={currentUser.email}
                  readOnly
                  className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Department</label>
                <input
                  type='text'
                  value={currentUser.department}
                  readOnly
                  className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>
            </div>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'
          >
            <div className='mb-6 flex items-center gap-2'>
              <IconLock size={24} className='text-blue-600 dark:text-blue-400' />
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>{translations.changePassword}</h2>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Current Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  >
                    {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>New Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  className='w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  className='w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
              >
                {translations.changePassword}
              </motion.button>
            </div>
          </motion.div>

          {/* System Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'
          >
            <div className='mb-6 flex items-center gap-2'>
              <IconShield size={24} className='text-green-600 dark:text-green-400' />
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>System Security</h2>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>Two-Factor Authentication</span>
                <div className='relative h-6 w-12 cursor-pointer rounded-full bg-green-400'>
                  <div className='absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white'></div>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>API Key Management</span>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
                >
                  Manage
                </motion.button>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>System Backup</span>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className='rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
                >
                  Backup Now
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Database Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'
          >
            <div className='mb-6 flex items-center gap-2'>
              <IconDatabase size={24} className='text-purple-600 dark:text-purple-400' />
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Database</h2>
            </div>
            <div className='space-y-4'>
              <div>
                <p className='mb-2 text-sm text-gray-700 dark:text-gray-300'>Database Status</p>
                <div className='flex items-center gap-2'>
                  <div className='h-3 w-3 rounded-full bg-green-500'></div>
                  <span className='text-sm font-medium text-gray-900 dark:text-white'>Connected</span>
                </div>
              </div>
              <div>
                <p className='mb-2 text-sm text-gray-700 dark:text-gray-300'>Last Backup</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>2025-01-10 03:30 AM</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Settings */}
        <div className='space-y-6'>
          {/* Notifications Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'
          >
            <div className='mb-4 flex items-center gap-2'>
              <IconBell size={20} className='text-blue-600 dark:text-blue-400' />
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{translations.notifications}</h3>
            </div>
            <div className='space-y-3'>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>System Alerts</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>User Activity</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>System Updates</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>Security Alerts</span>
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
