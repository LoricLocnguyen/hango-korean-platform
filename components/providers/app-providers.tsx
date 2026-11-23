"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useHanGoStore } from "@/lib/store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const initAuth = useHanGoStore((s) => s.initAuth);

  useEffect(() => {
    void initAuth();
  }, [initAuth]);

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
