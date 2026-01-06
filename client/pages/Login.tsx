import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Book } from 'lucide-react';
import type { UserRole } from '@/types';
import { mockUsers } from '@/data/mock';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@school.edu');
  const [password, setPassword] = useState('password');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles: Array<{ value: UserRole; label: string; icon: any; description: string }> = [
    {
      value: 'admin',
      label: 'Admin',
      icon: User,
      description: 'Manage school & users',
    },
    {
      value: 'teacher',
      label: 'Teacher',
      icon: Book,
      description: 'Manage classes & grades',
    },
    {
      value: 'student',
      label: 'Student',
      icon: Book,
      description: 'View assignments & grades',
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = Object.values(mockUsers).find((u) => u.role === selectedRole);

      if (user) {
        // Store user in localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate(`/${selectedRole}`);
      } else {
        setError('Invalid credentials');
      }

      setIsLoading(false);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className='flex min-h-screen items-center justify-center overflow-hidden bg-slate-900 p-4 dark:bg-slate-950'>
      {/* Dark Modern Background */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Animated gradient blobs */}
        <div className='absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600/20 blur-3xl'></div>
        <div
          className='absolute right-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-600/20 blur-3xl'
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className='absolute bottom-1/4 left-1/4 h-72 w-72 animate-pulse rounded-full bg-blue-500/20 blur-3xl'
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      {/* Main Content */}
      <motion.div variants={containerVariants} initial='hidden' animate='visible' className='relative z-10 mx-auto w-full max-w-md'>
        {/* Header */}
        <motion.div variants={itemVariants} className='mb-8 text-center'>
          <div className='mb-4 flex justify-center'>
            <div className='rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-4'>
              <Book className='h-8 w-8 text-white' />
            </div>
          </div>
          <h1 className='mb-2 text-4xl font-bold text-white'>LearnX</h1>
          <p className='text-lg text-gray-300'>School Management System</p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={itemVariants}
          className='overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl backdrop-blur-sm dark:bg-slate-800/80'
        >
          <div className='p-8'>
            <h2 className='mb-6 text-2xl font-bold text-white'>Welcome Back</h2>

            {/* Role Selector */}
            <motion.div variants={itemVariants} className='mb-8'>
              <label className='mb-3 block text-sm font-semibold text-white'>Login as:</label>
              <div className='grid grid-cols-3 gap-3'>
                {roles.map((role) => {
                  const RoleIcon = role.icon;
                  const isSelected = selectedRole === role.value;

                  return (
                    <motion.button
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`rounded-xl p-4 text-center ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-white shadow-lg'
                          : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                      }`}
                    >
                      <RoleIcon className='mx-auto mb-1 h-6 w-6' />
                      <p className='text-xs font-semibold'>{role.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleLogin} className='space-y-4'>
              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <label className='mb-2 block text-sm font-medium text-gray-300'>Email Address</label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500' />
                  <Input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='admin@school.edu'
                    className='w-full rounded-lg border border-slate-600 bg-slate-700 py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <label className='mb-2 block text-sm font-medium text-gray-300'>Password</label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-500' />
                  <Input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='••••••••'
                    className='w-full rounded-lg border border-slate-600 bg-slate-700 py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700'
                >
                  {error}
                </motion.div>
              )}

              {/* Remember Me */}
              <motion.div variants={itemVariants} className='flex items-center'>
                <Input type='checkbox' id='remember' className='h-4 w-4 rounded accent-blue-600' defaultChecked />
                <label htmlFor='remember' className='ml-2 text-sm text-gray-400'>
                  Remember me
                </label>
              </motion.div>

              {/* Login Button */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='mt-6 rounded-xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 p-[1px]'
              >
                <motion.button
                  type='submit'
                  disabled={isLoading}
                  className='w-full rounded-xl bg-black/40 py-2.5 font-semibold text-white backdrop-blur-xl hover:bg-black/50 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  {isLoading ? (
                    <span className='flex items-center justify-center gap-2'>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className='h-4 w-4 rounded-full border-2 border-white/30 border-t-white'
                      />
                      Logging in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </motion.div>
            </form>

            {/* Demo Info */}
            <motion.div variants={itemVariants} className='mt-6 rounded-lg border border-blue-700/50 bg-blue-900/30 p-4'>
              <p className='text-xs font-medium text-blue-300'>Demo Credentials:</p>
              <p className='mt-1 text-xs text-blue-400'>Email: admin@school.edu (or teacher/student emails)</p>
              <p className='text-xs text-blue-400'>Password: password (any password works)</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p variants={itemVariants} className='mt-6 text-center text-sm text-white/80'>
          &copy; {new Date().getFullYear()} LearnX. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
