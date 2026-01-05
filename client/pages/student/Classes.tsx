import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types";
import { AppLayout } from "@/components/layout/AppLayout";
import { useApp } from "@/context/AppContext";
import { getStudentClasses } from "@/data/mock";
import { ClassCard } from "@/components/dashboard/ClassCard";

export default function StudentClasses() {
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

  const enrolledClasses = getStudentClasses(currentUser.id);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {translations.enrolledClasses}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          {enrolledClasses.length} {translations.classes}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
      >
        {enrolledClasses.length > 0 ? (
          enrolledClasses.map((classItem) => (
            <ClassCard key={classItem.id} classData={classItem} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {translations.noClassesEnrolled}
            </p>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
