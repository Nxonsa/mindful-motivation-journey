import { useState } from "react";
import { Button } from "@/components/ui/button";

const CalculatorDialog = () => {
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

export default CalculatorDialog;