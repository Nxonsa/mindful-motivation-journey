import React from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Trophy, TrendingUp } from "lucide-react";

const Progress = () => {
  // Sample data - in a real app, this would come from your backend
  const weeklyData = [
    { day: "Mon", completed: 3 },
    { day: "Tue", completed: 4 },
    { day: "Wed", completed: 2 },
    { day: "Thu", completed: 5 },
    { day: "Fri", completed: 3 },
    { day: "Sat", completed: 4 },
    { day: "Sun", completed: 5 },
  ];

  const stats = [
    {
      icon: Calendar,
      label: "Current Streak",
      value: "7 days",
    },
    {
      icon: Trophy,
      label: "Tasks Completed",
      value: "26",
    },
    {
      icon: TrendingUp,
      label: "Success Rate",
      value: "85%",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Progress;