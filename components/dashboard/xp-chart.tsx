"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, BarChart2 } from "lucide-react";
import { weeklyXPData, monthlyXPData } from "@/lib/mock-data";

export function XPChart() {
  const [tab, setTab] = useState<"week" | "month">("week");
  const data = tab === "week" ? weeklyXPData : monthlyXPData;

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
        <div>
          <h3 className="font-bold text-base text-foreground flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" />
            Biểu đồ tích lũy kinh nghiệm (XP)
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Theo dõi xu hướng học tập và duy trì nhịp độ ổn định
          </p>
        </div>

        {/* View switcher */}
        <div className="flex items-center p-1 rounded-xl bg-secondary border border-border">
          <button
            onClick={() => setTab("week")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              tab === "week"
                ? "bg-background text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tuần này
          </button>
          <button
            onClick={() => setTab("month")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              tab === "month"
                ? "bg-background text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tháng này
          </button>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis
              dataKey="day"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(11, 25, 44, 0.9)",
                borderColor: "#334155",
                borderRadius: "1rem",
                color: "#fff",
                fontSize: "12px",
                padding: "8px 12px",
              }}
              formatter={(value: any) => [`${value} XP`, "Kinh nghiệm"]}
              labelFormatter={(label) => `Thời gian: ${label}`}
            />
            <Area
              type="monotone"
              dataKey="xp"
              stroke="#2563EB"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorXp)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
          <TrendingUp className="w-3.5 h-3.5" />
          Tăng trưởng +28% so với tuần trước
        </span>
        <span>Mục tiêu tuần: 500 XP</span>
      </div>
    </div>
  );
}
