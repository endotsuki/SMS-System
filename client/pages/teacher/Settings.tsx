import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { Bell, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TeacherSettings() {
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
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{translations.settings}</h1>
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
            <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>{translations.accountSettings}</h2>

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
              <Lock size={24} className='text-blue-600 dark:text-blue-400' />
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>{translations.changePassword}</h2>
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
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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

              <Button variant='default'>{translations.changePassword}</Button>
            </div>
          </motion.div>

          {/* Two-Factor Authentication */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'
          >
            <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>{translations.twoFactorAuth}</h2>
            <p className='mb-4 text-gray-600 dark:text-gray-400'>Add an extra layer of security to your account.</p>
            <Button variant='default'>Enable</Button>
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
              <Bell size={20} className='text-blue-600 dark:text-blue-400' />
              <h3 className='text-lg font-bold text-gray-900 dark:text-white'>{translations.notifications}</h3>
            </div>
            <div className='space-y-3'>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>Assignment Updates</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>Student Submissions</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>Class Announcements</span>
              </label>
              <label className='flex cursor-pointer items-center gap-3'>
                <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                <span className='text-sm text-gray-700 dark:text-gray-300'>System Updates</span>
              </label>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
