"use client";

import React, { useMemo, useState } from "react";
import { Calendar, Info } from "lucide-react";
import { generateActivityHeatmap } from "@/lib/mock-data";

export function ActivityHeatmap() {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const data = useMemo(() => generateActivityHeatmap(), []);

  // Map levels 0-4 to tailwind color classes
  const colorMap = {
    0: "bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-800",
    1: "bg-blue-300 dark:bg-blue-900 border-blue-400 dark:border-blue-800",
    2: "bg-blue-500 dark:bg-blue-700 border-blue-600 dark:border-blue-600",
    3: "bg-indigo-600 dark:bg-indigo-600 border-indigo-700 dark:border-indigo-500",
    4: "bg-purple-600 dark:bg-purple-500 border-purple-700 dark:border-purple-400",
  };

  const totalXPPeriod = useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0);
  }, [data]);

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 gap-2 mb-4">
        <div>
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Lịch học tập chăm chỉ (Heatmap)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tổng cộng tích lũy <strong>{totalXPPeriod.toLocaleString("vi-VN")} XP</strong> trong 16 tuần gần nhất
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground self-start sm:self-auto">
          <span>Ít</span>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-xs bg-slate-100 dark:bg-slate-800 border border-border" />
            <div className="w-3 h-3 rounded-xs bg-blue-300 dark:bg-blue-900" />
            <div className="w-3 h-3 rounded-xs bg-blue-500 dark:bg-blue-700" />
            <div className="w-3 h-3 rounded-xs bg-indigo-600" />
            <div className="w-3 h-3 rounded-xs bg-purple-600" />
          </div>
          <span>Nhiều</span>
        </div>
      </div>

      {/* Heatmap Grid - 16 columns of 7 days */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[620px]">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5">
            {data.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredDay({ date: item.date, count: item.count })}
                onMouseLeave={() => setHoveredDay(null)}
                className={`w-3.5 h-3.5 rounded-xs border transition-transform hover:scale-125 cursor-pointer ${
                  colorMap[item.level]
                }`}
                title={`${item.date}: ${item.count} XP`}
              />
            ))}
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground mt-2 px-1">
            <span>16 tuần trước</span>
            <span>8 tuần trước</span>
            <span>Hôm nay (23/11/2026)</span>
          </div>
        </div>
      </div>

      {/* Hover preview tooltip */}
      <div className="mt-3 pt-3 border-t border-border/60 min-h-[24px] text-xs text-muted-foreground flex items-center justify-between">
        {hoveredDay ? (
          <span>
            Ngày <strong className="text-foreground">{hoveredDay.date}</strong>:{" "}
            <span className="text-primary font-bold">{hoveredDay.count} XP</span> đạt được
          </span>
        ) : (
          <span className="italic text-[11px]">
            Di chuột qua từng ô để xem chi tiết số điểm XP đã hoàn thành
          </span>
        )}
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
          🔥 Streak 14 ngày
        </span>
      </div>
    </div>
  );
}
