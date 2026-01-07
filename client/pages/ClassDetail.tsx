import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { User, Class, Assignment } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { mockClasses, getClassAssignments, getStudentsInClass } from '@/data/mock';
import { StatusBadge } from '@/components/dashboard/StatusBadge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IconArrowLeft, IconBell, IconBook, IconUsers } from '@tabler/icons-react';

export default function ClassDetail() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [classData, setClassData] = useState<Class | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'assignments' | 'students' | 'announcements'>('info');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const navigate = useNavigate();
  const { classId } = useParams();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate('/');
    }

    if (classId) {
      const found = mockClasses.find((c) => c.id === classId);
      if (found) {
        setClassData(found);
        setAssignments(getClassAssignments(classId));
        setStudents(getStudentsInClass(classId));
      }
    }
  }, [navigate, classId]);

  if (!currentUser || !classData) return null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => navigate(-1)}
          className='mb-4 flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300'
        >
          <IconArrowLeft size={18} />
          {translations.back}
        </button>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{classData.name}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          {classData.code} • {classData.teacher.name}
        </p>
      </motion.div>

      {/* Class Header Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='mb-8 mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800'
      >
        <div className='relative h-64 bg-gradient-to-r from-blue-500/20 to-purple-600/20'>
          {classData.image && <img src={classData.image} alt={classData.name} className='h-full w-full object-cover opacity-50' />}
        </div>
        <div className='flex items-center justify-between px-6 py-4'>
          <div>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>{classData.name}</h2>
            <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{classData.description}</p>
          </div>
          <div className='ml-8 grid grid-cols-3 gap-6'>
            <div className='text-center'>
              <IconUsers size={24} className='mx-auto mb-2 text-blue-600 dark:text-blue-400' />
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>{classData.studentCount}</p>
              <p className='text-xs text-gray-500 dark:text-gray-500'>Students</p>
            </div>
            <div className='text-center'>
              <IconBook size={24} className='mx-auto mb-2 text-purple-600 dark:text-purple-400' />
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>{assignments.length}</p>
              <p className='text-xs text-gray-500 dark:text-gray-500'>Assignments</p>
            </div>
            <div className='text-center'>
              <IconBell size={24} className='mx-auto mb-2 text-orange-600 dark:text-orange-400' />
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>3</p>
              <p className='text-xs text-gray-500 dark:text-gray-500'>Announcements</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='mb-8 border-b border-gray-200 dark:border-slate-700'
      >
        <div className='flex gap-8'>
          {['info', 'assignments', 'students', 'announcements'].map((tab) => (
            <Button
              variant='ghost'
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`relative font-medium transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'info' && 'Class Info'}
              {tab === 'assignments' && translations.classAssignments}
              {tab === 'students' && translations.classStudents}
              {tab === 'announcements' && translations.classAnnouncements}
              {activeTab === tab && <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400'></div>}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='space-y-6 lg:col-span-2'>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>{translations.classInfo}</h3>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Description</p>
                  <p className='mt-1 text-gray-900 dark:text-white'>{classData.description}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Instructor</p>
                  <p className='mt-1 text-gray-900 dark:text-white'>{classData.teacher.name}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{translations.schedule}</p>
                  <p className='mt-1 text-gray-900 dark:text-white'>{classData.schedule}</p>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{translations.room}</p>
                  <p className='mt-1 text-gray-900 dark:text-white'>{classData.room}</p>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-6'>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>Instructor</h3>
              <div className='flex items-center gap-4'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={classData.teacher.avatar} alt={classData.teacher.name} />
                </Avatar>

                <div>
                  <p className='font-medium text-gray-900 dark:text-white'>{classData.teacher.name}</p>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>{classData.teacher.email}</p>
                </div>
              </div>
            </div>

            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>Quick Stats</h3>
              <div className='space-y-3'>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>Total Students</span>
                  <span className='font-medium text-gray-900 dark:text-white'>{classData.studentCount}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-sm text-gray-600 dark:text-gray-400'>Assignments</span>
                  <span className='font-medium text-gray-900 dark:text-white'>{assignments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'assignments' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className='rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md dark:border-slate-700 dark:bg-slate-800'
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>{assignment.title}</h3>
                    <p className='mt-2 text-gray-600 dark:text-gray-400'>{assignment.description}</p>
                    <div className='mt-4 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400'>
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
              <p className='text-gray-600 dark:text-gray-400'>No assignments yet</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'students' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800'
        >
          {students.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-gray-200 dark:border-slate-700'>
                    <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Name</th>
                    <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Email</th>
                    <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className='border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700'
                    >
                      <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
                        <div className='flex items-center gap-3'>
                          <Avatar>
                            <AvatarImage src={student.avatar} alt={student.name} />
                          </Avatar>
                          {student.name}
                        </div>
                      </td>
                      <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>{student.email}</td>
                      <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>{student.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='p-12 text-center'>
              <p className='text-gray-600 dark:text-gray-400'>No students enrolled in this class</p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'announcements' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-4'>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'
            >
              <div className='flex items-start gap-4'>
                <div
                  className={`mt-1.5 h-3 w-3 flex-shrink-0 rounded-full ${
                    i === 1 ? 'bg-red-500' : i === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                  }`}
                ></div>
                <div className='flex-1'>
                  <h3 className='font-semibold text-gray-900 dark:text-white'>Announcement {i}</h3>
                  <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                    This is an important announcement for the class. Students should pay attention to this update.
                  </p>
                  <p className='mt-3 text-xs text-gray-500 dark:text-gray-500'>{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AppLayout>
  );
}
