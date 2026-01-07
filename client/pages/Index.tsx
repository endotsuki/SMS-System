import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { LanguageChanger } from '@/components/layout/LanguageChanger';
import { Button } from '@/components/ui/button';
import {
  IconUsers,
  IconBook,
  IconChartBarPopular,
  IconBolt,
  IconArrowRight,
  IconBookFilled,
  IconUserHexagon,
  IconChalkboardTeacher,
  IconSchool,
} from '@tabler/icons-react';

const features = [
  { icon: IconUsers, title: 'roleBasedAccess', desc: 'roleBasedAccessDesc' },
  { icon: IconBook, title: 'classManagement', desc: 'classManagementDesc' },
  { icon: IconChartBarPopular, title: 'performanceAnalytics', desc: 'performanceAnalyticsDesc' },
  { icon: IconBolt, title: 'realTimeUpdates', desc: 'realTimeUpdatesDesc' },
];

export default function LMSLandingGlass() {
  const { translations } = useApp();

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900'>
      {/* Navbar */}
      <nav className='relative z-[9999] mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <div className='flex items-center gap-2'>
          <img src='/logo.png' alt='Logo' className='h-8 w-auto' />
          <span className='text-lg font-medium'>SMS System</span>
        </div>
        <div className='flex items-center gap-4'>
          <Link to='/login'>
            <Button variant='outline'>{translations.signIn}</Button>
          </Link>
          <LanguageChanger />
        </div>
      </nav>

      {/* Hero Section */}
      <section className='relative z-10 px-6 py-32 text-center'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mb-6 text-5xl font-bold md:text-6xl'
        >
          {translations.moderWayToManage} <span className='text-blue-600 dark:text-blue-400'>{translations.education}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300'
        >
          {translations.lmsDescription}
        </motion.p>
        <motion.div className='flex flex-col justify-center gap-4 sm:flex-row'>
          <Link to='/login'>
            <Button variant='outline' size='lg' className='flex items-center gap-2'>
              {translations.getStarted}
              <IconArrowRight size={20} />
            </Button>
          </Link>
          <Link to='/login'>
            <Button variant='outline' size='lg' className='flex items-center gap-2'>
              {translations.learnMore}
              <IconBookFilled size={20} />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className='relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-20 md:grid-cols-2'>
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className='flex flex-col gap-4 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-md backdrop-blur-lg transition hover:shadow-lg dark:border-gray-700 dark:bg-white/5'
            >
              <div className='w-max rounded-2xl bg-white/20 p-3 backdrop-blur-sm dark:bg-gray-700/20'>
                <Icon size={28} stroke={1.5} className='text-gray-200 dark:text-gray-300' />
              </div>
              <h3 className='text-xl font-semibold'>{translations[feature.title as keyof typeof translations]}</h3>
              <p className='text-gray-300 dark:text-gray-400'>{translations[feature.desc as keyof typeof translations]}</p>
            </motion.div>
          );
        })}
      </section>

      {/* User Roles Section */}
      <section className='relative z-10 mx-auto max-w-6xl px-6 py-20 text-center'>
        <h2 className='mb-12 text-4xl font-semibold md:text-5xl'>{translations.builtForEveryone}</h2>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {[
            { icon: IconUserHexagon, role: translations.administrators, desc: 'administratorsDesc' },
            { icon: IconChalkboardTeacher, role: translations.teachers, desc: 'teachersDesc' },
            { icon: IconSchool, role: translations.students, desc: 'studentsDesc' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className='flex flex-col items-center gap-4 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-md backdrop-blur-lg transition hover:shadow-lg dark:border-gray-700 dark:bg-white/5'
            >
              <div className='w-max rounded-2xl bg-white/30 p-3 backdrop-blur-sm dark:bg-gray-700/30'>
                <item.icon size={40} stroke={1.5} className='text-gray-200 dark:text-gray-300' />
              </div>
              <h3 className='text-xl font-semibold'>{item.role}</h3>
              <p className='text-gray-300 dark:text-gray-400'>{translations[item.desc as keyof typeof translations]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='relative z-10 mx-auto max-w-4xl px-6 py-20 text-center'>
        <motion.div className='rounded-2xl border border-white/20 bg-white/10 p-12 shadow-md backdrop-blur-lg transition hover:shadow-lg dark:border-gray-700 dark:bg-white/5'>
          <h2 className='mb-4 text-3xl font-bold'>{translations.readyToTransform}</h2>
          <p className='mb-8 text-gray-300 dark:text-gray-400'>{translations.readyToTransformDesc}</p>
          <Link to='/login'>
            <Button variant='outline' size='lg' className='flex items-center gap-2'>
              {translations.signInNow}
              <IconArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className='relative z-10 border-t border-white/20 py-8 text-center text-sm text-gray-400 dark:border-gray-700'>
        &copy; {new Date().getFullYear()} LearnX. All rights reserved.
      </footer>
    </div>
  );
}
