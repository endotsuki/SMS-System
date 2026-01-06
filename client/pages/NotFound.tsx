import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { User } from '@/types';

export default function NotFound() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 p-4'>
      {/* Background Elements */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div className='absolute left-20 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl'></div>
        <div className='absolute bottom-20 right-20 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl'></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='relative z-10 max-w-md text-center text-white'
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className='mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-7xl font-bold text-transparent'
        >
          404
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className='mb-3 text-3xl font-bold'
        >
          Page Not Found
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className='mb-8 text-gray-400'>
          The page you're looking for doesn't exist. Let's get you back on track!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='flex flex-col justify-center gap-4 sm:flex-row'
        >
          <button
            onClick={() => navigate(-1)}
            className='flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur-md hover:bg-white/20'
          >
            <ArrowLeft size={20} />
            Go Back
          </button>

          {currentUser ? (
            <Link
              to={`/${currentUser.role}`}
              className='flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold hover:from-blue-600 hover:to-purple-700'
            >
              <Home size={20} />
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to='/'
              className='flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold hover:from-blue-600 hover:to-purple-700'
            >
              <Home size={20} />
              Go Home
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
