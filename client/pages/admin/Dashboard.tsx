import { motion } from 'framer-motion';
import { mockClasses, mockUsers, mockAnnouncements } from '@/data/mock';
import { StatCard } from '@/components/dashboard/StatCard';
import { ClassCard } from '@/components/dashboard/ClassCard';
import { AppLayout } from '@/components/layout/AppLayout';
import type { User } from '@/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { IconBell, IconBook, IconChartBar, IconPlus, IconUsers, IconArrowRight } from '@tabler/icons-react';
import { useApp } from '@/context/AppContext';

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!currentUser) return null;

  const totalStudents = Object.values(mockUsers).filter((u) => u.role === 'student').length;
  const totalTeachers = Object.values(mockUsers).filter((u) => u.role === 'teacher').length;
  const totalClasses = mockClasses.length;
  const { translations } = useApp();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='mb-6 md:mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>{translations.dashboard}</h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400 md:text-base'>
          {translations.welcomeBack}, {currentUser.name}! {translations.overView}
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className='mb-6 grid grid-cols-2 gap-3 md:mb-8 md:grid-cols-4 md:gap-6'>
        <StatCard
          label='Students'
          value={totalStudents}
          icon={<IconUsers size={20} />}
          change={12}
          changeLabel='from last month'
          trend='up'
          color='blue'
        />
        <StatCard
          label='Teachers'
          value={totalTeachers}
          icon={<IconBook size={20} />}
          change={5}
          changeLabel='from last month'
          trend='up'
          color='purple'
        />
        <StatCard
          label='Classes'
          value={totalClasses}
          icon={<IconChartBar size={20} />}
          change={2}
          changeLabel='new this term'
          trend='up'
          color='green'
        />
        <StatCard label='Alerts' value={mockAnnouncements.length} icon={<IconBell size={20} />} changeLabel='pending' color='orange' />
      </div>

      {/* Content Grid */}
      <div className='grid gap-6 lg:grid-cols-3'>
        {/* Classes */}
        <div className='lg:col-span-2'>
          <div className='mb-4 flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900 dark:text-white md:text-2xl'>{translations.activeClasses}</h2>
              <p className='text-xs text-gray-500 dark:text-gray-400 md:text-sm'>{mockClasses.length} total</p>
            </div>
            <Button variant='outline' size='sm' className='hidden gap-2 md:flex' onClick={() => navigate('/admin/classes/new')}>
              <IconPlus size={16} />
              New Class
            </Button>
            <Button variant='outline' size='icon' className='md:hidden' onClick={() => navigate('/admin/classes/new')}>
              <IconPlus size={18} />
            </Button>
          </div>

          <div className='space-y-3'>
            {mockClasses.slice(0, 5).map((cls) => (
              <ClassCard key={cls.id} classData={cls} variant='list' />
            ))}
          </div>

          <button
            onClick={() => navigate('/admin/classes')}
            className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
          >
            View All Classes
            <IconArrowRight size={16} />
          </button>
        </div>

        {/* Announcements */}
        <div className='rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:p-6'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-white md:text-xl'>Announcements</h2>
            <IconBell size={18} className='text-blue-500' />
          </div>

          <div className='space-y-3'>
            {mockAnnouncements.map((ann) => (
              <motion.div
                key={ann.id}
                whileHover={{ x: 4 }}
                className='cursor-pointer border-b border-gray-100 pb-3 last:border-0 last:pb-0 dark:border-slate-700'
              >
                <div className='flex gap-3'>
                  <span
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      ann.priority === 'high' ? 'bg-red-500' : ann.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  />
                  <div className='min-w-0 flex-1'>
                    <p className='text-sm font-semibold text-gray-900 dark:text-white'>{ann.title}</p>
                    <p className='mt-0.5 line-clamp-2 text-xs text-gray-600 dark:text-gray-400'>{ann.content}</p>
                    <p className='mt-1 text-xs text-gray-500'>{ann.createdDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
