import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, Book } from "lucide-react";
import type { UserRole } from "@/types";
import { mockUsers } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@school.edu");
  const [password, setPassword] = useState("password");
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const roles: Array<{ value: UserRole; label: string; icon: any; description: string }> = [
    {
      value: "admin",
      label: "Admin",
      icon: User,
      description: "Manage school & users",
    },
    {
      value: "teacher",
      label: "Teacher",
      icon: Book,
      description: "Manage classes & grades",
    },
    {
      value: "student",
      label: "Student",
      icon: Book,
      description: "View assignments & grades",
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = Object.values(mockUsers).find(
        (u) => u.role === selectedRole
      );

      if (user) {
        // Store user in localStorage for persistence
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate(`/${selectedRole}`);
      } else {
        setError("Invalid credentials");
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
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      {/* Dark Modern Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-full p-4">
              <Book className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">LearnX</h1>
          <p className="text-gray-300 text-lg">
            School Management System
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-800 dark:bg-slate-800/80 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm"
        >
          <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              Welcome Back
            </h2>

            {/* Role Selector */}
            <motion.div variants={itemVariants} className="mb-8">
              <label className="block text-sm font-semibold text-white mb-3">
                Login as:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const RoleIcon = role.icon;
                  const isSelected = selectedRole === role.value;

                  return (
                    <motion.button
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 rounded-xl transition-all text-center ${isSelected
                        ? "bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-white shadow-lg"
                        : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                    >
                      <RoleIcon className="w-6 h-6 mx-auto mb-1" />
                      <p className="text-xs font-semibold">{role.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@school.edu"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Remember Me */}
              <motion.div variants={itemVariants} className="flex items-center">
                <Input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 accent-blue-600 rounded"
                  defaultChecked
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-400"
                >
                  Remember me
                </label>
              </motion.div>

              {/* Login Button */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 rounded-xl bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-pink-500/50 p-[1px]"
              >
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className=" w-full rounded-xl bg-black/40 backdrop-blur-xl text-white font-semibold py-2.5 transition-all hover:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Logging in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </motion.button>
              </motion.div>

            </form>

            {/* Demo Info */}
            <motion.div variants={itemVariants} className="mt-6 p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
              <p className="text-xs text-blue-300 font-medium">
                Demo Credentials:
              </p>
              <p className="text-xs text-blue-400 mt-1">
                Email: admin@school.edu (or teacher/student emails)
              </p>
              <p className="text-xs text-blue-400">
                Password: password (any password works)
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          variants={itemVariants}
          className="text-center text-white/80 text-sm mt-6"
        >
          &copy; {new Date().getFullYear()} LearnX. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  );
}
