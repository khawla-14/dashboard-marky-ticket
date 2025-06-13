"use client"

import { useState, useEffect } from "react"
import { Bell, Bus, CreditCard, FileText, Map, MessageSquare, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { exportToExcel } from "@/utils/export-to-excel"
import { Button } from "@/components/ui/button"

export function OverviewTab() {
  const [timeframe, setTimeframe] = useState("today")
  const [chartData, setChartData] = useState<any[]>([])
  const [distributionData, setDistributionData] = useState<any[]>([])

  // Sample data for different timeframes
  const dailyData = [
    { date: "08:00", tickets: 12 },
    { date: "10:00", tickets: 19 },
    { date: "12:00", tickets: 25 },
    { date: "14:00", tickets: 18 },
    { date: "16:00", tickets: 22 },
    { date: "18:00", tickets: 15 },
    { date: "20:00", tickets: 10 },
  ]

  const weeklyData = [
    { date: "Mon", tickets: 65 },
    { date: "Tue", tickets: 59 },
    { date: "Wed", tickets: 80 },
    { date: "Thu", tickets: 81 },
    { date: "Fri", tickets: 95 },
    { date: "Sat", tickets: 110 },
    { date: "Sun", tickets: 85 },
  ]

  const monthlyData = [
    { date: "1", tickets: 200 },
    { date: "5", tickets: 250 },
    { date: "10", tickets: 300 },
    { date: "15", tickets: 280 },
    { date: "20", tickets: 320 },
    { date: "25", tickets: 350 },
    { date: "30", tickets: 400 },
  ]

  const yearlyData = [
    { date: "Jan", tickets: 1200 },
    { date: "Feb", tickets: 1100 },
    { date: "Mar", tickets: 1300 },
    { date: "Apr", tickets: 1400 },
    { date: "May", tickets: 1500 },
    { date: "Jun", tickets: 1700 },
    { date: "Jul", tickets: 1800 },
    { date: "Aug", tickets: 1600 },
    { date: "Sep", tickets: 1400 },
    { date: "Oct", tickets: 1300 },
    { date: "Nov", tickets: 1500 },
    { date: "Dec", tickets: 1700 },
  ]

  // Distribution data
  const ticketDistribution = [
    { name: "Online", value: 65 },
    { name: "On-site", value: 35 },
  ]

  useEffect(() => {
    // Update chart data based on selected timeframe
    switch (timeframe) {
      case "today":
        setChartData(dailyData)
        break
      case "week":
        setChartData(weeklyData)
        break
      case "month":
        setChartData(monthlyData)
        break
      case "year":
        setChartData(yearlyData)
        break
      default:
        setChartData(monthlyData)
    }

    setDistributionData(ticketDistribution)
  }, [timeframe])

  const stats = [
    {
      title: "Total Clients",
      value: "1,248",
      description: "+12% from last month",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      link: "clients",
    },
    {
      title: "Total Tickets",
      value: "8,492",
      description: "+18% from last month",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      link: "tickets",
    },
    {
      title: "Total Collectors",
      value: "42",
      description: "+3 from last month",
      icon: <Users className="h-5 w-5 text-green-600" />,
      link: "receveurs",
    },
    {
      title: "Total Buses",
      value: "28",
      description: "+2 from last month",
      icon: <Bus className="h-5 w-5 text-orange-600" />,
      link: "busses",
    },
    {
      title: "Total Routes",
      value: "64",
      description: "+5 from last month",
      icon: <Map className="h-5 w-5 text-red-600" />,
      link: "trajets",
    },
    {
      title: "Total Feedbacks",
      value: "3,842",
      description: "+24% from last month",
      icon: <MessageSquare className="h-5 w-5 text-yellow-600" />,
      link: "feedbacks",
    },
    {
      title: "Revenue",
      value: "124,582 DZA",
      description: "+8% from last month",
      icon: <FileText className="h-5 w-5 text-emerald-600" />,
      link: "finance",
    },
    {
      title: "Notifications",
      value: "86",
      description: "Sent this month",
      icon: <Bell className="h-5 w-5 text-indigo-600" />,
      link: "notifications",
    },
  ]

  const handleExport = () => {
    const dataToExport = stats.map((stat) => ({
      Title: stat.title,
      Value: stat.value,
      Description: stat.description,
    }))

    exportToExcel(dataToExport, `statistics-${timeframe}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Overview</h2>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleExport}>
            Export Statistics
          </Button>
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.slice(0, 4).map((stat, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.slice(4).map((stat, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Ticket Sales</CardTitle>
            <CardDescription>
              {timeframe === "today" && "Number of tickets sold today"}
              {timeframe === "week" && "Number of tickets sold this week"}
              {timeframe === "month" && "Number of tickets sold this month"}
              {timeframe === "year" && "Number of tickets sold this year"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  tickets: {
                    label: "Tickets",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line type="monotone" dataKey="tickets" stroke="var(--color-tickets)" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Répartition des tickets</CardTitle>
            <CardDescription>Par type d'achat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Pourcentage",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={distributionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Les 5 dernières activités sur la plateforme</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Ticket validé #{1000 + i}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Il y a {i + 1} {i === 0 ? "minute" : "minutes"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trajets populaires</CardTitle>
            <CardDescription>Les trajets les plus réservés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { route: "Paris - Lyon", count: "342 tickets" },
                { route: "Marseille - Nice", count: "287 tickets" },
                { route: "Bordeaux - Toulouse", count: "256 tickets" },
                { route: "Lille - Paris", count: "234 tickets" },
                { route: "Lyon - Grenoble", count: "198 tickets" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <p className="text-sm font-medium">{item.route}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.count}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
