import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { mockUsers, mockClasses, mockGrades } from '@/data/mock';
import { IconCalendarFilled, IconChartBar, IconDownload } from '@tabler/icons-react';

export default function AdminReports() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reportType, setReportType] = useState<'overview' | 'performance' | 'enrollment'>('overview');
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

  const students = Object.values(mockUsers).filter((u) => u.role === 'student');
  const teachers = Object.values(mockUsers).filter((u) => u.role === 'teacher');
  const averageGrade = mockGrades.length > 0 ? (mockGrades.reduce((sum, g) => sum + g.grade, 0) / mockGrades.length).toFixed(1) : 0;

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleExport = (format: 'pdf' | 'csv' | 'excel') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-semibold text-gray-900 dark:text-white'>{translations.reports}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>{translations.generateReports}</p>
      </motion.div>

      {/* Report Type Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='mb-8 mt-8 flex flex-col gap-4 sm:flex-row'
      >
        <button
          onClick={() => setReportType('overview')}
          className={`rounded-lg px-6 py-2 font-medium transition-colors ${
            reportType === 'overview'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'border border-gray-200 bg-white text-gray-900 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-blue-600'
          }`}
        >
          School Overview
        </button>
        <button
          onClick={() => setReportType('performance')}
          className={`rounded-lg px-6 py-2 font-medium transition-colors ${
            reportType === 'performance'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'border border-gray-200 bg-white text-gray-900 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-blue-600'
          }`}
        >
          Performance Metrics
        </button>
        <button
          onClick={() => setReportType('enrollment')}
          className={`rounded-lg px-6 py-2 font-medium transition-colors ${
            reportType === 'enrollment'
              ? 'bg-blue-600 text-white dark:bg-blue-700'
              : 'border border-gray-200 bg-white text-gray-900 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:border-blue-600'
          }`}
        >
          Enrollment Report
        </button>
      </motion.div>

      {/* Export Options */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className='mb-8 flex items-center gap-2'>
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Download:</span>
        <button
          onClick={() => handleExport('pdf')}
          className='flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
        >
          <IconDownload size={14} />
          PDF
        </button>
        <button
          onClick={() => handleExport('csv')}
          className='flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
        >
          <IconDownload size={14} />
          CSV
        </button>
        <button
          onClick={() => handleExport('excel')}
          className='flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
        >
          <IconDownload size={14} />
          Excel
        </button>
      </motion.div>

      {/* Report Content */}
      {reportType === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-8'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Students</p>
              <p className='mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400'>{students.length}</p>
              <p className='mt-2 text-xs text-gray-500 dark:text-gray-500'>Active enrollments</p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Teachers</p>
              <p className='mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400'>{teachers.length}</p>
              <p className='mt-2 text-xs text-gray-500 dark:text-gray-500'>Active instructors</p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Classes</p>
              <p className='mt-2 text-3xl font-bold text-green-600 dark:text-green-400'>{mockClasses.length}</p>
              <p className='mt-2 text-xs text-gray-500 dark:text-gray-500'>Active courses</p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Student-Teacher Ratio</p>
              <p className='mt-2 text-3xl font-bold text-orange-600 dark:text-orange-400'>
                {teachers.length > 0 ? (students.length / teachers.length).toFixed(1) : 0}:1
              </p>
              <p className='mt-2 text-xs text-gray-500 dark:text-gray-500'>Per instructor</p>
            </div>
          </div>
        </motion.div>
      )}

      {reportType === 'performance' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-8'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Average Grade</p>
              <p className='mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400'>{averageGrade}</p>
              <p className='mt-2 text-xs text-gray-500 dark:text-gray-500'>School-wide average</p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Grades Recorded</p>
              <p className='mt-2 text-4xl font-bold text-purple-600 dark:text-purple-400'>{mockGrades.length}</p>
              <p className='mt-2 text-xs text-gray-500 dark:text-gray-500'>Assessment submissions</p>
            </div>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Report Period</p>
              <p className='mt-2 flex items-center gap-2 text-2xl font-bold text-green-600 dark:text-green-400'>
                <IconCalendarFilled size={20} />
                Q1 2025
              </p>
              <p className='mt-2 text-xs text-gray-500 dark:text-gray-500'>Current semester</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
            <h3 className='mb-6 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white'>
              <IconChartBar size={20} />
              Grade Distribution
            </h3>
            <div className='space-y-4'>
              {[
                { range: 'A (90-100)', count: 12, percentage: 35 },
                { range: 'B (80-89)', count: 18, percentage: 45 },
                { range: 'C (70-79)', count: 5, percentage: 15 },
                { range: 'D (60-69)', count: 2, percentage: 5 },
              ].map((item) => (
                <div key={item.range}>
                  <div className='mb-1 flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{item.range}</span>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>{item.count} students</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-gray-200 dark:bg-slate-700'>
                    <div className='h-2 rounded-full bg-blue-600 dark:bg-blue-400' style={{ width: `${item.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {reportType === 'enrollment' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='space-y-8'>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <h3 className='mb-6 text-lg font-bold text-gray-900 dark:text-white'>Enrollment by Grade Level</h3>
              <div className='space-y-4'>
                {[
                  { grade: 'Grade 9', students: 150 },
                  { grade: 'Grade 10', students: 135 },
                  { grade: 'Grade 11', students: 128 },
                  { grade: 'Grade 12', students: 142 },
                ].map((item) => (
                  <div key={item.grade} className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>{item.grade}</span>
                    <span className='text-sm font-bold text-gray-900 dark:text-white'>{item.students}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
              <h3 className='mb-6 text-lg font-bold text-gray-900 dark:text-white'>Class Size Distribution</h3>
              <div className='space-y-4'>
                {mockClasses.slice(0, 4).map((cls) => (
                  <div key={cls.id} className='flex items-center justify-between'>
                    <span className='truncate text-sm font-medium text-gray-700 dark:text-gray-300'>{cls.name}</span>
                    <span className='ml-2 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-white'>
                      {cls.studentCount} students
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
            <h3 className='mb-6 text-lg font-bold text-gray-900 dark:text-white'>Enrollment Trends</h3>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              School enrollment has been steady this academic year with a slight increase of 5% compared to the previous year.
            </p>
            <div className='mt-4 grid grid-cols-4 gap-4'>
              {['Jan', 'Feb', 'Mar', 'Apr'].map((month, i) => (
                <div key={month} className='text-center'>
                  <div className='text-2xl font-bold text-blue-600 dark:text-blue-400'>{555 + i * 10}</div>
                  <p className='mt-1 text-xs text-gray-500 dark:text-gray-500'>{month}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AppLayout>
  );
}
