import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Calculator } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface GoalFormProps {
  goalText: string;
  setGoalText: (text: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  onClose: () => void;
}

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("");

  const handleCalculate = () => {
    try {
      setResult(eval(display).toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+"
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={display}
          onChange={(e) => setDisplay(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="0"
        />
        <div className="text-right text-lg font-bold">{result}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => {
              if (btn === "=") {
                handleCalculate();
              } else {
                setDisplay(display + btn);
              }
            }}
            className="p-2 bg-[#F2FCE2] hover:bg-[#E5DEFF] rounded"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

const GoalForm = ({ goalText, setGoalText, endDate, setEndDate, onClose }: GoalFormProps) => {
  const { toast } = useToast();
  const [dailyTasks, setDailyTasks] = useState<string[]>([""]);
  const [resourceLinks, setResourceLinks] = useState<string[]>([""]);

  const handleSubmitGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("Creating goal with text:", goalText, "and end date:", endDate);
      
      const { data, error } = await supabase
        .from("goals")
        .insert({
          goal_text: goalText,
          end_date: new Date(endDate).toISOString(),
          daily_tasks: dailyTasks.filter(task => task.trim() !== ""),
          resource_links: resourceLinks.filter(link => link.trim() !== ""),
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

  const addDailyTask = () => {
    setDailyTasks([...dailyTasks, ""]);
  };

  const addResourceLink = () => {
    setResourceLinks([...resourceLinks, ""]);
  };

  const updateDailyTask = (index: number, value: string) => {
    const newTasks = [...dailyTasks];
    newTasks[index] = value;
    setDailyTasks(newTasks);
  };

  const updateResourceLink = (index: number, value: string) => {
    const newLinks = [...resourceLinks];
    newLinks[index] = value;
    setResourceLinks(newLinks);
  };

  const removeDailyTask = (index: number) => {
    setDailyTasks(dailyTasks.filter((_, i) => i !== index));
  };

  const removeResourceLink = (index: number) => {
    setResourceLinks(resourceLinks.filter((_, i) => i !== index));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl p-6 shadow-sm mb-8"
      onSubmit={handleSubmitGoal}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Set Your Goal</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="bg-[#D3E4FD] hover:bg-[#E5DEFF]">
              <Calculator className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Calculator</DialogTitle>
            </DialogHeader>
            <Calculator />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="goal">What's your goal?</Label>
          <Input
            id="goal"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="Enter your goal here"
            required
            className="bg-[#FEF7CD] placeholder:text-gray-500"
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
            className="bg-[#FDE1D3]"
          />
        </div>

        <div>
          <Label>Daily Tasks to Achieve Goal</Label>
          {dailyTasks.map((task, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <Input
                value={task}
                onChange={(e) => updateDailyTask(index, e.target.value)}
                placeholder="Enter a daily task"
                className="bg-[#F2FCE2]"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeDailyTask(index)}
                className="bg-[#FFDEE2] hover:bg-red-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addDailyTask}
            variant="outline"
            size="sm"
            className="mt-2 bg-[#F2FCE2] hover:bg-[#E5DEFF]"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Daily Task
          </Button>
        </div>

        <div>
          <Label>Resource Links</Label>
          {resourceLinks.map((link, index) => (
            <div key={index} className="flex gap-2 mt-2">
              <Input
                value={link}
                onChange={(e) => updateResourceLink(index, e.target.value)}
                placeholder="Enter a resource link"
                className="bg-[#E5DEFF]"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeResourceLink(index)}
                className="bg-[#FFDEE2] hover:bg-red-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={addResourceLink}
            variant="outline"
            size="sm"
            className="mt-2 bg-[#F2FCE2] hover:bg-[#E5DEFF]"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Resource Link
          </Button>
        </div>

        <div className="flex space-x-2">
          <Button type="submit" className="bg-[#F2FCE2] hover:bg-[#E5DEFF] text-black">
            Set Goal
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="bg-[#FFDEE2] hover:bg-red-200"
          >
            Cancel
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default GoalForm;