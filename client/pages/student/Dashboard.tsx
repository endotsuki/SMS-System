import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { BookOpen, FileText } from "lucide-react";
import { getStudentClasses, getStudentAssignments } from "@/data/mock";
import { ClassCard } from "@/components/dashboard/ClassCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export default function StudentDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!currentUser) {
    return null;
  }

  const enrolledClasses = getStudentClasses(currentUser.id);
  const upcomingAssignments = getStudentAssignments(currentUser.id).slice(0, 3);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {currentUser.name}! Here's your learning overview.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <DashboardCard
          title="Classes Enrolled"
          value={enrolledClasses.length}
          icon={<BookOpen size={24} className="text-blue-600" />}
          variant="stat"
        />
        <DashboardCard
          title="Pending Assignments"
          value={upcomingAssignments.length}
          icon={<FileText size={24} className="text-purple-600" />}
          variant="stat"
        />
        <DashboardCard
          title="Overall GPA"
          value="3.85"
          icon={<span className="text-2xl">📊</span>}
          subtitle="Based on latest grades"
          variant="stat"
        />
      </motion.div>

      {/* Classes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Enrolled Classes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledClasses.length > 0 ? (
            enrolledClasses.map((classItem) => (
              <ClassCard key={classItem.id} classData={classItem} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No classes enrolled yet</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Upcoming Assignments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Upcoming Assignments
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {upcomingAssignments.length > 0 ? (
            upcomingAssignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {assignment.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {assignment.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-xs text-gray-500">
                        Due: {assignment.dueDate.toLocaleDateString()}
                      </span>
                      <span className="text-xs font-medium text-blue-600">
                        {assignment.points} points
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={assignment.status} variant="published" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8">
              <FileText size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No upcoming assignments</p>
            </div>
          )}
        </div>
      </motion.div>
    </AppLayout>
  );
}
