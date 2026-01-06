import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Assignment } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { getClassesByTeacher, getClassAssignments } from '@/data/mock';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Plus, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function TeacherAssignments() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const navigate = useNavigate();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);

      // Get all assignments for teacher's classes
      const myClasses = getClassesByTeacher(parsedUser.id);
      const allAssignments: Assignment[] = [];
      myClasses.forEach((cls) => {
        const classAssignments = getClassAssignments(cls.id);
        allAssignments.push(...classAssignments);
      });
      setAssignments(allAssignments);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!currentUser) return null;

  const filteredAssignments = filter === 'all' ? assignments : assignments.filter((a) => a.status === filter);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const stats = {
    total: assignments.length,
    published: assignments.filter((a) => a.status === 'published').length,
    draft: assignments.filter((a) => a.status === 'draft').length,
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{translations.assignments}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>{translations.manageSchool}</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='mb-8 mt-8 grid grid-cols-1 gap-4 md:grid-cols-3'
      >
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Assignments</p>
          <p className='mt-2 text-3xl font-bold text-gray-900 dark:text-white'>{stats.total}</p>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Published</p>
          <p className='mt-2 text-3xl font-bold text-green-600 dark:text-green-400'>{stats.published}</p>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Draft</p>
          <p className='mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400'>{stats.draft}</p>
        </div>
      </motion.div>

      {/* Filter and Action Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'
      >
        <div className='flex items-center gap-2'>
          <Filter size={18} className='text-gray-500 dark:text-gray-400' />
          <Select value={filter} onValueChange={(value) => setFilter(value as 'all' | 'published' | 'draft')}>
            <SelectTrigger className='w-auto'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Assignments</SelectItem>
              <SelectItem value='published'>Published</SelectItem>
              <SelectItem value='draft'>Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant='secondary'>
          <Plus size={18} />
          {translations.create} {translations.assignments}
        </Button>
      </motion.div>

      {/* Assignments List */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className='space-y-4'>
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className='cursor-pointer rounded-lg border border-gray-200 bg-white p-6 hover:border-blue-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-800 dark:hover:shadow-slate-900'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{assignment.title}</h3>
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
          <div className='rounded-lg border border-gray-200 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-800'>
            <p className='text-gray-600 dark:text-gray-400'>No assignments found with the selected filter.</p>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
