import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { IconArrowRight, IconBolt, IconBook, IconChartBarPopular, IconUsers } from '@tabler/icons-react';
import { LanguageChanger } from '@/components/layout/LanguageChanger';

const features = [
  {
    icon: IconUsers,
    titleKey: 'roleBasedAccess',
    descKey: 'roleBasedAccessDesc',
    color: 'from-blue-400/30 to-blue-600/30',
  },
  {
    icon: IconBook,
    titleKey: 'classManagement',
    descKey: 'classManagementDesc',
    color: 'from-purple-400/30 to-purple-600/30',
  },
  {
    icon: IconChartBarPopular,
    titleKey: 'performanceAnalytics',
    descKey: 'performanceAnalyticsDesc',
    color: 'from-pink-400/30 to-pink-600/30',
  },
  {
    icon: IconBolt,
    titleKey: 'realTimeUpdates',
    descKey: 'realTimeUpdatesDesc',
    color: 'from-green-400/30 to-green-600/30',
  },
];

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

export default function Index() {
  const { translations, setLanguage, language } = useApp();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

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

      {/* Content */}
      <div className='relative z-10'>
        {/* Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'
        >
          <div className='flex items-center gap-2'>
            <img src='/logo.png' alt='LearnX Logo' className='h-8 w-auto' />
            <span className='text-lg font-medium'>SMS System</span>
          </div>
          <div className='flex items-center gap-4'>
            <Link
              to='/login'
              className='rounded-lg border border-white/20 bg-white/10 px-6 py-2 font-semibold backdrop-blur-md transition-colors hover:bg-white/20'
            >
              {translations.signIn}
            </Link>
            <div className='relative'>
              <LanguageChanger />
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div variants={containerVariants} initial='hidden' animate='visible' className='mx-auto max-w-6xl px-6 py-20 text-center'>
          <motion.h1 variants={itemVariants} className='mb-6 text-5xl font-medium leading-tight md:text-7xl'>
            {translations.moderWayToManage}{' '}
            <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              {translations.education}
            </span>
          </motion.h1>

          <motion.p variants={itemVariants} className='mx-auto mb-8 max-w-2xl text-xl text-gray-300'>
            {translations.lmsDescription}
          </motion.p>

          <motion.div variants={itemVariants} className='mb-12 flex flex-col justify-center gap-4 sm:flex-row'>
            {/* Get Started */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-[1px]'
            >
              <Link
                to='/login'
                className='inline-flex items-center justify-center gap-2 rounded-xl bg-black/40 px-8 py-3 font-semibold text-white backdrop-blur-xl hover:bg-black/50'
              >
                {translations.getStarted}
                <IconArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Learn More */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-[1px]'
            >
              <button className='rounded-xl bg-black/40 px-8 py-3 font-semibold text-white backdrop-blur-xl hover:bg-black/50'>
                {translations.learnMore}
              </button>
            </motion.div>
          </motion.div>

          {/* Demo Info */}
          <motion.div
            variants={itemVariants}
            className='mx-auto max-w-md rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md'
          >
            <p className='mb-3 text-sm text-gray-300'>{translations.demoCredentials}</p>
            <div className='space-y-2 text-left'>
              <p className='font-mono text-xs text-blue-300'>Admin: admin@school.edu</p>
              <p className='font-mono text-xs text-purple-300'>Teacher: m.chen@school.edu</p>
              <p className='font-mono text-xs text-pink-300'>Student: a.rivera@student.school.edu</p>
              <p className='mt-2 text-xs text-gray-400'>Password: password (any password works)</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section variants={containerVariants} initial='hidden' animate='visible' className='mx-auto max-w-6xl px-6 py-20'>
          <motion.h2 variants={itemVariants} className='mb-12 text-center text-5xl font-medium'>
            {translations.powerfulFeatures}
          </motion.h2>

          <motion.div className='grid grid-cols-1 gap-8 md:grid-cols-2' variants={containerVariants}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className='rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md hover:bg-white/15'
                  whileHover={{ y: -4 }}
                >
                  <div className={`inline-block rounded-2xl bg-gradient-to-br p-3 backdrop-blur-md ${feature.color} mb-4`}>
                    <Icon size={28} />
                  </div>
                  <h3 className='mb-2 text-xl font-semibold'>{translations[feature.titleKey as keyof typeof translations]}</h3>
                  <p className='text-gray-400'>{translations[feature.descKey as keyof typeof translations]}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* User Roles Section */}
        <motion.section variants={containerVariants} initial='hidden' animate='visible' className='mx-auto max-w-6xl px-6 py-20'>
          <motion.h2 variants={itemVariants} className='mb-12 text-center text-5xl font-medium'>
            {translations.builtForEveryone}
          </motion.h2>

          <motion.div className='grid grid-cols-1 gap-8 md:grid-cols-3' variants={containerVariants}>
            {[
              {
                id: 'administrators',
                role: translations.administrators,
                descKey: 'administratorsDesc',
                icon: '👨‍💼',
              },
              {
                id: 'teachers',
                role: translations.teachers,
                descKey: 'teachersDesc',
                icon: '👨‍🏫',
              },
              {
                id: 'students',
                role: translations.students,
                descKey: 'studentsDesc',
                icon: '👨‍🎓',
              },
            ].map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className='rounded-3xl border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md'
              >
                <div className='mb-4 text-5xl'>{item.icon}</div>
                <h3 className='mb-2 text-xl font-semibold'>{item.role}</h3>
                <p className='text-gray-400'>{translations[item.descKey as keyof typeof translations]}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mx-auto max-w-4xl px-6 py-20 text-center'
        >
          <motion.div
            variants={itemVariants}
            className='rounded-2xl border border-white/20 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-12 backdrop-blur-md'
          >
            <h2 className='mb-4 text-3xl font-bold'>{translations.readyToTransform}</h2>
            <p className='mb-8 text-gray-300'>{translations.readyToTransformDesc}</p>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className='inline-flex items-center rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-[1px]'
            >
              <Link
                to='/login'
                className='inline-flex items-center justify-center gap-2 rounded-xl bg-black/40 px-8 py-3 font-semibold text-white backdrop-blur-xl hover:bg-black/50'
              >
                {translations.signInNow}
                <IconArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          variants={itemVariants}
          className='mx-auto max-w-6xl border-t border-white/10 px-6 py-8 text-center text-sm text-gray-400'
        >
          {/* current year */}
          <p>&copy; {new Date().getFullYear()} LearnX. All rights reserved. Crafted with care for education.</p>
        </motion.footer>
      </div>

      {/* Global CSS for animations */}
    </div>
  );
}
