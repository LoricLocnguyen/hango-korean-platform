import React from "react";
import { Sparkles } from "lucide-react";
import { cn, formatXP } from "@/lib/utils";

interface XPBadgeProps {
  xp: number;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export function XPBadge({ xp, className, showIcon = true, size = "md" }: XPBadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3.5 py-1.5 text-sm",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold bg-indigo-500/10 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 shadow-2xs",
        sizeClasses[size],
        className
      )}
    >
      {showIcon && <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />}
      <span>{formatXP(xp)} XP</span>
    </div>
  );
}
