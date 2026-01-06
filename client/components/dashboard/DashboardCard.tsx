import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardCardProps {
  title?: string;
  value?: string | number;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'stat' | 'info' | 'default';
}

export function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  children,
  onClick,
  className = '',
  variant = 'default',
}: DashboardCardProps) {
  const baseClass =
    'bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 cursor-pointer duration-300 hover:shadow-md dark:hover:shadow-lg hover:border-gray-200 dark:hover:border-slate-600';
  const variantClass = variant === 'stat' ? 'min-h-[140px] flex flex-col justify-between' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children ? (
        children
      ) : (
        <div className='space-y-2'>
          {icon && <div className='text-2xl'>{icon}</div>}
          {title && <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{title}</p>}
          {value && <p className='text-3xl font-bold text-gray-900 dark:text-white'>{value}</p>}
          {subtitle && <p className='text-xs text-gray-500 dark:text-gray-400'>{subtitle}</p>}
        </div>
      )}
    </motion.div>
  );
}
