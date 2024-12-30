import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calculator as CalculatorIcon } from "lucide-react";
import CalculatorDialog from "../CalculatorDialog";

const GoalFormHeader = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-semibold">Set Your Goal</h3>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="bg-[#D3E4FD] hover:bg-[#E5DEFF]">
            <span className="h-4 w-4">
              <CalculatorIcon />
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Calculator</DialogTitle>
          </DialogHeader>
          <CalculatorDialog />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalFormHeader;