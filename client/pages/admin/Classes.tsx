import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { mockClasses } from '@/data/mock';
import { ClassCard } from '@/components/dashboard/ClassCard';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminClasses() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredClasses = mockClasses.filter(
    (cls) => cls.name.toLowerCase().includes(searchQuery.toLowerCase()) || cls.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{translations.classes}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          {mockClasses.length} {translations.activeClasses}
        </p>
      </motion.div>

      {/* Search and Action Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='mb-8 mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'
      >
        <div className='relative w-full sm:w-96'>
          <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <Input
            type='text'
            placeholder={translations.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
          />
        </div>
        <Button variant='secondary'>
          <Plus size={18} />
          {translations.createNewClass}
        </Button>
      </motion.div>

      {/* Classes Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        {filteredClasses.length > 0 ? (
          <div className='space-y-4'>
            {filteredClasses.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <ClassCard classData={classItem} variant='list' />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className='rounded-lg border border-gray-200 bg-white py-12 text-center dark:border-slate-700 dark:bg-slate-800'>
            <p className='text-gray-600 dark:text-gray-400'>No classes found matching your search.</p>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
