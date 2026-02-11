import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-onSurface1 placeholder:text-onSurface3 selection:bg-primary1 selection:text-background1 h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-primaryContainer2 focus-visible:ring-primaryContainer3 focus-visible:ring-[3px]",
        "aria-invalid:ring-primaryContainer3 dark:aria-invalid:ring-primaryContainer3 aria-invalid:border-primaryContainer3",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
