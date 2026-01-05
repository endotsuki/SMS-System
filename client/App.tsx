import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot, type Root } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { NotificationProvider } from "@/context/NotificationContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ClassDetail from "./pages/ClassDetail";
import AssignmentDetail from "./pages/AssignmentDetail";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminClasses from "./pages/admin/Classes";
import AdminUsers from "./pages/admin/Users";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Teacher Pages
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherAssignments from "./pages/teacher/Assignments";
import TeacherClasses from "./pages/teacher/Classes";
import TeacherGrades from "./pages/teacher/Grades";
import TeacherSettings from "./pages/teacher/Settings";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentAssignments from "./pages/student/Assignments";
import StudentClasses from "./pages/student/Classes";
import StudentGrades from "./pages/student/Grades";
import StudentSettings from "./pages/student/Settings";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <AppProvider>
      <NotificationProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />

              {/* Shared Routes */}
              <Route path="/class/:classId" element={<ClassDetail />} />
              <Route path="/assignment/:assignmentId" element={<AssignmentDetail />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/classes" element={<AdminClasses />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/settings" element={<AdminSettings />} />

              {/* Teacher Routes */}
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/teacher/assignments" element={<TeacherAssignments />} />
              <Route path="/teacher/classes" element={<TeacherClasses />} />
              <Route path="/teacher/grades" element={<TeacherGrades />} />
              <Route path="/teacher/settings" element={<TeacherSettings />} />

              {/* Student Routes */}
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/assignments" element={<StudentAssignments />} />
              <Route path="/student/classes" element={<StudentClasses />} />
              <Route path="/student/grades" element={<StudentGrades />} />
              <Route path="/student/settings" element={<StudentSettings />} />

              {/* Catch-All Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
      </NotificationProvider>
    </AppProvider>
  );
}

// Initialize root
let root: Root | null = null;

function initializeApp() {
  const container = document.getElementById("root");
  if (!container) return;

  if (!root) {
    root = createRoot(container);
  }

  root.render(<AppContent />);
}

// Mount app
initializeApp();
