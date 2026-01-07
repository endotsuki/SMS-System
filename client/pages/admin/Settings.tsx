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
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
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
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>{translations.settings}</h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400 md:text-base'>Manage your account and system preferences</p>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Main Settings */}
        <div className='space-y-6 lg:col-span-2'>
          {/* Account */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <h2 className='mb-4 text-xl font-semibold text-gray-900 dark:text-white'>Account Settings</h2>
            <div className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Full Name</label>
                <input
                  type='text'
                  value={currentUser.name}
                  readOnly
                  className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Email Address</label>
                <input
                  type='email'
                  value={currentUser.email}
                  readOnly
                  className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Department</label>
                <input
                  type='text'
                  value={currentUser.department}
                  readOnly
                  className='w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <IconLock size={20} className='text-blue-600 dark:text-blue-400' />
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Change Password</h2>
            </div>
            <div className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Current Password</label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='••••••••'
                    className='w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-700 dark:text-white'
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
                  className='w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>
              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='••••••••'
                  className='w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-700 dark:text-white'
                />
              </div>
              <button className='w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'>
                Update Password
              </button>
            </div>
          </div>

          {/* System Security */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <IconShield size={20} className='text-green-600 dark:text-green-400' />
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>System Security</h2>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>Two-Factor Auth</span>
                <div className='relative h-6 w-12 cursor-pointer rounded-full bg-green-400'>
                  <div className='absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white' />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>API Keys</span>
                <button className='rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-700'>
                  Manage
                </button>
              </div>
              <div className='flex items-center justify-between'>
                <span className='text-sm text-gray-700 dark:text-gray-300'>Backup</span>
                <button className='rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium hover:bg-gray-100 dark:border-slate-700 dark:hover:bg-slate-700'>
                  Backup Now
                </button>
              </div>
            </div>
          </div>

          {/* Database */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <IconDatabase size={20} className='text-purple-600 dark:text-purple-400' />
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>Database</h2>
            </div>
            <div className='space-y-3'>
              <div>
                <p className='mb-2 text-sm text-gray-700 dark:text-gray-300'>Status</p>
                <div className='flex items-center gap-2'>
                  <div className='h-3 w-3 rounded-full bg-green-500' />
                  <span className='text-sm font-medium text-gray-900 dark:text-white'>Connected</span>
                </div>
              </div>
              <div>
                <p className='mb-2 text-sm text-gray-700 dark:text-gray-300'>Last Backup</p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>2025-01-10 03:30 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Notifications */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <div className='mb-4 flex items-center gap-2'>
              <IconBell size={18} className='text-blue-600 dark:text-blue-400' />
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Notifications</h3>
            </div>
            <div className='space-y-3'>
              {['System Alerts', 'User Activity', 'System Updates', 'Security Alerts'].map((item) => (
                <label key={item} className='flex cursor-pointer items-center gap-3'>
                  <input type='checkbox' defaultChecked className='h-4 w-4 rounded' />
                  <span className='text-sm text-gray-700 dark:text-gray-300'>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
