import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { getStudentAssignments } from '@/data/mock';
import { StatusBadge } from '@/components/dashboard/StatusBadge';

export default function StudentAssignments() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { translations } = useApp();

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

  const assignments = getStudentAssignments(currentUser.id);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{translations.assignments}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          {assignments.length} {translations.pendingAssignments}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className='mt-8 grid grid-cols-1 gap-4'>
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className='rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:shadow-slate-900'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='font-semibold text-gray-900 dark:text-white'>{assignment.title}</h3>
                  <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>{assignment.description}</p>
                  <div className='mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400'>
                    <span>
                      {translations.dueDate}: {assignment.dueDate.toLocaleDateString()}
                    </span>
                    <span>
                      {assignment.points} {translations.points}
                    </span>
                  </div>
                </div>
                <StatusBadge status={assignment.status} variant='published' />
              </div>
            </motion.div>
          ))
        ) : (
          <div className='py-12 text-center'>
            <p className='text-gray-600 dark:text-gray-400'>{translations.noUpcomingAssignments}</p>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
