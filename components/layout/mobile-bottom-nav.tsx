"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Map, BookOpen, Layers, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on auth pages or lesson interactive mode
  if (
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/onboarding") ||
    pathname?.startsWith("/lesson/")
  ) {
    return null;
  }

  const navItems = [
    { href: "/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { href: "/learn", label: "Lộ trình", icon: Map },
    { href: "/vocabulary", label: "Từ vựng", icon: BookOpen },
    { href: "/flashcards", label: "Flashcard", icon: Layers },
    { href: "/profile", label: "Cá nhân", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/80 px-2 py-1.5 flex items-center justify-around safe-area-inset-bottom shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all",
              isActive
                ? "text-primary font-bold"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className={cn("p-1 rounded-lg transition-transform", isActive && "bg-primary/10 scale-110")}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
