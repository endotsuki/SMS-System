import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  trend?: "up" | "down" | "neutral";
  color?: "blue" | "green" | "purple" | "orange";
}

const colorSchemes: Record<string, { bg: string; text: string; icon: string }> =
  {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-900/20",
      text: "text-blue-600 dark:text-blue-400",
      icon: "text-blue-500 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-900/20",
      text: "text-green-600 dark:text-green-400",
      icon: "text-green-500 dark:text-green-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-900/20",
      text: "text-purple-600 dark:text-purple-400",
      icon: "text-purple-500 dark:text-purple-400",
    },
    orange: {
      bg: "bg-orange-50 dark:bg-orange-900/20",
      text: "text-orange-600 dark:text-orange-400",
      icon: "text-orange-500 dark:text-orange-400",
    },
  };

export function StatCard({
  label,
  value,
  icon,
  change,
  changeLabel,
  trend = "neutral",
  color = "blue",
}: StatCardProps) {
  const scheme = colorSchemes[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 p-6 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`${scheme.bg} rounded-lg p-3 ${scheme.icon}`}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold ${
              trend === "up"
                ? "text-green-600 dark:text-green-400"
                : trend === "down"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {trend === "up" && <ArrowUpRight size={14} />}
            {trend === "down" && <ArrowDownRight size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>

      {changeLabel && (
        <p
          className={`text-sm mt-2 ${
            trend === "up"
              ? "text-green-600 dark:text-green-400"
              : trend === "down"
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {changeLabel}
        </p>
      )}
    </motion.div>
  );
}
