"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Download, Edit, Plus, Search, Trash, User } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export function ReceveursTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentId, setCurrentId] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [busId, setBusId] = useState("")
  const { toast } = useToast()

  const buses = [
    { id: "B-1001", name: "Bus Bejaia Center - Oued Ghir" },
    { id: "B-1002", name: "Bus Bejaia Center - Tichy" },
    { id: "B-1003", name: "Bus Bejaia Center - Kherrata" },
    { id: "B-1004", name: "Bus Bejaia Center - Akbou" },
    { id: "B-1005", name: "Bus Bejaia Center - El Kseur" },
  ]

  const [receveurs, setReceveurs] = useState([
    {
      id: 1,
      name: "Ahmed Benali",
      username: "ahmed.benali",
      email: "ahmed.benali@example.com",
      phone: "0555 12 34 56",
      busId: "B-1001",
      busName: "Bus Bejaia Center - Oued Ghir",
      ticketsValidated: 145,
      totalAmount: 2175,
    },
    {
      id: 2,
      name: "Fatima Meziane",
      username: "fatima.meziane",
      email: "fatima.meziane@example.com",
      phone: "0555 23 45 67",
      busId: "B-1002",
      busName: "Bus Bejaia Center - Tichy",
      ticketsValidated: 98,
      totalAmount: 1470,
    },
    {
      id: 3,
      name: "Karim Hamidi",
      username: "karim.hamidi",
      email: "karim.hamidi@example.com",
      phone: "0555 34 56 78",
      busId: "B-1003",
      busName: "Bus Bejaia Center - Kherrata",
      ticketsValidated: 112,
      totalAmount: 1680,
    },
    {
      id: 4,
      name: "Samira Boudjemaa",
      username: "samira.boudjemaa",
      email: "samira.boudjemaa@example.com",
      phone: "0555 45 67 89",
      busId: "B-1004",
      busName: "Bus Bejaia Center - Akbou",
      ticketsValidated: 87,
      totalAmount: 1305,
    },
    {
      id: 5,
      name: "Mohamed Khelifi",
      username: "mohamed.khelifi",
      email: "mohamed.khelifi@example.com",
      phone: "0555 56 78 90",
      busId: "B-1005",
      busName: "Bus Bejaia Center - El Kseur",
      ticketsValidated: 76,
      totalAmount: 1140,
    },
  ])

  const handleOpenDialog = (receveur?: (typeof receveurs)[0]) => {
    if (receveur) {
      setIsEditMode(true)
      setCurrentId(receveur.id)
      setName(receveur.name)
      setUsername(receveur.username)
      setEmail(receveur.email)
      setPhone(receveur.phone)
      setBusId(receveur.busId)
      setPassword("") // Don't set password for edit mode
    } else {
      setIsEditMode(false)
      setCurrentId(null)
      setName("")
      setUsername("")
      setEmail("")
      setPassword("")
      setPhone("")
      setBusId("")
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!name.trim() || !username.trim() || !email.trim() || (!isEditMode && !password.trim()) || !busId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      })
      return
    }

    const selectedBus = buses.find((bus) => bus.id === busId)

    if (isEditMode && currentId) {
      // Update existing receveur
      setReceveurs(
        receveurs.map((receveur) =>
          receveur.id === currentId
            ? {
                ...receveur,
                name,
                username,
                email,
                phone,
                busId,
                busName: selectedBus?.name || "",
              }
            : receveur,
        ),
      )

      toast({
        title: "Collector Updated",
        description: "The collector has been successfully updated",
      })
    } else {
      // Add new receveur
      const newReceveur = {
        id: receveurs.length + 1,
        name,
        username,
        email,
        phone,
        busId,
        busName: selectedBus?.name || "",
        ticketsValidated: 0,
        totalAmount: 0,
      }

      setReceveurs([...receveurs, newReceveur])

      toast({
        title: "Collector Added",
        description: "The collector has been successfully added",
      })
    }

    // Reset form and close dialog
    setIsDialogOpen(false)
  }

  const handleDeleteReceveur = (id: number) => {
    setReceveurs(receveurs.filter((receveur) => receveur.id !== id))

    toast({
      title: "Collector Deleted",
      description: "The collector has been successfully deleted",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Collectors</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Collector
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{isEditMode ? "Edit Collector" : "Add New Collector"}</DialogTitle>
                  <DialogDescription>
                    {isEditMode
                      ? "Edit collector information."
                      : "Create a new collector account for the application."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ahmed Benali"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="ahmed.benali"
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
                      placeholder="ahmed.benali@example.com"
                      required
                    />
                  </div>
                  {!isEditMode && (
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
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0555 12 34 56"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bus">Assigned Bus</Label>
                    <Select value={busId} onValueChange={setBusId} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bus" />
                      </SelectTrigger>
                      <SelectContent>
                        {buses.map((bus) => (
                          <SelectItem key={bus.id} value={bus.id}>
                            {bus.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{isEditMode ? "Update" : "Add"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Collectors Overview</CardTitle>
            <CardDescription>Statistics on application collectors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{receveurs.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Collectors</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">
                  {receveurs.reduce((sum, receveur) => sum + receveur.ticketsValidated, 0)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Validated Tickets</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold">
                  {receveurs.reduce((sum, receveur) => sum + receveur.totalAmount, 0)} DZA
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Collector List</CardTitle>
              <CardDescription>Manage application collectors</CardDescription>
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
                <div className="col-span-2">Name</div>
                <div className="col-span-2">Username</div>
                <div className="col-span-2">Email</div>
                <div className="col-span-1">Phone</div>
                <div className="col-span-2">Bus</div>
                <div className="col-span-1">Tickets</div>
                <div className="col-span-1">Amount</div>
              </div>
              {receveurs.map((receveur) => (
                <div
                  key={receveur.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-1 font-medium">{receveur.id}</div>
                  <div className="col-span-2">{receveur.name}</div>
                  <div className="col-span-2">{receveur.username}</div>
                  <div className="col-span-2">{receveur.email}</div>
                  <div className="col-span-1">{receveur.phone}</div>
                  <div className="col-span-2">{receveur.busName}</div>
                  <div className="col-span-1">{receveur.ticketsValidated}</div>
                  <div className="col-span-1">{receveur.totalAmount} DZA</div>
                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => handleOpenDialog(receveur)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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
                              This action cannot be undone. This will permanently delete the collector and all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteReceveur(receveur.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
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
