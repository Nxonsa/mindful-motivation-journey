import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface AnimatedProgressBarProps {
  progress: number;
  title: string;
  color?: string;
}

const AnimatedProgressBar = ({ progress, title, color = "bg-primary" }: AnimatedProgressBarProps) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [prevProgress, setPrevProgress] = useState(progress);

  useEffect(() => {
    if (progress === 100 && prevProgress !== 100) {
      setShowCelebration(true);
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      // Hide celebration after animation
      const timer = setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
    setPrevProgress(progress);
  }, [progress, prevProgress]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">{title}</h4>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className={`h-2 ${color}`}
      />
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center text-sm text-green-600 mt-2"
          >
            🎉 Goal Achieved! 🎉
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedProgressBar;