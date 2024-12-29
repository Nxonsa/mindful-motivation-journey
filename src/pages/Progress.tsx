import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Target } from "lucide-react";

const Progress = () => {
  const achievements = [
    {
      title: "First Week Complete",
      description: "Stayed committed for 7 days straight",
      icon: Trophy,
      date: "2024-03-15",
      unlocked: true,
    },
    {
      title: "Exercise Master",
      description: "Completed 10 training sessions",
      icon: Target,
      date: "2024-03-10",
      unlocked: true,
    },
    {
      title: "Reflection Guru",
      description: "Completed 30 daily reflections",
      icon: Star,
      date: null,
      unlocked: false,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Progress</h1>
        <p className="text-gray-600">Track your journey and achievements</p>
      </header>

      <section className="mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">7</p>
              <p className="text-sm text-gray-600">Days Clean</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-gray-600">Achievements</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl p-6 shadow-sm ${
                !achievement.unlocked && "opacity-50"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`p-3 rounded-full ${
                    achievement.unlocked ? "bg-primary/10" : "bg-gray-100"
                  }`}
                >
                  <achievement.icon
                    className={`w-6 h-6 ${
                      achievement.unlocked ? "text-primary" : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-text">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                  {achievement.date && (
                    <p className="text-sm text-gray-500 mt-1">
                      Unlocked: {achievement.date}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Progress;