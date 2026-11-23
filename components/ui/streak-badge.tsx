import React from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakBadgeProps {
  streak: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function StreakBadge({ streak, className, size = "md" }: StreakBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold bg-amber-500/10 border border-amber-500/25 text-amber-600 dark:text-amber-400 shadow-2xs",
        sizeClasses[size],
        className
      )}
    >
      <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
      <span>{streak} ngày liên tiếp</span>
    </div>
  );
}
