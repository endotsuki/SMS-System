import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Grade, Class } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { getClassesByTeacher, getClassGrades, getStudentClasses } from '@/data/mock';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function TeacherGrades() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [myClasses, setMyClasses] = useState<Class[]>([]);
  const navigate = useNavigate();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);

      const classes = getClassesByTeacher(parsedUser.id);
      setMyClasses(classes);

      if (classes.length > 0) {
        setSelectedClass(classes[0]);
        setGrades(getClassGrades(classes[0].id));
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleClassChange = (classId: string) => {
    const selected = myClasses.find((c) => c.id === classId);
    if (selected) {
      setSelectedClass(selected);
      setGrades(getClassGrades(selected.id));
    }
  };

  if (!currentUser || !selectedClass) return null;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Group grades by student
  const gradesByStudent = grades.reduce(
    (acc, grade) => {
      const existing = acc.find((g) => g.studentId === grade.studentId);
      if (existing) {
        existing.grades.push(grade);
      } else {
        acc.push({ studentId: grade.studentId, grades: [grade] });
      }
      return acc;
    },
    [] as { studentId: string; grades: Grade[] }[]
  );

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{translations.grades}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>{translations.manageSchool}</p>
      </motion.div>

      {/* Class Selector */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className='mb-8 mt-6'>
        <label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>{translations.classes}</label>
        <div className='relative'>
          <Select value={selectedClass.id} onValueChange={handleClassChange}>
            <SelectTrigger className='w-auto rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {myClasses.map((cls) => (
                <SelectItem key={cls.id} value={cls.id}>
                  {cls.name} ({cls.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Grades Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800'
      >
        {grades.length > 0 ? (
          <>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-b border-gray-200 dark:border-slate-700'>
                    <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>{translations.student}</th>
                    <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>{translations.subject}</th>
                    <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>{translations.grade}</th>
                    <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>{translations.date}</th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade, index) => (
                    <motion.tr
                      key={grade.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className='border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700'
                    >
                      <td className='px-6 py-4 text-gray-900 dark:text-white'>Student ID: {grade.studentId}</td>
                      <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>{grade.subject}</td>
                      <td className='px-6 py-4'>
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            grade.grade >= 80
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                              : grade.grade >= 70
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                          }`}
                        >
                          {grade.grade}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>{grade.date.toLocaleDateString()}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='p-12 text-center'>
            <p className='text-gray-600 dark:text-gray-400'>{translations.noGrades}</p>
          </div>
        )}
      </motion.div>

      {/* Grade Statistics */}
      {grades.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-3'
        >
          <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Average Grade</p>
            <p className='mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400'>
              {(grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1)}
            </p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Highest Grade</p>
            <p className='mt-2 text-3xl font-bold text-green-600 dark:text-green-400'>{Math.max(...grades.map((g) => g.grade))}</p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
            <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Lowest Grade</p>
            <p className='mt-2 text-3xl font-bold text-red-600 dark:text-red-400'>{Math.min(...grades.map((g) => g.grade))}</p>
          </div>
        </motion.div>
      )}
    </AppLayout>
  );
}
