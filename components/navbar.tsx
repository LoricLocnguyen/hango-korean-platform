"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X, Flame, LayoutDashboard, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ui/theme-toggle";
import { useHanGoStore } from "@/lib/store";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useHanGoStore();

  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/onboarding");
  if (isAuthPage) return null;

  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/settings");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <span className="hangul-text text-lg">한</span>
            <Sparkles className="w-3.5 h-3.5 absolute -top-1 -right-1 text-amber-300 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">
              HanGo
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground -mt-1">
              Tiếng Hàn Thông Minh
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {!isDashboard ? (
            <>
              <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors">
                Tính năng
              </Link>
              <Link href="/#roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                Lộ trình học
              </Link>
              <Link href="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Bảng giá
              </Link>
              <Link href="/#faq" className="text-muted-foreground hover:text-primary transition-colors">
                Hỏi đáp
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 transition-colors ${
                  pathname === "/dashboard" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Bảng điều khiển
              </Link>
              <Link
                href="/settings"
                className={`flex items-center gap-1.5 transition-colors ${
                  pathname === "/settings" ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <User className="w-4 h-4" />
                Cá nhân
              </Link>
            </>
          )}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              {/* Streak Badge */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-xs">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                <span>{user.currentStreak} ngày</span>
              </div>

              {!isDashboard ? (
                <Link href="/dashboard">
                  <Button variant="premium" size="sm" className="gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Vào học ngay
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-muted-foreground hover:text-destructive gap-1.5"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </Button>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="premium" size="sm">
                  Học miễn phí
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-muted-foreground hover:bg-secondary"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {!isDashboard ? (
            <>
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Tính năng
              </Link>
              <Link
                href="/#roadmap"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Lộ trình học
              </Link>
              <Link
                href="/#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Bảng giá
              </Link>
              <Link
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Hỏi đáp
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Bảng điều khiển
              </Link>
              <Link
                href="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Cài đặt hồ sơ
              </Link>
            </>
          )}

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {!isAuthenticated ? (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="premium" className="w-full">
                    Học miễn phí ngay
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                Đăng xuất
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
