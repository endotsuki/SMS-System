import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { mockGrades } from "@/data/mock";
import { DashboardCard } from "@/components/dashboard/DashboardCard";

export default function StudentGrades() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!currentUser) return null;

  const studentGrades = mockGrades.filter((g) => g.studentId === currentUser.id);
  const averageGrade =
    studentGrades.length > 0
      ? Math.round((studentGrades.reduce((sum, g) => sum + g.grade, 0) / studentGrades.length) * 10) / 10
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {translations.myGrades}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {studentGrades.length} {translations.graded}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
      >
        <DashboardCard
          title={translations.averageGrade}
          value={averageGrade}
          icon={<span className="text-3xl">📊</span>}
          variant="stat"
        />
        <DashboardCard
          title={translations.totalStudents}
          value={studentGrades.length}
          icon={<span className="text-3xl">📝</span>}
          variant="stat"
        />
        <DashboardCard
          title={translations.highestGrade}
          value={Math.max(...studentGrades.map((g) => g.grade), 0)}
          icon={<span className="text-3xl">⭐</span>}
          variant="stat"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {translations.gradeHistory}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  {translations.subject}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  {translations.grade}
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                  {translations.date}
                </th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.length > 0 ? (
                studentGrades.map((grade, index) => (
                  <motion.tr
                    key={grade.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-gray-100">
                      {grade.subject}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold">
                        {grade.grade}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {grade.date.toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-gray-600 dark:text-gray-400">
                    {translations.noGrades}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AppLayout>
  );
}
