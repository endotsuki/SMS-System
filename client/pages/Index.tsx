import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Users,
  BookOpen,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const features = [
  {
    icon: Users,
    titleKey: "roleBasedAccess",
    descKey: "roleBasedAccessDesc",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: BookOpen,
    titleKey: "classManagement",
    descKey: "classManagementDesc",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: BarChart3,
    titleKey: "performanceAnalytics",
    descKey: "performanceAnalyticsDesc",
    color: "from-pink-400 to-pink-600",
  },
  {
    icon: Zap,
    titleKey: "realTimeUpdates",
    descKey: "realTimeUpdatesDesc",
    color: "from-green-400 to-green-600",
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
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Dark Modern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-2">
              <BookOpen size={28} />
            </div>
            <span className="text-2xl font-bold">LearnX</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20 font-semibold"
            >
              {translations.signIn}
            </Link>
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="p-2 text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
                title="Change Language"
              >
                <Globe size={20} />
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-white/20 rounded-lg shadow-lg z-50">
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'km', label: 'ភាសាខ្មែរ' },
                    { code: 'fr', label: 'Français' },
                  ].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code as any);
                        setShowLanguageMenu(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm rounded transition-colors ${language === lang.code
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-white/10'
                        }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6 py-20 text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            {translations.moderWayToManage}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {translations.education}
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            {translations.lmsDescription}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            {/* Get Started */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-[1px]"
            >
              <Link
                to="/login"
                className="
        inline-flex items-center justify-center gap-2
        px-8 py-3 rounded-xl
        bg-black/40 backdrop-blur-xl
        text-white font-semibold
        transition-all
        hover:bg-black/50
      "
              >
                {translations.getStarted}
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Learn More */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-[1px]"
            >
              <button
                className="
        px-8 py-3 rounded-xl
        bg-black/40 backdrop-blur-xl
        text-white font-semibold
        transition-all
        hover:bg-black/50
      "
              >
                {translations.learnMore}
              </button>
            </motion.div>
          </motion.div>


          {/* Demo Info */}
          <motion.div
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-md mx-auto"
          >
            <p className="text-sm text-gray-300 mb-3">{translations.demoCredentials}</p>
            <div className="space-y-2 text-left">
              <p className="text-xs font-mono text-blue-300">Admin: admin@school.edu</p>
              <p className="text-xs font-mono text-purple-300">Teacher: m.chen@school.edu</p>
              <p className="text-xs font-mono text-pink-300">Student: a.rivera@student.school.edu</p>
              <p className="text-xs text-gray-400 mt-2">Password: password (any password works)</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6 py-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-12 text-center"
          >
            {translations.powerfulFeatures}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all"
                  whileHover={{ y: -4 }}
                >
                  <div
                    className={`inline-block p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{translations[feature.titleKey as keyof typeof translations]}</h3>
                  <p className="text-gray-400">{translations[feature.descKey as keyof typeof translations]}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

        {/* User Roles Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6 py-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-bold mb-12 text-center"
          >
            {translations.builtForEveryone}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                role: translations.administrators,
                descKey: "administratorsDesc",
                icon: "👨‍💼",
              },
              {
                role: translations.teachers,
                descKey: "teachersDesc",
                icon: "👨‍🏫",
              },
              {
                role: translations.students,
                descKey: "studentsDesc",
                icon: "👨‍🎓",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-center"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.role}</h3>
                <p className="text-gray-400">{translations[item.descKey as keyof typeof translations]}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-6 py-20 text-center"
        >
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold mb-4">{translations.readyToTransform}</h2>
            <p className="text-gray-300 mb-8">
              {translations.readyToTransformDesc}
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-semibold transition-all"
            >
              {translations.signInNow}
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          variants={itemVariants}
          className="max-w-6xl mx-auto px-6 py-8 border-t border-white/10 text-center text-gray-400 text-sm"
        >
          {/* current year */}
          <p>&copy; {new Date().getFullYear()} LearnX. All rights reserved. Crafted with care for education.</p>
        </motion.footer>
      </div>

      {/* Global CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
