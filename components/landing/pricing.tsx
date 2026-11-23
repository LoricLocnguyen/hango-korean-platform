"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/lib/mock-data";

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-50/50 dark:bg-slate-950/30 border-y border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Chi phí đầu tư học tập
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Lựa chọn gói học phù hợp với mục tiêu của bạn
          </h2>
          <p className="text-base text-muted-foreground">
            Bắt đầu hoàn toàn miễn phí hoặc nâng cấp lên gói Pro để mở khóa toàn bộ tiềm năng học tập cùng HanGo.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center">
            <div className="flex items-center p-1 rounded-xl bg-secondary border border-border">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  billingCycle === "monthly"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Theo tháng
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span>Theo năm</span>
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400">
                  Tiết kiệm 30%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl border p-7 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? "border-primary bg-background shadow-premium dark:shadow-premium-dark ring-2 ring-primary/20 md:-translate-y-2"
                  : "border-border/80 bg-card hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xs shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Được 85% học viên lựa chọn
                </div>
              )}

              <div>
                <h3 className="font-bold text-xl text-foreground">
                  {plan.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 min-h-[36px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-foreground tracking-tight">
                      {plan.id === "pro" && billingCycle === "yearly" ? "58.000đ" : plan.price}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {plan.id === "pro" && billingCycle === "yearly" ? "/tháng (trả hàng năm)" : plan.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-4 border-t border-border/60">
                  <p className="text-xs font-semibold text-foreground">
                    Bao gồm các quyền lợi:
                  </p>
                  <ul className="space-y-2.5 text-xs text-muted-foreground">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <Link href={plan.id === "free" ? "/signup" : "/signup?plan=" + plan.id}>
                  <Button
                    variant={plan.popular ? "premium" : "outline"}
                    size="lg"
                    className="w-full font-bold shadow-sm"
                  >
                    {plan.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
