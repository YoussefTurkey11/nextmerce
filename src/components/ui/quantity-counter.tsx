"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type QuantityCounterProps = {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

export function QuantityCounter({
  min = 1,
  max = 99,
  value,
  defaultValue = 1,
  onChange,
}: QuantityCounterProps) {
  const [internalCount, setInternalCount] = useState(defaultValue);

  const count = value !== undefined ? value : internalCount;

  useEffect(() => {
    if (value === undefined) {
      setInternalCount(defaultValue);
    }
  }, [defaultValue, value]);

  const increment = () => {
    if (count < max) {
      const newValue = count + 1;
      if (value === undefined) {
        setInternalCount(newValue);
      }
      onChange?.(newValue);
    }
  };

  const decrement = () => {
    if (count > min) {
      const newValue = count - 1;
      if (value === undefined) {
        setInternalCount(newValue);
      }
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex items-center rounded-full border border-ring/30 hover:border-ring/80 p-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={decrement}
        disabled={count <= min}
        className="bg-primary/15 disabled:bg-ring/30"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <div className="w-15 text-center text-2xl font-medium">{count}</div>

      <Button
        variant="ghost"
        size="icon"
        onClick={increment}
        disabled={count >= max}
        className="bg-primary/15 disabled:bg-ring/30"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
