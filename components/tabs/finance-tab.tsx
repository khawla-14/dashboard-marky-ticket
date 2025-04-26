"use client"

import { useState } from "react"
import { CreditCard, Download, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { exportToExcel } from "@/utils/export-to-excel"

export function FinanceTab() {
  const [timeframe, setTimeframe] = useState("month")

  // Finance data
  const walletBalance = 3245.75
  const validatedAmount = 12450.5
  const pendingAmount = 1875.25

  const dailyRevenue = 425.5
  const weeklyRevenue = 2875.25
  const monthlyRevenue = 12450.5
  const yearlyRevenue = 148500.75

  const onlineTickets = 7845.25
  const surPlaceTickets = 4605.25

  // Chart data
  const dailyData = [
    { name: "08:00", revenue: 50.5 },
    { name: "10:00", revenue: 75.25 },
    { name: "12:00", revenue: 120.0 },
    { name: "14:00", revenue: 85.5 },
    { name: "16:00", revenue: 65.75 },
    { name: "18:00", revenue: 28.5 },
  ]

  const weeklyData = [
    { name: "Lun", revenue: 425.5 },
    { name: "Mar", revenue: 385.25 },
    { name: "Mer", revenue: 475.0 },
    { name: "Jeu", revenue: 520.75 },
    { name: "Ven", revenue: 625.5 },
    { name: "Sam", revenue: 285.25 },
    { name: "Dim", revenue: 158.0 },
  ]

  const monthlyData = [
    { name: "1", revenue: 1250.5 },
    { name: "5", revenue: 1450.25 },
    { name: "10", revenue: 1850.0 },
    { name: "15", revenue: 2250.75 },
    { name: "20", revenue: 2750.5 },
    { name: "25", revenue: 2900.25 },
  ]

  const yearlyData = [
    { name: "Jan", revenue: 8500.5 },
    { name: "Fév", revenue: 9250.25 },
    { name: "Mar", revenue: 10500.0 },
    { name: "Avr", revenue: 12450.5 },
    { name: "Mai", revenue: 14250.75 },
    { name: "Juin", revenue: 15750.5 },
    { name: "Juil", revenue: 16850.25 },
    { name: "Août", revenue: 15250.0 },
    { name: "Sep", revenue: 13750.75 },
    { name: "Oct", revenue: 12250.5 },
    { name: "Nov", revenue: 11500.25 },
    { name: "Déc", revenue: 12450.5 },
  ]

  const getChartData = () => {
    switch (timeframe) {
      case "day":
        return dailyData
      case "week":
        return weeklyData
      case "month":
        return monthlyData
      case "year":
        return yearlyData
      default:
        return monthlyData
    }
  }

  const distributionData = [
    { name: "En ligne", value: onlineTickets },
    { name: "Sur place", value: surPlaceTickets },
  ]

  const COLORS = ["#0088FE", "#00C49F"]

  const transactions = [
    {
      id: "TR-1001",
      client: "Jean Dupont",
      type: "Achat ticket",
      amount: 45.5,
      date: "2023-04-15T14:30:00",
      status: "completed",
    },
    {
      id: "TR-1002",
      client: "Marie Martin",
      type: "Recharge portefeuille",
      amount: 100.0,
      date: "2023-04-15T12:15:00",
      status: "completed",
    },
    {
      id: "TR-1003",
      client: "Pierre Durand",
      type: "Achat ticket",
      amount: 32.0,
      date: "2023-04-15T10:45:00",
      status: "completed",
    },
    {
      id: "TR-1004",
      client: "Sophie Petit",
      type: "Achat ticket",
      amount: 38.5,
      date: "2023-04-15T09:20:00",
      status: "pending",
    },
    {
      id: "TR-1005",
      client: "Thomas Bernard",
      type: "Recharge portefeuille",
      amount: 50.0,
      date: "2023-04-15T08:10:00",
      status: "completed",
    },
  ]

  const handleExport = () => {
    const dataToExport = transactions.map((transaction) => ({
      ID: transaction.id,
      Client: transaction.client,
      Type: transaction.type,
      Montant: `${transaction.amount.toFixed(2)} €`,
      Date: new Date(transaction.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      Statut: transaction.status === "completed" ? "Complété" : "En attente",
    }))

    exportToExcel(dataToExport, "transactions-financieres")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Finance</h2>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu financier</CardTitle>
            <CardDescription>Statistiques financières de l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{walletBalance.toFixed(2)} €</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Solde des portefeuilles</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">{validatedAmount.toFixed(2)} €</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tickets validés</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold">{pendingAmount.toFixed(2)} €</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tickets en attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenus</CardTitle>
                <CardDescription>Revenus par période</CardDescription>
              </div>
              <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="day">Jour</TabsTrigger>
                  <TabsTrigger value="week">Semaine</TabsTrigger>
                  <TabsTrigger value="month">Mois</TabsTrigger>
                  <TabsTrigger value="year">Année</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenus",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getChartData()}
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
                      <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Répartition des ventes</CardTitle>
              <CardDescription>Par type d'achat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value.toFixed(2)} €`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dernières transactions</CardTitle>
            <CardDescription>Historique des transactions récentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-2">ID</div>
                <div className="col-span-3">Client</div>
                <div className="col-span-3">Type</div>
                <div className="col-span-2">Montant</div>
                <div className="col-span-2">Date</div>
              </div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-2 font-medium">{transaction.id}</div>
                  <div className="col-span-3">{transaction.client}</div>
                  <div className="col-span-3">{transaction.type}</div>
                  <div className="col-span-2">
                    <span className={transaction.type === "Recharge portefeuille" ? "text-green-600" : "text-blue-600"}>
                      {transaction.type === "Recharge portefeuille" ? "+" : ""}
                      {transaction.amount.toFixed(2)} €
                    </span>
                  </div>
                  <div className="col-span-2">
                    {new Date(transaction.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
