import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface DailyTasksSectionProps {
  dailyTasks: string[];
  updateDailyTask: (index: number, value: string) => void;
  removeDailyTask: (index: number) => void;
  addDailyTask: () => void;
}

const DailyTasksSection = ({
  dailyTasks,
  updateDailyTask,
  removeDailyTask,
  addDailyTask,
}: DailyTasksSectionProps) => {
  return (
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
  );
};

export default DailyTasksSection;