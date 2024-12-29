import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GoalFormProps {
  goalText: string;
  setGoalText: (text: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  onClose: () => void;
}

const GoalForm = ({ goalText, setGoalText, endDate, setEndDate, onClose }: GoalFormProps) => {
  const { toast } = useToast();

  const handleSubmitGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("Creating goal with text:", goalText, "and end date:", endDate);
      
      const { data, error } = await supabase
        .from("goals")
        .insert({
          goal_text: goalText,
          end_date: new Date(endDate).toISOString(),
          // For development, we're using a fixed user_id
          user_id: "00000000-0000-0000-0000-000000000000"
        })
        .select();

      if (error) {
        console.error("Error creating goal:", error);
        toast({
          title: "Error",
          description: error.message || "Failed to create goal. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Goal created successfully:", data);
      toast({
        title: "Goal Created",
        description: "Your goal has been successfully set!",
      });
      
      onClose();
      setGoalText("");
      setEndDate("");
    } catch (error) {
      console.error("Unexpected error creating goal:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
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
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default GoalForm;