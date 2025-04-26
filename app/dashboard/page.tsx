"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "@/components/dashboard"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn !== "true") {
      router.push("/")
    }
  }, [router])

  return <Dashboard />
}
