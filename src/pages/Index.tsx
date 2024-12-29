import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Target, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [endDate, setEndDate] = useState("");
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("Auth state changed:", session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleSubmitGoal = async (e) => {
    e.preventDefault();
    
    if (!session?.user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create goals",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Creating goal with user_id:", session.user.id);
      const { error } = await supabase.from("goals").insert({
        goal_text: goalText,
        end_date: new Date(endDate).toISOString(),
        user_id: session.user.id,
      });

      if (error) {
        console.error("Error creating goal:", error);
        throw error;
      }

      toast({
        title: "Goal Created",
        description: "Your goal has been successfully set!",
      });
      
      setShowGoalForm(false);
      setGoalText("");
      setEndDate("");
    } catch (error) {
      console.error("Error creating goal:", error);
      toast({
        title: "Error",
        description: "Failed to create goal. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold text-primary mb-6">Welcome to Path to Progress</h1>
        <p className="mb-6 text-muted-foreground">Please sign in to start tracking your goals</p>
        <Auth 
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="light"
        />
      </div>
    );
  }

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

      {showGoalForm ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-xl p-6 shadow-sm mb-8"
          onSubmit={handleSubmitGoal}
        >
          <h3 className="text-lg font-semibold mb-4">Set Your Goal</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goal">What's your goal?</Label>
              <Input
                id="goal"
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="Enter your goal here"
                required
              />
            </div>
            <div>
              <Label htmlFor="endDate">Target completion date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">Set Goal</Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setShowGoalForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.form>
      ) : null}

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-xl p-4 shadow-sm flex items-center space-x-4"
            >
              <div
                className={`p-3 rounded-full ${
                  task.completed ? "bg-primary/10" : "bg-secondary"
                }`}
              >
                <task.icon
                  className={`w-6 h-6 ${
                    task.completed ? "text-primary" : "text-muted-foreground"
                  }`}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
              <Button
                onClick={task.action}
                variant={task.completed ? "secondary" : "default"}
              >
                {task.completed ? "Completed" : "Start"}
              </Button>
            </motion.div>
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