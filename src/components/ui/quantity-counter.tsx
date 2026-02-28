"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type QuantityCounterProps = {
  min?: number;
  max?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number, action: "inc" | "dec") => void;
  disabled: boolean;
};

export function QuantityCounter({
  min = 1,
  max = 99,
  value,
  defaultValue = 1,
  onChange,
  disabled = false,
}: QuantityCounterProps) {
  const [internalCount, setInternalCount] = useState(defaultValue);
  const [action, setAction] = useState<"inc" | "dec" | null>(null);
  const count = value !== undefined ? value : internalCount;

  useEffect(() => {
    if (value === undefined) {
      setInternalCount(defaultValue);
    }
  }, [defaultValue, value]);

  const increment = () => {
    if (count < max) {
      const newValue = count + 1;

      setAction("inc");

      if (value === undefined) {
        setInternalCount(newValue);
      }

      onChange?.(newValue, "inc");
    }
  };

  const decrement = () => {
    if (count > min) {
      const newValue = count - 1;

      setAction("dec");

      if (value === undefined) {
        setInternalCount(newValue);
      }

      onChange?.(newValue, "dec");
    }
  };

  return (
    <div className="flex items-center rounded-full border border-ring/30 hover:border-ring/80 p-1 w-fit">
      <Button
        variant="ghost"
        size="icon"
        onClick={decrement}
        disabled={count <= min || disabled}
        className="bg-primary/15 disabled:bg-ring/30"
      >
        {disabled && action === "dec" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>

      <div className="w-15 text-center text-2xl font-medium">{count}</div>

      <Button
        variant="ghost"
        size="icon"
        onClick={increment}
        disabled={count >= max || disabled}
        className="bg-primary/15 disabled:bg-ring/30"
      >
        {disabled && action === "inc" ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
