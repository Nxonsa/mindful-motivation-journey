import React from "react";
import { motion } from "framer-motion";
import { Calendar, Target, Award, Heart } from "lucide-react";

const Index = () => {
  const tasks = [
    {
      title: "Morning Reflection",
      description: "Complete your daily check-in",
      icon: Calendar,
      completed: false,
    },
    {
      title: "Daily Exercise",
      description: "30 minutes of physical activity",
      icon: Target,
      completed: false,
    },
    {
      title: "Evening Review",
      description: "Reflect on your progress",
      icon: Award,
      completed: true,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text mb-2">Welcome to GoalGuard</h1>
        <p className="text-text-light">Your journey to wellness continues</p>
      </header>

      <section className="mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">7</p>
              <p className="text-sm text-text-light">Days Clean</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">85%</p>
              <p className="text-sm text-text-light">Tasks Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-text-light">Achievements</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-sm flex items-center space-x-4"
            >
              <div
                className={`p-3 rounded-full ${
                  task.completed ? "bg-primary/10" : "bg-gray-100"
                }`}
              >
                <task.icon
                  className={`w-6 h-6 ${
                    task.completed ? "text-primary" : "text-gray-400"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-text">{task.title}</h3>
                <p className="text-sm text-text-light">{task.description}</p>
              </div>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  task.completed
                    ? "bg-primary/10 text-primary"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {task.completed ? "Completed" : "Start"}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="w-4 h-4 text-red-500" />
          <p>Created by Media Owl</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;