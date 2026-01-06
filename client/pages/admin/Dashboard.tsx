import { motion } from 'framer-motion';
import { Plus, Users, BookOpen, BarChart3, Bell } from 'lucide-react';
import { mockClasses, mockUsers, mockAnnouncements } from '@/data/mock';
import { StatCard } from '@/components/dashboard/StatCard';
import { ClassCard } from '@/components/dashboard/ClassCard';
import { AppLayout } from '@/components/layout/AppLayout';
import type { User } from '@/types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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

  if (!currentUser) {
    return null;
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
    },
  } as const;

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };
  // Calculate stats
  const totalStudents = Object.values(mockUsers).filter((u) => u.role === 'student').length;
  const totalTeachers = Object.values(mockUsers).filter((u) => u.role === 'teacher').length;
  const totalClasses = mockClasses.length;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Page Header */}
      <motion.div initial='hidden' animate='visible' variants={fadeUp} className='mb-10'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>Dashboard</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>Welcome back, {currentUser.name}! Here's an overview of your school.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delay: 0.1 }}
        className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'
      >
        <StatCard
          label='Total Students'
          value={totalStudents}
          icon={<Users size={24} />}
          change={12}
          changeLabel='from last month'
          trend='up'
          color='blue'
        />
        <StatCard
          label='Total Teachers'
          value={totalTeachers}
          icon={<BookOpen size={24} />}
          change={5}
          changeLabel='from last month'
          trend='up'
          color='purple'
        />
        <StatCard
          label='Active Classes'
          value={totalClasses}
          icon={<BarChart3 size={24} />}
          change={2}
          changeLabel='new this term'
          trend='up'
          color='green'
        />
        <StatCard
          label='Announcements'
          value={mockAnnouncements.length}
          icon={<Bell size={24} />}
          changeLabel='pending reviews'
          color='orange'
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className='mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3'>
        {/* Classes Section */}
        <motion.div variants={fadeUp} initial='hidden' animate='visible' className='lg:col-span-2'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Classes</h2>
              <p className='text-sm text-gray-600 dark:text-gray-400'>{mockClasses.length} active classes</p>
            </div>

            <Button variant='glass'>
              <Plus size={18} />
              New Class
            </Button>
          </div>

          <div className='flex flex-col gap-4'>
            {mockClasses.map((classItem) => (
              <ClassCard key={classItem.id} classData={classItem} variant='list' />
            ))}
          </div>
        </motion.div>

        {/* Announcements Section */}
        <motion.div
          variants={fadeUp}
          initial='hidden'
          animate='visible'
          className='h-fit rounded-2xl border border-white/20 bg-white/40 p-6 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/40'
        >
          <div className='mb-6 flex items-center justify-between'>
            <h2 className='text-xl font-bold text-gray-900 dark:text-white'>Announcements</h2>
            <Bell size={20} className='text-blue-500' />
          </div>

          <div className='space-y-4'>
            {mockAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.15 + index * 0.08,
                  type: 'spring',
                  stiffness: 250,
                  damping: 20,
                }}
                whileHover={{ x: 4 }}
                className='border-b border-white/20 pb-4 last:border-b-0 last:pb-0 dark:border-slate-700/50'
              >
                <div className='flex items-start gap-3'>
                  <span
                    className={`mt-2 h-2 w-2 rounded-full ${
                      announcement.priority === 'high' ? 'bg-red-500' : announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-gray-300'
                    }`}
                  />

                  <div className='flex-1'>
                    <p className='text-sm font-semibold text-gray-900 dark:text-white'>{announcement.title}</p>
                    <p className='mt-1 line-clamp-2 text-xs text-gray-600 dark:text-gray-400'>{announcement.content}</p>
                    <p className='mt-2 text-xs text-gray-500'>{announcement.createdDate.toLocaleDateString()}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
