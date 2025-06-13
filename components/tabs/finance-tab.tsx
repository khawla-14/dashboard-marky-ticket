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
  const walletBalance = 3245
  const validatedAmount = 12450
  const pendingAmount = 1875

  const dailyRevenue = 425
  const weeklyRevenue = 2875
  const monthlyRevenue = 12450
  const yearlyRevenue = 148500

  const onlineTickets = 7845
  const surPlaceTickets = 4605

  // Chart data
  const dailyData = [
    { name: "08:00", revenue: 50 },
    { name: "10:00", revenue: 75 },
    { name: "12:00", revenue: 120 },
    { name: "14:00", revenue: 85 },
    { name: "16:00", revenue: 65 },
    { name: "18:00", revenue: 28 },
  ]

  const weeklyData = [
    { name: "Mon", revenue: 425 },
    { name: "Tue", revenue: 385 },
    { name: "Wed", revenue: 475 },
    { name: "Thu", revenue: 520 },
    { name: "Fri", revenue: 625 },
    { name: "Sat", revenue: 285 },
    { name: "Sun", revenue: 158 },
  ]

  const monthlyData = [
    { name: "1", revenue: 1250 },
    { name: "5", revenue: 1450 },
    { name: "10", revenue: 1850 },
    { name: "15", revenue: 2250 },
    { name: "20", revenue: 2750 },
    { name: "25", revenue: 2900 },
  ]

  const yearlyData = [
    { name: "Jan", revenue: 8500 },
    { name: "Feb", revenue: 9250 },
    { name: "Mar", revenue: 10500 },
    { name: "Apr", revenue: 12450 },
    { name: "May", revenue: 14250 },
    { name: "Jun", revenue: 15750 },
    { name: "Jul", revenue: 16850 },
    { name: "Aug", revenue: 15250 },
    { name: "Sep", revenue: 13750 },
    { name: "Oct", revenue: 12250 },
    { name: "Nov", revenue: 11500 },
    { name: "Dec", revenue: 12450 },
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
    { name: "Online", value: onlineTickets },
    { name: "On-site", value: surPlaceTickets },
  ]

  const COLORS = ["#0088FE", "#00C49F"]

  const transactions = [
    {
      id: "TR-1001",
      client: "Ahmed Benali",
      type: "Ticket Purchase",
      amount: 15,
      date: "2023-04-15T14:30:00",
      status: "completed",
    },
    {
      id: "TR-1002",
      client: "Fatima Meziane",
      type: "Wallet Recharge",
      amount: 100,
      date: "2023-04-15T12:15:00",
      status: "completed",
    },
    {
      id: "TR-1003",
      client: "Karim Hamidi",
      type: "Ticket Purchase",
      amount: 15,
      date: "2023-04-15T10:45:00",
      status: "completed",
    },
    {
      id: "TR-1004",
      client: "Samira Boudjemaa",
      type: "Ticket Purchase",
      amount: 15,
      date: "2023-04-15T09:20:00",
      status: "pending",
    },
    {
      id: "TR-1005",
      client: "Mohamed Khelifi",
      type: "Wallet Recharge",
      amount: 50,
      date: "2023-04-15T08:10:00",
      status: "completed",
    },
  ]

  const handleExport = () => {
    const dataToExport = transactions.map((transaction) => ({
      ID: transaction.id,
      Client: transaction.client,
      Type: transaction.type,
      Amount: `${transaction.amount} DZA`,
      Date: new Date(transaction.date).toLocaleDateString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      Status: transaction.status === "completed" ? "Completed" : "Pending",
    }))

    exportToExcel(dataToExport, "financial-transactions")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Finance</h2>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Overview</CardTitle>
            <CardDescription>Application financial statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{walletBalance} DZA</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Wallet Balance</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">{validatedAmount} DZA</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Validated Tickets</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold">{pendingAmount} DZA</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Revenue by period</CardDescription>
              </div>
              <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
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
              <CardTitle>Ticket Distribution</CardTitle>
              <CardDescription>Distribution of ticket sales by type</CardDescription>
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
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-2">ID</div>
                <div className="col-span-3">Client</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Amount</div>
                <div className="col-span-3">Date</div>
              </div>
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-2 font-medium">{transaction.id}</div>
                  <div className="col-span-3">{transaction.client}</div>
                  <div className="col-span-2">{transaction.type}</div>
                  <div className="col-span-2">{transaction.amount} DZA</div>
                  <div className="col-span-3 text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
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
