import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { User, Class, Assignment } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { mockClasses, getClassAssignments, getStudentsInClass } from "@/data/mock";
import { ArrowLeft, Users, BookOpen, Bell } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export default function ClassDetail() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [classData, setClassData] = useState<Class | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'assignments' | 'students' | 'announcements'>('info');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const navigate = useNavigate();
  const { classId } = useParams();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate("/");
    }

    if (classId) {
      const found = mockClasses.find(c => c.id === classId);
      if (found) {
        setClassData(found);
        setAssignments(getClassAssignments(classId));
        setStudents(getStudentsInClass(classId));
      }
    }
  }, [navigate, classId]);

  if (!currentUser || !classData) return null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-4"
        >
          <ArrowLeft size={18} />
          {translations.back}
        </button>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {classData.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {classData.code} • {classData.teacher.name}
        </p>
      </motion.div>

      {/* Class Header Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden mt-8 mb-8"
      >
        <div className="relative h-64 bg-gradient-to-r from-blue-500 to-purple-600">
          {classData.image && (
            <img
              src={classData.image}
              alt={classData.name}
              className="w-full h-full object-cover opacity-50"
            />
          )}
        </div>
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {classData.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {classData.description}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6 ml-8">
            <div className="text-center">
              <Users size={24} className="text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {classData.studentCount}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Students</p>
            </div>
            <div className="text-center">
              <BookOpen size={24} className="text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {assignments.length}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Assignments</p>
            </div>
            <div className="text-center">
              <Bell size={24} className="text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                3
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Announcements</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="border-b border-gray-200 dark:border-slate-700 mb-8"
      >
        <div className="flex gap-8">
          {['info', 'assignments', 'students', 'announcements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`pb-4 font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              {tab === 'info' && 'Class Info'}
              {tab === 'assignments' && translations.classAssignments}
              {tab === 'students' && translations.classStudents}
              {tab === 'announcements' && translations.classAnnouncements}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"></div>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                {translations.classInfo}
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</p>
                  <p className="text-gray-900 dark:text-white mt-1">{classData.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Instructor</p>
                  <p className="text-gray-900 dark:text-white mt-1">{classData.teacher.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{translations.schedule}</p>
                  <p className="text-gray-900 dark:text-white mt-1">{classData.schedule}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{translations.room}</p>
                  <p className="text-gray-900 dark:text-white mt-1">{classData.room}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Instructor</h3>
              <div className="flex items-center gap-4">
                <img
                  src={classData.teacher.avatar}
                  alt={classData.teacher.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{classData.teacher.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{classData.teacher.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Students</span>
                  <span className="font-medium text-gray-900 dark:text-white">{classData.studentCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Assignments</span>
                  <span className="font-medium text-gray-900 dark:text-white">{assignments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'assignments' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {assignments.length > 0 ? (
            assignments.map((assignment, index) => (
              <motion.div
                key={assignment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {assignment.description}
                    </p>
                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 dark:text-gray-400">
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
                No assignments yet
              </p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'students' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
        >
          {students.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 dark:text-white">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={student.avatar}
                            alt={student.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          {student.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {student.department}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                No students enrolled in this class
              </p>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'announcements' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                    i === 1
                      ? 'bg-red-500'
                      : i === 2
                      ? 'bg-yellow-500'
                      : 'bg-gray-400'
                  }`}
                ></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Announcement {i}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                    This is an important announcement for the class. Students should pay attention to this update.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                    2025-01-{10 + i}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AppLayout>
  );
}
