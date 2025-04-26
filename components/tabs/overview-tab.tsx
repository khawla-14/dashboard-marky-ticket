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
    { date: "Lun", tickets: 65 },
    { date: "Mar", tickets: 59 },
    { date: "Mer", tickets: 80 },
    { date: "Jeu", tickets: 81 },
    { date: "Ven", tickets: 95 },
    { date: "Sam", tickets: 110 },
    { date: "Dim", tickets: 85 },
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
    { date: "Fév", tickets: 1100 },
    { date: "Mar", tickets: 1300 },
    { date: "Avr", tickets: 1400 },
    { date: "Mai", tickets: 1500 },
    { date: "Juin", tickets: 1700 },
    { date: "Juil", tickets: 1800 },
    { date: "Août", tickets: 1600 },
    { date: "Sep", tickets: 1400 },
    { date: "Oct", tickets: 1300 },
    { date: "Nov", tickets: 1500 },
    { date: "Déc", tickets: 1700 },
  ]

  // Distribution data
  const ticketDistribution = [
    { name: "En ligne", value: 65 },
    { name: "Sur place", value: 35 },
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
      description: "+12% depuis le mois dernier",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      link: "clients",
    },
    {
      title: "Total Tickets",
      value: "8,492",
      description: "+18% depuis le mois dernier",
      icon: <CreditCard className="h-5 w-5 text-purple-600" />,
      link: "tickets",
    },
    {
      title: "Total Receveurs",
      value: "42",
      description: "+3 depuis le mois dernier",
      icon: <Users className="h-5 w-5 text-green-600" />,
      link: "receveurs",
    },
    {
      title: "Total Bus",
      value: "28",
      description: "+2 depuis le mois dernier",
      icon: <Bus className="h-5 w-5 text-orange-600" />,
      link: "busses",
    },
    {
      title: "Total Trajets",
      value: "64",
      description: "+5 depuis le mois dernier",
      icon: <Map className="h-5 w-5 text-red-600" />,
      link: "trajets",
    },
    {
      title: "Total Feedbacks",
      value: "3,842",
      description: "+24% depuis le mois dernier",
      icon: <MessageSquare className="h-5 w-5 text-yellow-600" />,
      link: "feedbacks",
    },
    {
      title: "Revenus",
      value: "124,582 €",
      description: "+8% depuis le mois dernier",
      icon: <FileText className="h-5 w-5 text-emerald-600" />,
      link: "finance",
    },
    {
      title: "Notifications",
      value: "86",
      description: "Envoyées ce mois-ci",
      icon: <Bell className="h-5 w-5 text-indigo-600" />,
      link: "notifications",
    },
  ]

  const handleExport = () => {
    const dataToExport = stats.map((stat) => ({
      Titre: stat.title,
      Valeur: stat.value,
      Description: stat.description,
    }))

    exportToExcel(dataToExport, `statistiques-${timeframe}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Vue d'ensemble</h2>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleExport}>
            Exporter les statistiques
          </Button>
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
              <TabsTrigger value="week">Semaine</TabsTrigger>
              <TabsTrigger value="month">Mois</TabsTrigger>
              <TabsTrigger value="year">Année</TabsTrigger>
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
            <CardTitle>Ventes de tickets</CardTitle>
            <CardDescription>
              {timeframe === "today" && "Nombre de tickets vendus aujourd'hui"}
              {timeframe === "week" && "Nombre de tickets vendus cette semaine"}
              {timeframe === "month" && "Nombre de tickets vendus ce mois-ci"}
              {timeframe === "year" && "Nombre de tickets vendus cette année"}
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
