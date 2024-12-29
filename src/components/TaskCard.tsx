import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  completed: boolean;
  action: () => void;
  index: number;
}

const TaskCard = ({ title, description, icon: Icon, completed, action, index }: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-xl p-4 shadow-sm flex items-center space-x-4"
    >
      <div className={`p-3 rounded-full ${completed ? "bg-primary/10" : "bg-secondary"}`}>
        <Icon className={`w-6 h-6 ${completed ? "text-primary" : "text-muted-foreground"}`} />
      </div>
      <div className="flex-1">
        <h3 className={`font-medium ${completed ? "line-through text-muted-foreground" : ""}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button 
        onClick={action} 
        variant={completed ? "secondary" : "default"}
        className="min-w-[100px]"
      >
        {completed ? "Restart" : "Complete"}
      </Button>
    </motion.div>
  );
};

export default TaskCard;