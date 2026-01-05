import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { User, Assignment } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { mockAssignments, mockUsers } from "@/data/mock";
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

export default function AssignmentDetail() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate("/");
    }

    if (assignmentId) {
      const found = mockAssignments.find(a => a.id === assignmentId);
      if (found) {
        setAssignment(found);
      }
    }
  }, [navigate, assignmentId]);

  if (!currentUser || !assignment) return null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  const isOverdue = new Date() > assignment.dueDate;
  const daysUntilDue = Math.ceil((assignment.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const mockSubmissions = [
    {
      id: '1',
      studentId: 'student1',
      studentName: 'Alex Rivera',
      submittedAt: new Date('2025-01-12'),
      grade: 88,
      status: 'graded' as const,
    },
    {
      id: '2',
      studentId: 'student2',
      studentName: 'Jordan Lee',
      submittedAt: new Date('2025-01-14'),
      grade: null,
      status: 'submitted' as const,
    },
    {
      id: '3',
      studentId: 'student3',
      studentName: 'Taylor Smith',
      submittedAt: null,
      grade: null,
      status: 'notSubmitted' as const,
    },
  ];

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
          {assignment.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {assignment.description}
        </p>
      </motion.div>

      {/* Assignment Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 mb-8"
      >
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {translations.assignmentDetails}
            </h2>
            
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
              <p>{assignment.description}</p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">Requirements</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Complete all sections of the assignment</li>
                <li>Submit in PDF or Word format</li>
                <li>Use proper citations for sources</li>
                <li>Maximum file size: 25 MB</li>
              </ul>
            </div>
          </div>

          {/* Submissions for Teachers */}
          {currentUser.role === 'teacher' && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {translations.submissionStatus}
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-slate-700">
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                        Student Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                        Submitted At
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-white">
                        Grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">
                          {submission.studentName}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge status={submission.status} variant="published" />
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                          {submission.submittedAt
                            ? submission.submittedAt.toLocaleDateString()
                            : '-'}
                        </td>
                        <td className="px-4 py-3">
                          {submission.grade ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded text-xs font-semibold">
                              {submission.grade}
                            </span>
                          ) : (
                            '-'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Summary:</strong> 1 graded, 1 submitted, 1 not submitted
                </p>
              </div>
            </div>
          )}

          {/* Student Submission Form */}
          {currentUser.role === 'student' && !submitted && (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {translations.submit}
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer">
                <Upload size={32} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-900 dark:text-white font-medium mb-1">
                  Drag and drop your file here
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  or click to select a file
                </p>
                <input type="file" className="hidden" />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Select File
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSubmitted(true)}
                className="w-full mt-6 bg-green-600 dark:bg-green-700 text-white px-4 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-medium"
              >
                {translations.submit}
              </motion.button>
            </div>
          )}

          {/* Submitted Confirmation */}
          {currentUser.role === 'student' && submitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-6 text-center"
            >
              <CheckCircle size={48} className="text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                Submitted Successfully!
              </h3>
              <p className="text-green-700 dark:text-green-300">
                Your assignment has been submitted. Your teacher will review it and provide feedback.
              </p>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Status
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Assignment Status</p>
                <StatusBadge status={assignment.status} variant="published" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Points</p>
                <p className="font-bold text-gray-900 dark:text-white text-lg">
                  {assignment.points} pts
                </p>
              </div>
            </div>
          </div>

          {/* Due Date Card */}
          <div className={`rounded-lg border p-6 ${
            isOverdue
              ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              : daysUntilDue <= 3
              ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
              : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'
          }`}>
            <div className="flex items-start gap-3">
              {isOverdue ? (
                <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" />
              ) : (
                <Clock className="text-orange-600 dark:text-orange-400 flex-shrink-0" />
              )}
              <div>
                <p className={`text-sm font-medium ${
                  isOverdue
                    ? 'text-red-800 dark:text-red-200'
                    : daysUntilDue <= 3
                    ? 'text-yellow-800 dark:text-yellow-200'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {isOverdue ? 'Overdue' : `Due in ${daysUntilDue} days`}
                </p>
                <p className={`text-sm font-semibold mt-1 ${
                  isOverdue
                    ? 'text-red-900 dark:text-red-100'
                    : daysUntilDue <= 3
                    ? 'text-yellow-900 dark:text-yellow-100'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {assignment.dueDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Created Date Card */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
            <p className="font-semibold text-gray-900 dark:text-white mt-1">
              {assignment.createdDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
}
