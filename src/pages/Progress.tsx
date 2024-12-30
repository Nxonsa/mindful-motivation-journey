import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Target } from "lucide-react";
import TaskCard from "@/components/TaskCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Progress = () => {
  const { toast } = useToast();

  // Fetch goals data
  const { data: goals, refetch } = useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching goals:', error);
        toast({
          title: "Error",
          description: "Failed to fetch goals",
          variant: "destructive",
        });
        throw error;
      }
      
      return data || [];
    }
  });

  // Calculate statistics
  const calculateStats = () => {
    if (!goals) return { daysActive: 0, tasksCompletion: 0, achievements: 0 };

    const uniqueDays = new Set(
      goals.map(goal => new Date(goal.created_at).toDateString())
    );
    
    const completedGoals = goals.filter(goal => goal.completed).length;
    const totalGoals = goals.length;
    const completionPercentage = totalGoals > 0 
      ? Math.round((completedGoals / totalGoals) * 100)
      : 0;

    return {
      daysActive: uniqueDays.size,
      tasksCompletion: completionPercentage,
      achievements: completedGoals
    };
  };

  const stats = calculateStats();

  const handleTaskAction = async (goalId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('goals')
        .update({ completed: !completed })
        .eq('id', goalId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Task ${!completed ? "completed" : "restarted"}`,
      });

      refetch();
    } catch (error) {
      console.error('Error updating goal:', error);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Daily Tasks to Achieve Goal</h1>
        <p className="text-gray-600">Track your journey and achievements</p>
      </header>

      <section className="mb-8">
        <div className="bg-card rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-secondary/10 rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{stats.daysActive}</p>
              <p className="text-sm text-muted-foreground">Days Active</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{stats.tasksCompletion}%</p>
              <p className="text-sm text-muted-foreground">Tasks Done</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-4">
              <p className="text-3xl font-bold text-primary">{stats.achievements}</p>
              <p className="text-sm text-muted-foreground">Achievements</p>
            </div>
          </div>
        </div>

        {goals?.map((goal, index) => (
          <div key={goal.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{goal.goal_text}</h2>
            <div className="space-y-4">
              {goal.daily_tasks?.map((task, taskIndex) => (
                <TaskCard
                  key={`${goal.id}-${taskIndex}`}
                  title={task}
                  description={`Part of goal: ${goal.goal_text}`}
                  icon={goal.completed ? Trophy : Target}
                  completed={goal.completed}
                  action={() => handleTaskAction(goal.id, goal.completed)}
                  index={taskIndex}
                />
              ))}
            </div>
          </div>
        ))}
        {!goals?.length && (
          <p className="text-center text-muted-foreground py-8">
            No goals yet. Start by adding some goals!
          </p>
        )}
      </section>
    </div>
  );
};

export default Progress;