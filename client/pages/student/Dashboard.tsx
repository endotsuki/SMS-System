import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { BookOpen, FileText } from 'lucide-react';
import { getStudentClasses, getStudentAssignments } from '@/data/mock';
import { ClassCard } from '@/components/dashboard/ClassCard';
import { DashboardCard } from '@/components/dashboard/DashboardCard';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!currentUser) {
    return null;
  }

  const enrolledClasses = getStudentClasses(currentUser.id);
  const upcomingAssignments = getStudentAssignments(currentUser.id).slice(0, 3);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className='mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>My Dashboard</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>Welcome back, {currentUser.name}! Here's your learning overview.</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delay: 0.1 }}
        className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-3'
      >
        <DashboardCard
          title='Classes Enrolled'
          value={enrolledClasses.length}
          icon={<BookOpen size={24} className='text-blue-600' />}
          variant='stat'
        />
        <DashboardCard
          title='Pending Assignments'
          value={upcomingAssignments.length}
          icon={<FileText size={24} className='text-purple-600' />}
          variant='stat'
        />
        <DashboardCard
          title='Overall GPA'
          value='3.85'
          icon={<span className='text-2xl'>📊</span>}
          subtitle='Based on latest grades'
          variant='stat'
        />
      </motion.div>

      {/* Classes */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='mb-8'>
        <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>Enrolled Classes</h2>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {enrolledClasses.length > 0 ? (
            enrolledClasses.map((classItem) => <ClassCard key={classItem.id} classData={classItem} />)
          ) : (
            <div className='col-span-full py-12 text-center'>
              <BookOpen size={48} className='mx-auto mb-4 text-gray-400 dark:text-gray-600' />
              <p className='text-gray-600 dark:text-gray-400'>No classes enrolled yet</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Upcoming Assignments */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className='mb-6 text-2xl font-bold text-gray-900 dark:text-white'>Upcoming Assignments</h2>
        <div className='grid grid-cols-1 gap-4'>
          {upcomingAssignments.length > 0 ? (
            upcomingAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className='rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-lg'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-900 dark:text-white'>{assignment.title}</h3>
                    <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{assignment.description}</p>
                    <div className='mt-3 flex items-center gap-2'>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>Due: {assignment.dueDate.toLocaleDateString()}</span>
                      <span className='text-xs font-medium text-blue-600 dark:text-blue-400'>{assignment.points} points</span>
                    </div>
                  </div>
                  <StatusBadge status={assignment.status} variant='published' />
                </div>
              </motion.div>
            ))
          ) : (
            <div className='py-8 text-center'>
              <FileText size={48} className='mx-auto mb-4 text-gray-400 dark:text-gray-600' />
              <p className='text-gray-600 dark:text-gray-400'>No upcoming assignments</p>
            </div>
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
}
