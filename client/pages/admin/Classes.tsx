import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { mockClasses } from '@/data/mock';
import { ClassCard } from '@/components/dashboard/ClassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconPlus, IconSearch } from '@tabler/icons-react';

export default function AdminClasses() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredClasses = mockClasses.filter(
    (cls) => cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || cls.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>{translations.classes}</h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400 md:text-base'>{mockClasses.length} active classes</p>
      </div>

      {/* Search Bar */}
      <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='relative flex-1 sm:max-w-md'>
          <IconSearch size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <Input
            type='text'
            placeholder='Search classes...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm dark:border-slate-700 dark:bg-slate-800'
          />
        </div>
        <Button variant='default' className='gap-2'>
          <IconPlus size={18} />
          <span className='hidden sm:inline'>Create New Class</span>
          <span className='sm:hidden'>New Class</span>
        </Button>
      </div>

      {/* Classes List */}
      {filteredClasses.length > 0 ? (
        <div className='space-y-3'>
          {filteredClasses.map((cls, i) => (
            <motion.div key={cls.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <ClassCard classData={cls} variant='list' />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className='rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-gray-600 dark:text-gray-400'>No classes found matching your search.</p>
        </div>
      )}
    </AppLayout>
  );
}
