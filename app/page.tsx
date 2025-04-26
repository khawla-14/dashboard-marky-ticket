"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoginPage from "@/components/login-page"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Bell,
  Check,
  ChevronDown,
  Clock,
  HelpCircle,
  LogOut,
  MoreVertical,
  Settings,
  ShoppingBag,
  Users,
  FileText,
  Calendar,
  Bus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (isLoggedIn === "true") {
      router.push("/dashboard")
    }
  }, [router])

  return <LoginPage />
}

export function Dashboard() {
  const [selectedBus, setSelectedBus] = useState<string>("104")

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#2D1A45] text-white flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b border-[#3D2A55]">
          <div className="bg-blue-500 p-1 rounded">
            <div className="w-5 h-5 flex flex-col justify-between">
              <div className="h-1 bg-white"></div>
              <div className="h-1 bg-white"></div>
              <div className="h-1 bg-white"></div>
            </div>
          </div>
          <span className="text-xl font-bold">EasyBus</span>
        </div>

        <nav className="flex-1 py-4">
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3D2A55]">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3D2A55]">
            <ShoppingBag size={20} />
            <span>Booking</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3D2A55]">
            <Calendar size={20} />
            <span>Schedule</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white bg-[#3D2A55]">
            <Bus size={20} />
            <span>Bus Management</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3D2A55]">
            <Users size={20} />
            <span>Customer Management</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3D2A55]">
            <FileText size={20} />
            <span>Report</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3D2A55]">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#3D2A55]">
            <HelpCircle size={20} />
            <span>Help & Support</span>
          </Link>
        </nav>

        {/* Promotion Card */}
        <div className="mx-4 mb-4 bg-[#2D1A45] rounded-lg p-4 relative">
          <div className="absolute -top-2 -left-2 text-yellow-400 text-xl">✦</div>
          <div className="absolute -top-2 -right-2 text-yellow-400 text-xl">✦</div>
          <div className="absolute -bottom-2 -left-2 text-yellow-400 text-xl">✦</div>
          <div className="absolute -bottom-2 -right-2 text-yellow-400 text-xl">✦</div>
          <div className="flex justify-center mb-2">
            <Image
              src="/placeholder.svg?height=80&width=150"
              alt="Bus"
              width={150}
              height={80}
              className="object-contain"
            />
          </div>
          <div className="text-center text-sm">
            <p>Make Your Journey</p>
            <p>Comfortable!</p>
          </div>
          <Button className="w-full mt-3 bg-[#1E1E1E] hover:bg-[#333333] text-white text-xs">Upgrade Now</Button>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-[#3D2A55]">
          <Link href="#" className="flex items-center gap-3 text-white">
            <LogOut size={20} />
            <span>Log Out</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white p-4 flex items-center justify-between border-b">
          <h1 className="text-xl font-medium">Good Morning!</h1>

          <div className="relative w-80">
            <Input placeholder="Search" className="pl-10 bg-gray-100 border-0" />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <Bell size={16} className="text-red-500" />
              <span className="text-sm">Next Bus Arrival: 11:30 AM</span>
            </div>

            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <span className="font-medium">Adam Smith</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-r from-[#1E0B2D] to-[#2D1A45] text-white">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-lg font-medium">Total Buses</CardTitle>
                <MoreVertical size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-1">150</div>
                <p className="text-sm opacity-80">Full fleet size for operations.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#B33B44] to-[#E67A77] text-white">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-lg font-medium">Active Buses</CardTitle>
                <MoreVertical size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-1">65</div>
                <p className="text-sm opacity-80">Buses currently in service.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#7B5AC5] to-[#9D7BE8] text-white">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-lg font-medium">In Maintenance</CardTitle>
                <MoreVertical size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-1">35</div>
                <p className="text-sm opacity-80">Buses in repair or check-up.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-[#2D1A45] to-[#4A2D6A] text-white">
              <CardHeader className="pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-lg font-medium">Available Buses</CardTitle>
                <MoreVertical size={16} />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-1">50</div>
                <p className="text-sm opacity-80">Ready for route assignment.</p>
              </CardContent>
            </Card>
          </div>

          {/* Bus List and Details */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <h2 className="text-xl font-medium mb-4">Bus List</h2>

              <div className="bg-white rounded-lg shadow">
                {/* Table Header */}
                <div className="grid grid-cols-5 p-4 border-b text-sm font-medium text-gray-500">
                  <div>Bus Number</div>
                  <div>Status</div>
                  <div>Current Route</div>
                  <div>Driver Information</div>
                  <div>Capacity</div>
                </div>

                {/* Table Rows */}
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-5 p-4 border-b text-sm hover:bg-gray-50 cursor-pointer ${index === 0 ? "bg-gray-50" : ""}`}
                    onClick={() => setSelectedBus("101")}
                  >
                    <div>Bus #101</div>
                    <div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                    </div>
                    <div>Dha to Ctg</div>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={`/placeholder.svg?text=${index + 1}`} />
                        <AvatarFallback>MS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Md. Shiraj</div>
                        <div className="text-xs text-gray-500">#45786</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>50 Seats</span>
                      <div className="flex items-center gap-2">
                        <Check size={16} className="text-green-500" />
                        <span className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                          !
                        </span>
                        <Clock size={16} className="text-gray-400" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bus Details */}
            <div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="mb-4">
                  <Image
                    src="/placeholder.svg?height=150&width=300"
                    alt="Bus"
                    width={300}
                    height={150}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Bus #{selectedBus}</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">Md. Shiraj</div>
                    <div className="text-xs text-gray-500">#45786</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Total Seats</div>
                      <div className="text-xl font-bold">50</div>
                    </CardContent>
                  </Card>

                  <Card className="border shadow-sm">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500">Available Seats</div>
                      <div className="text-xl font-bold text-green-600">32</div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mb-2">
                  <div className="font-medium">Dha to Ctg</div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Departure: 10:00 AM</span>
                    <span>Arrival: 06:00 PM</span>
                  </div>
                </div>

                {/* Map */}
                <div className="relative h-40 bg-gray-100 rounded-lg mt-4">
                  <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-gray-800 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/4 right-1/4 border-b-2 border-dashed border-blue-500"></div>

                  <div className="absolute top-1/2 left-1/4 -translate-y-8 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Ctg
                  </div>

                  <div className="absolute bottom-1/4 right-1/4 translate-x-2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                    Dha
                  </div>

                  <div className="absolute top-1/2 right-1/3 border border-blue-200 border-dashed p-2 rounded-lg">
                    <div className="text-xs text-blue-600">Cumilla</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
