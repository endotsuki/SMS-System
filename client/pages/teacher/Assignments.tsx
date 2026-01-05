import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, Assignment } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { getClassesByTeacher, getClassAssignments } from "@/data/mock";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Plus, Filter } from "lucide-react";

export default function TeacherAssignments() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
  const navigate = useNavigate();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      
      // Get all assignments for teacher's classes
      const myClasses = getClassesByTeacher(parsedUser.id);
      const allAssignments: Assignment[] = [];
      myClasses.forEach(cls => {
        const classAssignments = getClassAssignments(cls.id);
        allAssignments.push(...classAssignments);
      });
      setAssignments(allAssignments);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!currentUser) return null;

  const filteredAssignments = filter === 'all' 
    ? assignments 
    : assignments.filter(a => a.status === filter);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const stats = {
    total: assignments.length,
    published: assignments.filter(a => a.status === 'published').length,
    draft: assignments.filter(a => a.status === 'draft').length,
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {translations.assignments}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {translations.manageSchool}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8"
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Assignments</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{stats.published}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Draft</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{stats.draft}</p>
        </div>
      </motion.div>

      {/* Filter and Action Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6"
      >
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500 dark:text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Assignments</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus size={18} />
          {translations.create} {translations.assignments}
        </motion.button>
      </motion.div>

      {/* Assignments List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-slate-900 transition-all hover:border-blue-200 dark:hover:border-blue-800 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {assignment.description}
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>{translations.dueDate}: {assignment.dueDate.toLocaleDateString()}</span>
                    <span>{assignment.points} {translations.points}</span>
                  </div>
                </div>
                <StatusBadge status={assignment.status} variant="published" />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
            <p className="text-gray-600 dark:text-gray-400">
              No assignments found with the selected filter.
            </p>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
