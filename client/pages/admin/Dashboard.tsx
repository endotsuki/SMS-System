import { motion } from "framer-motion";
import { Plus, Users, BookOpen, BarChart3, Bell } from "lucide-react";
import { mockClasses, mockUsers, mockAnnouncements } from "@/data/mock";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClassCard } from "@/components/dashboard/ClassCard";
import { AppLayout } from "@/components/layout/AppLayout";
import type { User } from "@/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Calculate stats
  const totalStudents = Object.values(mockUsers).filter(
    (u) => u.role === "student"
  ).length;
  const totalTeachers = Object.values(mockUsers).filter(
    (u) => u.role === "teacher"
  ).length;
  const totalClasses = mockClasses.length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome back, {currentUser.name}! Here's an overview of your school.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <StatCard
          label="Total Students"
          value={totalStudents}
          icon={<Users size={24} />}
          change={12}
          changeLabel="from last month"
          trend="up"
          color="blue"
        />
        <StatCard
          label="Total Teachers"
          value={totalTeachers}
          icon={<BookOpen size={24} />}
          change={5}
          changeLabel="from last month"
          trend="up"
          color="purple"
        />
        <StatCard
          label="Active Classes"
          value={totalClasses}
          icon={<BarChart3 size={24} />}
          change={2}
          changeLabel="new this term"
          trend="up"
          color="green"
        />
        <StatCard
          label="Announcements"
          value={mockAnnouncements.length}
          icon={<Bell size={24} />}
          changeLabel="pending reviews"
          color="orange"
        />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Classes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Classes</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {mockClasses.length} active classes
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={18} />
              New Class
            </motion.button>
          </div>

          {/* Classes List */}
          <div className="space-y-4">
            {mockClasses.map((classItem) => (
              <ClassCard
                key={classItem.id}
                classData={classItem}
                variant="list"
              />
            ))}
          </div>
        </motion.div>

        {/* Announcements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 h-fit"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Announcements</h2>
            <Bell size={20} className="text-blue-600" />
          </div>

          <div className="space-y-4">
            {mockAnnouncements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="pb-4 border-b border-gray-100 dark:border-slate-700 last:border-b-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                      announcement.priority === "high"
                        ? "bg-red-500"
                        : announcement.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-gray-300"
                    }`}
                  ></div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {announcement.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {announcement.content}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                      {announcement.createdDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8"
      >
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
        >
          <Plus size={28} />
        </motion.button>
      </motion.div>
    </AppLayout>
  );
}
