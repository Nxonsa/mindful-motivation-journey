import React, { useState } from "react";
import { Calendar, Target, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TaskCard from "@/components/TaskCard";
import GoalForm from "@/components/GoalForm";

const Index = () => {
  const navigate = useNavigate();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [endDate, setEndDate] = useState("");

  const tasks = [
    {
      title: "Morning Reflection",
      description: "Complete your daily check-in",
      icon: Calendar,
      completed: false,
      action: () => setShowGoalForm(true),
    },
    {
      title: "Daily Exercise",
      description: "30 minutes of physical activity",
      icon: Target,
      completed: false,
      action: () => navigate("/training"),
    },
    {
      title: "Evening Review",
      description: "Reflect on your progress",
      icon: Award,
      completed: false,
      action: () => navigate("/progress"),
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2 font-serif">Path to Progress</h1>
        <p className="text-xl text-muted-foreground font-light">Transform your aspirations into achievements</p>
      </header>

      <section className="mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Today's Progress</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">7</p>
              <p className="text-sm text-muted-foreground">Days Active</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">85%</p>
              <p className="text-sm text-muted-foreground">Tasks Done</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </div>
        </div>
      </section>

      {showGoalForm && (
        <GoalForm
          goalText={goalText}
          setGoalText={setGoalText}
          endDate={endDate}
          setEndDate={setEndDate}
          onClose={() => setShowGoalForm(false)}
        />
      )}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              index={index}
              title={task.title}
              description={task.description}
              icon={task.icon}
              completed={task.completed}
              action={task.action}
            />
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <Button
          variant="link"
          className="text-muted-foreground hover:text-primary transition-colors"
          onClick={() => window.open("https://mediaowl.co.za", "_blank")}
        >
          Created by Media Owl
        </Button>
      </footer>
    </div>
  );
};

export default Index;