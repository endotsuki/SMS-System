import { motion } from 'framer-motion';
import { Users, Clock, MapPin } from 'lucide-react';
import type { Class } from '@/types';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage } from '../ui/avatar';

interface ClassCardProps {
  classData: Class;
  variant?: 'grid' | 'list';
}

const hoverSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 22,
};

export function ClassCard({ classData, variant = 'grid' }: ClassCardProps) {
  if (variant === 'list') {
    return (
      <Link to={`/class/${classData.id}`} className='block'>
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: 6 }}
          transition={hoverSpring}
          className='rounded-2xl border border-white/20 bg-white/40 p-4 shadow-sm backdrop-blur-lg transition-shadow duration-300 hover:shadow-md dark:border-slate-700/50 dark:bg-slate-800/40'
        >
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <h3 className='font-semibold text-gray-900 dark:text-white'>{classData.name}</h3>
              <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>{classData.code}</p>

              <div className='mt-3 flex gap-4 text-xs text-gray-500 dark:text-gray-400'>
                <div className='flex items-center gap-1'>
                  <Users size={14} />
                  {classData.studentCount} students
                </div>
                <div className='flex items-center gap-1'>
                  <Clock size={14} />
                  {classData.schedule}
                </div>
              </div>
            </div>

            <div className='shrink-0 text-right'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Teacher</p>
              <p className='text-sm font-medium text-gray-900 dark:text-white'>{classData.teacher.name}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  // GRID VARIANT
  return (
    <Link to={`/class/${classData.id}`} className='block h-full'>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={hoverSpring}
        className='ransition-shadow flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/40 shadow-md backdrop-blur-xl duration-300 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/40'
      >
        {classData.image && (
          <div className='relative h-40 overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500'>
            <img src={classData.image} alt={classData.name} className='h-full w-full object-cover' />
          </div>
        )}
        <div className='flex flex-1 flex-col p-5'>
          <div className='flex-1'>
            <p className='text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400'>{classData.code}</p>
            <h3 className='mt-2 line-clamp-2 text-lg font-bold text-gray-900 dark:text-white'>{classData.name}</h3>

            <p className='mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>{classData.description}</p>
          </div>
          <div className='mt-4 space-y-2 border-t border-white/20 pt-4 dark:border-slate-700/50'>
            <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300'>
              <Users size={16} className='text-gray-400 dark:text-gray-500' />
              {classData.studentCount} students
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300'>
              <Clock size={16} className='text-gray-400 dark:text-gray-500' />
              {classData.schedule}
            </div>
            {classData.room && (
              <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300'>
                <MapPin size={16} className='text-gray-400 dark:text-gray-500' />
                {classData.room}
              </div>
            )}
          </div>
          <div className='mt-4 border-t border-white/20 pt-4 dark:border-slate-700/50'>
            <p className='text-xs text-gray-500 dark:text-gray-400'>Instructor</p>
            <p className='text-sm font-medium text-gray-900 dark:text-white'>{classData.teacher.name}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
