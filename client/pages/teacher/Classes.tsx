import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { getClassesByTeacher } from '@/data/mock';
import { ClassCard } from '@/components/dashboard/ClassCard';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TeacherClasses() {
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

  const myClasses = getClassesByTeacher(currentUser.id);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{translations.myClasses}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>
          {myClasses.length} {translations.classes}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className='mb-6 mt-6 flex justify-end'>
        <Button variant='secondary'>
          <Plus size={18} />
          {translations.createClass}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'
      >
        {myClasses.length > 0 ? (
          myClasses.map((classItem) => <ClassCard key={classItem.id} classData={classItem} />)
        ) : (
          <div className='col-span-full py-12 text-center'>
            <p className='text-gray-600 dark:text-gray-400'>{translations.noClassesAssigned}</p>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
