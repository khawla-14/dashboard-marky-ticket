"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Bell, Bus, CreditCard, FileText, Home, LogOut, Map, MessageSquare, Moon, Sun, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { OverviewTab } from "@/components/tabs/overview-tab"
import { NotificationsTab } from "@/components/tabs/notifications-tab"
import { ClientsTab } from "@/components/tabs/clients-tab"
import { TicketsTab } from "@/components/tabs/tickets-tab"
import { ReceveursTab } from "@/components/tabs/receveurs-tab"
import { BussesTab } from "@/components/tabs/busses-tab"
import { TrajetsTab } from "@/components/tabs/trajets-tab"
import { FeedbacksTab } from "@/components/tabs/feedbacks-tab"
import { FinanceTab } from "@/components/tabs/finance-tab"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès",
    })
    router.push("/")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a365d] dark:bg-[#0f172a] text-white flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-[#2d4a77] dark:border-[#1e293b]">
          <div className="bg-blue-600 p-1 rounded">
            <Bus className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">MarkyTicket</span>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          <div className="px-4 mb-2 text-xs font-semibold text-gray-400 uppercase">Principal</div>
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "overview" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <Home size={20} />
            <span>Vue d'ensemble</span>
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "notifications" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <Bell size={20} />
            <span>Notifications</span>
          </button>

          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Gestion</div>
          <button
            onClick={() => setActiveTab("clients")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "clients" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <Users size={20} />
            <span>Clients</span>
          </button>
          <button
            onClick={() => setActiveTab("tickets")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "tickets" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <CreditCard size={20} />
            <span>Tickets</span>
          </button>
          <button
            onClick={() => setActiveTab("receveurs")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "receveurs" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <Users size={20} />
            <span>Receveurs</span>
          </button>
          <button
            onClick={() => setActiveTab("busses")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "busses" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <Bus size={20} />
            <span>Bus</span>
          </button>
          <button
            onClick={() => setActiveTab("trajets")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "trajets" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <Map size={20} />
            <span>Trajets</span>
          </button>

          <div className="px-4 mt-6 mb-2 text-xs font-semibold text-gray-400 uppercase">Rapports</div>
          <button
            onClick={() => setActiveTab("feedbacks")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "feedbacks" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <MessageSquare size={20} />
            <span>Feedbacks</span>
          </button>
          <button
            onClick={() => setActiveTab("finance")}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left text-white ${activeTab === "finance" ? "bg-[#2d4a77] dark:bg-[#1e293b]" : "hover:bg-[#2d4a77] dark:hover:bg-[#1e293b]"}`}
          >
            <FileText size={20} />
            <span>Finance</span>
          </button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#2d4a77] dark:border-[#1e293b]">
          <button onClick={handleLogout} className="flex items-center gap-3 text-white w-full text-left">
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 p-4 flex items-center justify-between border-b dark:border-gray-700">
          <h1 className="text-xl font-medium dark:text-white">Tableau de bord</h1>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium dark:text-white">Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@gmail.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "clients" && <ClientsTab />}
          {activeTab === "tickets" && <TicketsTab />}
          {activeTab === "receveurs" && <ReceveursTab />}
          {activeTab === "busses" && <BussesTab />}
          {activeTab === "trajets" && <TrajetsTab />}
          {activeTab === "feedbacks" && <FeedbacksTab />}
          {activeTab === "finance" && <FinanceTab />}
        </main>
      </div>
    </div>
  )
}
