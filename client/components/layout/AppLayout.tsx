import { useState } from "react";
  import { motion } from "framer-motion";
import type { User } from "@/types";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
  user: User;
  children: React.ReactNode;
  onLogout: () => void;
}

export function AppLayout({ user, children, onLogout }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <Sidebar
        userRole={user.role}
        userName={user.name}
        userAvatar={user.avatar}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onToggle={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="relative min-h-screen">
        {/* Navbar */}
        <Navbar user={user} sidebarOpen={sidebarOpen} />

        {/* Page Content */}
        <motion.div
          animate={{
            marginLeft: sidebarOpen ? "280px" : "80px",
          }}
          transition={{ duration: 0.3 }}
        >
          <main className="p-6 max-w-7xl mx-auto">
            {children}
          </main>
        </motion.div>
      </div>
    </div>
  );
}