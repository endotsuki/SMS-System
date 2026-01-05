import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User, Grade, Class } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { getClassesByTeacher, getClassGrades, getStudentClasses } from "@/data/mock";
import { ChevronDown } from "lucide-react";

export default function TeacherGrades() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [myClasses, setMyClasses] = useState<Class[]>([]);
  const navigate = useNavigate();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
      
      const classes = getClassesByTeacher(parsedUser.id);
      setMyClasses(classes);
      
      if (classes.length > 0) {
        setSelectedClass(classes[0]);
        setGrades(getClassGrades(classes[0].id));
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleClassChange = (classId: string) => {
    const selected = myClasses.find(c => c.id === classId);
    if (selected) {
      setSelectedClass(selected);
      setGrades(getClassGrades(selected.id));
    }
  };

  if (!currentUser || !selectedClass) return null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  // Group grades by student
  const gradesByStudent = grades.reduce((acc, grade) => {
    const existing = acc.find(g => g.studentId === grade.studentId);
    if (existing) {
      existing.grades.push(grade);
    } else {
      acc.push({ studentId: grade.studentId, grades: [grade] });
    }
    return acc;
  }, [] as { studentId: string; grades: Grade[] }[]);

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {translations.grades}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {translations.manageSchool}
        </p>
      </motion.div>

      {/* Class Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-6 mb-8"
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {translations.classes}
        </label>
        <div className="relative">
          <select
            value={selectedClass?.id || ''}
            onChange={(e) => handleClassChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {myClasses.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name} ({cls.code})
              </option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </motion.div>

      {/* Grades Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
      >
        {grades.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      {translations.student}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      {translations.subject}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      {translations.grade}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      {translations.date}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {grades.map((grade, index) => (
                    <motion.tr
                      key={grade.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-900 dark:text-white">
                        Student ID: {grade.studentId}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {grade.subject}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          grade.grade >= 80
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                            : grade.grade >= 70
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                        }`}>
                          {grade.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {grade.date.toLocaleDateString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {translations.noGrades}
            </p>
          </div>
        )}
      </motion.div>

      {/* Grade Statistics */}
      {grades.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Grade</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              {(grades.reduce((sum, g) => sum + g.grade, 0) / grades.length).toFixed(1)}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Highest Grade</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              {Math.max(...grades.map(g => g.grade))}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lowest Grade</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
              {Math.min(...grades.map(g => g.grade))}
            </p>
          </div>
        </motion.div>
      )}
    </AppLayout>
  );
}
