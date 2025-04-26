"use client"

import type React from "react"

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
