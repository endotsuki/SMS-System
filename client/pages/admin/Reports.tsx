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
      setCurrentUser(JSON.parse(user));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!currentUser) return null;

  const students = Object.values(mockUsers).filter((u) => u.role === 'student');
  const teachers = Object.values(mockUsers).filter((u) => u.role === 'teacher');
  const averageGrade = mockGrades.length > 0 ? (mockGrades.reduce((sum, g) => sum + g.grade, 0) / mockGrades.length).toFixed(1) : '0';

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleExport = (format: string) => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>{translations.reports}</h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400 md:text-base'>Generate and export system reports</p>
      </div>

      {/* Report Type Tabs */}
      <div className='mb-6 flex gap-2 overflow-x-auto pb-2'>
        {[
          { value: 'overview', label: 'Overview' },
          { value: 'performance', label: 'Performance' },
          { value: 'enrollment', label: 'Enrollment' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setReportType(tab.value as any)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              reportType === tab.value
                ? 'bg-blue-600 text-white dark:bg-blue-700'
                : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Export Buttons */}
      <div className='mb-6 flex flex-wrap items-center gap-2'>
        <span className='text-sm font-medium text-gray-700 dark:text-gray-300'>Download:</span>
        {['PDF', 'CSV', 'Excel'].map((format) => (
          <button
            key={format}
            onClick={() => handleExport(format.toLowerCase())}
            className='flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
          >
            <IconDownload size={14} />
            {format}
          </button>
        ))}
      </div>

      {/* Report Content */}
      {reportType === 'overview' && (
        <div className='grid gap-4 md:gap-6'>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
            {[
              { label: 'Students', value: students.length, color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Teachers', value: teachers.length, color: 'text-purple-600 dark:text-purple-400' },
              { label: 'Classes', value: mockClasses.length, color: 'text-green-600 dark:text-green-400' },
              {
                label: 'Ratio',
                value: teachers.length > 0 ? `${(students.length / teachers.length).toFixed(1)}:1` : '0:1',
                color: 'text-orange-600 dark:text-orange-400',
              },
            ].map((stat) => (
              <div key={stat.label} className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800'>
                <p className='text-xs font-medium text-gray-600 dark:text-gray-400'>{stat.label}</p>
                <p className={`mt-2 text-2xl font-bold md:text-3xl ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {reportType === 'performance' && (
        <div className='space-y-4 md:space-y-6'>
          <div className='grid gap-3 md:grid-cols-3 md:gap-4'>
            {[
              { label: 'Avg Grade', value: averageGrade, color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Total Grades', value: mockGrades.length, color: 'text-purple-600 dark:text-purple-400' },
              { label: 'Period', value: 'Q1 2025', color: 'text-green-600 dark:text-green-400', icon: <IconCalendarFilled size={20} /> },
            ].map((stat) => (
              <div key={stat.label} className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800'>
                <p className='text-xs font-medium text-gray-600 dark:text-gray-400'>{stat.label}</p>
                <p className={`mt-2 flex items-center gap-2 text-2xl font-bold md:text-3xl ${stat.color}`}>
                  {stat.icon}
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Grade Distribution */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <h3 className='mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white'>
              <IconChartBar size={20} />
              Grade Distribution
            </h3>
            <div className='space-y-3'>
              {[
                { range: 'A (90-100)', count: 12, percentage: 35 },
                { range: 'B (80-89)', count: 18, percentage: 45 },
                { range: 'C (70-79)', count: 5, percentage: 15 },
                { range: 'D (60-69)', count: 2, percentage: 5 },
              ].map((item) => (
                <div key={item.range}>
                  <div className='mb-1 flex items-center justify-between text-sm'>
                    <span className='font-medium text-gray-700 dark:text-gray-300'>{item.range}</span>
                    <span className='text-gray-600 dark:text-gray-400'>{item.count} students</span>
                  </div>
                  <div className='h-2 w-full rounded-full bg-gray-200 dark:bg-slate-700'>
                    <div className='h-2 rounded-full bg-blue-600 dark:bg-blue-400' style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {reportType === 'enrollment' && (
        <div className='grid gap-4 md:gap-6 lg:grid-cols-2'>
          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>By Grade Level</h3>
            <div className='space-y-3'>
              {[
                { grade: 'Grade 9', students: 150 },
                { grade: 'Grade 10', students: 135 },
                { grade: 'Grade 11', students: 128 },
                { grade: 'Grade 12', students: 142 },
              ].map((item) => (
                <div key={item.grade} className='flex items-center justify-between text-sm'>
                  <span className='font-medium text-gray-700 dark:text-gray-300'>{item.grade}</span>
                  <span className='font-bold text-gray-900 dark:text-white'>{item.students}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800 md:p-6'>
            <h3 className='mb-4 text-lg font-bold text-gray-900 dark:text-white'>Class Sizes</h3>
            <div className='space-y-3'>
              {mockClasses.slice(0, 4).map((cls) => (
                <div key={cls.id} className='flex items-center justify-between text-sm'>
                  <span className='truncate font-medium text-gray-700 dark:text-gray-300'>{cls.name}</span>
                  <span className='ml-2 whitespace-nowrap font-bold text-gray-900 dark:text-white'>{cls.studentCount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
