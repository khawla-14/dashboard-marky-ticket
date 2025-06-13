"use client"

import type React from "react"

import { useState } from "react"
import { Bus, Clock, Download, Edit, Map, Plus, Search, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export function TrajetsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [departure, setDeparture] = useState("")
  const [destination, setDestination] = useState("")
  const [stations, setStations] = useState("")
  const [departureTime, setDepartureTime] = useState("")
  const [arrivalTime, setArrivalTime] = useState("")
  const [price, setPrice] = useState("")
  const { toast } = useToast()

  const [trajets, setTrajets] = useState([
    {
      id: "T-1001",
      name: "Bejaia Center - Oued Ghir",
      departure: "Bejaia Center",
      destination: "Oued Ghir",
      stations: "Bejaia Center, Sidi Aich, Oued Ghir",
      departureTime: "08:00",
      arrivalTime: "09:30",
      price: 15,
      busCount: 2,
      ticketCount: 87,
    },
    {
      id: "T-1002",
      name: "Bejaia Center - Tichy",
      departure: "Bejaia Center",
      destination: "Tichy",
      stations: "Bejaia Center, Souk El Tenine, Tichy",
      departureTime: "09:15",
      arrivalTime: "10:45",
      price: 15,
      busCount: 1,
      ticketCount: 42,
    },
    {
      id: "T-1003",
      name: "Bejaia Center - Kherrata",
      departure: "Bejaia Center",
      destination: "Kherrata",
      stations: "Bejaia Center, Amizour, Kherrata",
      departureTime: "10:30",
      arrivalTime: "12:00",
      price: 15,
      busCount: 1,
      ticketCount: 56,
    },
    {
      id: "T-1004",
      name: "Bejaia Center - Akbou",
      departure: "Bejaia Center",
      destination: "Akbou",
      stations: "Bejaia Center, Amizour, Akbou",
      departureTime: "07:45",
      arrivalTime: "09:15",
      price: 15,
      busCount: 1,
      ticketCount: 64,
    },
    {
      id: "T-1005",
      name: "Bejaia Center - El Kseur",
      departure: "Bejaia Center",
      destination: "El Kseur",
      stations: "Bejaia Center, El Kseur",
      departureTime: "14:00",
      arrivalTime: "14:30",
      price: 15,
      busCount: 1,
      ticketCount: 38,
    },
  ])

  const handleOpenDialog = (trajet?: (typeof trajets)[0]) => {
    if (trajet) {
      setIsEditMode(true)
      setCurrentId(trajet.id)
      setName(trajet.name)
      setDeparture(trajet.departure)
      setDestination(trajet.destination)
      setStations(trajet.stations)
      setDepartureTime(trajet.departureTime)
      setArrivalTime(trajet.arrivalTime)
      setPrice(trajet.price.toString())
    } else {
      setIsEditMode(false)
      setCurrentId(null)
      setName("")
      setDeparture("")
      setDestination("")
      setStations("")
      setDepartureTime("")
      setArrivalTime("")
      setPrice("")
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (
      !name.trim() ||
      !departure.trim() ||
      !destination.trim() ||
      !stations.trim() ||
      !departureTime ||
      !arrivalTime ||
      !price
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      })
      return
    }

    if (isEditMode && currentId) {
      // Update existing trajet
      setTrajets(
        trajets.map((trajet) =>
          trajet.id === currentId
            ? {
                ...trajet,
                name,
                departure,
                destination,
                stations,
                departureTime,
                arrivalTime,
                price: Number.parseFloat(price),
              }
            : trajet,
        ),
      )

      toast({
        title: "Route Updated",
        description: "The route has been successfully updated",
      })
    } else {
      // Add new trajet
      const newTrajet = {
        id: `T-${1000 + trajets.length + 1}`,
        name,
        departure,
        destination,
        stations,
        departureTime,
        arrivalTime,
        price: Number.parseFloat(price),
        busCount: 0,
        ticketCount: 0,
      }

      setTrajets([...trajets, newTrajet])

      toast({
        title: "Route Added",
        description: "The route has been successfully added",
      })
    }

    // Reset form and close dialog
    setIsDialogOpen(false)
  }

  const handleDeleteTrajet = (id: string) => {
    setTrajets(trajets.filter((trajet) => trajet.id !== id))

    toast({
      title: "Route Deleted",
      description: "The route has been successfully deleted",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Trajets</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Route
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{isEditMode ? "Edit Route" : "Add New Route"}</DialogTitle>
                  <DialogDescription>
                    {isEditMode ? "Edit route information." : "Add a new route to the application."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Route Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Bejaia Center - Oued Ghir"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="departure">Departure</Label>
                      <Input
                        id="departure"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        placeholder="Bejaia Center"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Oued Ghir"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stations">Stations (comma separated)</Label>
                    <Textarea
                      id="stations"
                      value={stations}
                      onChange={(e) => setStations(e.target.value)}
                      placeholder="Bejaia Center, Sidi Aich, Oued Ghir"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="departureTime">Departure Time</Label>
                      <Input
                        id="departureTime"
                        type="time"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="arrivalTime">Arrival Time</Label>
                      <Input
                        id="arrivalTime"
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">Price (DZA)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="15.00"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{isEditMode ? "Save" : "Add"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Routes Overview</CardTitle>
            <CardDescription>Statistics on available routes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Map className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{trajets.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Routes</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Bus className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">{trajets.reduce((sum, trajet) => sum + trajet.busCount, 0)}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Assigned Buses</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold">{trajets.reduce((sum, trajet) => sum + trajet.ticketCount, 0)}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Reserved Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Route List</CardTitle>
              <CardDescription>Manage available routes</CardDescription>
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
                <div className="col-span-2">Stations</div>
                <div className="col-span-2">Schedule</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-1">Buses</div>
                <div className="col-span-2">Tickets</div>
                <div className="col-span-1">Actions</div>
              </div>
              {trajets.map((trajet) => (
                <div
                  key={trajet.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-1 font-medium">{trajet.id}</div>
                  <div className="col-span-2">{trajet.name}</div>
                  <div className="col-span-2">{trajet.stations}</div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span>
                        {trajet.departureTime} - {trajet.arrivalTime}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1">{trajet.price.toFixed(2)} DZA</div>
                  <div className="col-span-1">{trajet.busCount}</div>
                  <div className="col-span-2">{trajet.ticketCount} reserved</div>
                  <div className="col-span-1">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => handleOpenDialog(trajet)}
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
                              This action cannot be undone. This will permanently delete the route and all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteTrajet(trajet.id)}
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
