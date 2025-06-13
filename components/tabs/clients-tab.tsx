"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Download, Plus, Search, Trash, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { exportToExcel } from "@/utils/export-to-excel"

export function ClientsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const { toast } = useToast()

  const [clients, setClients] = useState([
    {
      id: 1,
      username: "karim.benali",
      email: "karim.benali@example.com",
      phone: "0555 12 34 56",
      walletBalance: 15,
      totalSpent: 75,
      ticketsValidated: 12,
      ticketsPending: 2,
      registrationDate: "2023-01-15",
    },
    {
      id: 2,
      username: "amina.meziane",
      email: "amina.meziane@example.com",
      phone: "0555 23 45 67",
      walletBalance: 15,
      totalSpent: 60,
      ticketsValidated: 8,
      ticketsPending: 1,
      registrationDate: "2023-02-03",
    },
    {
      id: 3,
      username: "yacine.hamidi",
      email: "yacine.hamidi@example.com",
      phone: "0555 34 56 78",
      walletBalance: 0,
      totalSpent: 90,
      ticketsValidated: 15,
      ticketsPending: 0,
      registrationDate: "2023-01-20",
    },
    {
      id: 4,
      username: "souad.boudjemaa",
      email: "souad.boudjemaa@example.com",
      phone: "0555 45 67 89",
      walletBalance: 15,
      totalSpent: 45,
      ticketsValidated: 7,
      ticketsPending: 3,
      registrationDate: "2023-02-18",
    },
    {
      id: 5,
      username: "mohamed.khelifi",
      email: "mohamed.khelifi@example.com",
      phone: "0555 56 78 90",
      walletBalance: 15,
      totalSpent: 60,
      ticketsValidated: 10,
      ticketsPending: 1,
      registrationDate: "2023-01-25",
    },
  ])

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      })
      return
    }

    // Add new client
    const newClient = {
      id: clients.length + 1,
      username,
      email,
      phone,
      walletBalance: 0,
      totalSpent: 0,
      ticketsValidated: 0,
      ticketsPending: 0,
      registrationDate: new Date().toISOString().split("T")[0],
    }

    setClients([...clients, newClient])

    // Reset form
    setUsername("")
    setEmail("")
    setPassword("")
    setPhone("")

    // Close dialog
    setIsDialogOpen(false)

    // Show success toast
    toast({
      title: "Client Added",
      description: "The client has been successfully added",
    })
  }

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter((client) => client.id !== id))

    toast({
      title: "Client Deleted",
      description: "The client has been successfully deleted",
    })
  }

  const handleExport = () => {
    const dataToExport = clients.map((client) => ({
      ID: client.id,
      Username: client.username,
      Email: client.email,
      Phone: client.phone,
      "Wallet Balance": `${client.walletBalance} DZA`,
      "Total Spent": `${client.totalSpent} DZA`,
      "Validated Tickets": client.ticketsValidated,
      "Pending Tickets": client.ticketsPending,
      "Registration Date": client.registrationDate,
    }))

    exportToExcel(dataToExport, "clients")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Clients</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleAddClient}>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>Create a new client account for the application.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="karim.benali"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="karim.benali@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0555 12 34 56"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Clients Overview</CardTitle>
            <CardDescription>Statistics on application clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Clients</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, client) => sum + client.ticketsValidated, 0)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Validated Tickets</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, client) => sum + client.ticketsPending, 0)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Tickets</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, client) => sum + client.totalSpent, 0)} DZA
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Client List</CardTitle>
              <CardDescription>Manage application clients</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Username</div>
                <div className="col-span-2">Email</div>
                <div className="col-span-1">Phone</div>
                <div className="col-span-1">Balance</div>
                <div className="col-span-1">Spent</div>
                <div className="col-span-1">Validated</div>
                <div className="col-span-1">Pending</div>
                <div className="col-span-1">Registered</div>
                <div className="col-span-1">Actions</div>
              </div>
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-1 font-medium">{client.id}</div>
                  <div className="col-span-2">{client.username}</div>
                  <div className="col-span-2">{client.email}</div>
                  <div className="col-span-1">{client.phone}</div>
                  <div className="col-span-1">{client.walletBalance} DZA</div>
                  <div className="col-span-1">{client.totalSpent} DZA</div>
                  <div className="col-span-1">{client.ticketsValidated}</div>
                  <div className="col-span-1">{client.ticketsPending}</div>
                  <div className="col-span-1">{client.registrationDate}</div>
                  <div className="col-span-1">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the client and all associated data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteClient(client.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
