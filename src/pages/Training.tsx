import React from "react";
import { motion } from "framer-motion";
import { Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Training = () => {
  const [activeTask, setActiveTask] = React.useState<string | null>(null);

  const exercises = [
    {
      id: "run",
      title: "Running/Walking",
      description: "3km at your own pace",
      duration: "30 minutes",
      instructions: "Start slow and gradually increase your pace. Listen to your body.",
    },
    {
      id: "pushups",
      title: "Push-ups",
      description: "5 push-ups",
      duration: "5 minutes",
      instructions: "Keep your core tight and back straight. Modify on knees if needed.",
    }
  ];

  const handleStartExercise = (id: string) => {
    setActiveTask(id);
    toast({
      title: "Exercise Started",
      description: "Good luck! Remember to stay hydrated.",
    });
  };

  const handleCompleteExercise = (id: string) => {
    setActiveTask(null);
    toast({
      title: "Exercise Completed",
      description: "Great job! Keep up the good work!",
      variant: "default",
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Today's Training</h1>
      <div className="space-y-4">
        {exercises.map((exercise) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{exercise.title}</h3>
                <p className="text-sm text-gray-600">{exercise.description}</p>
                <p className="text-sm text-gray-500 mt-1">Duration: {exercise.duration}</p>
              </div>
              <Button
                variant={activeTask === exercise.id ? "secondary" : "default"}
                size="sm"
                onClick={() => 
                  activeTask === exercise.id 
                    ? handleCompleteExercise(exercise.id)
                    : handleStartExercise(exercise.id)
                }
              >
                {activeTask === exercise.id ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <h4 className="text-sm font-medium mb-2">Instructions:</h4>
              <p className="text-sm text-gray-600">{exercise.instructions}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Training;