"use client"

import type React from "react"

import { useState } from "react"
import { Bus, Download, Edit, Plus, Search, Trash } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

export function BussesTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [currentId, setCurrentId] = useState<string | null>(null)
  const [matricule, setMatricule] = useState("")
  const [model, setModel] = useState("")
  const [capacity, setCapacity] = useState("")
  const [trajetId, setTrajetId] = useState("")
  const { toast } = useToast()

  const trajets = [
    { id: "T-1001", name: "Paris - Lyon" },
    { id: "T-1002", name: "Marseille - Nice" },
    { id: "T-1003", name: "Bordeaux - Toulouse" },
    { id: "T-1004", name: "Lille - Paris" },
    { id: "T-1005", name: "Lyon - Grenoble" },
  ]

  const [busses, setBusses] = useState([
    {
      id: "B-1001",
      matricule: "AB-123-CD",
      model: "Mercedes Tourismo",
      capacity: 50,
      trajetId: "T-1001",
      trajetName: "Paris - Lyon",
      status: "active",
    },
    {
      id: "B-1002",
      matricule: "EF-456-GH",
      model: "Volvo 9700",
      capacity: 45,
      trajetId: "T-1002",
      trajetName: "Marseille - Nice",
      status: "active",
    },
    {
      id: "B-1003",
      matricule: "IJ-789-KL",
      model: "Scania Touring",
      capacity: 55,
      trajetId: "T-1003",
      trajetName: "Bordeaux - Toulouse",
      status: "maintenance",
    },
    {
      id: "B-1004",
      matricule: "MN-012-OP",
      model: "Iveco Magelys",
      capacity: 48,
      trajetId: "T-1004",
      trajetName: "Lille - Paris",
      status: "active",
    },
    {
      id: "B-1005",
      matricule: "QR-345-ST",
      model: "Setra ComfortClass",
      capacity: 52,
      trajetId: "T-1005",
      trajetName: "Lyon - Grenoble",
      status: "active",
    },
  ])

  const handleOpenDialog = (bus?: (typeof busses)[0]) => {
    if (bus) {
      setIsEditMode(true)
      setCurrentId(bus.id)
      setMatricule(bus.matricule)
      setModel(bus.model)
      setCapacity(bus.capacity.toString())
      setTrajetId(bus.trajetId)
    } else {
      setIsEditMode(false)
      setCurrentId(null)
      setMatricule("")
      setModel("")
      setCapacity("")
      setTrajetId("")
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!matricule.trim() || !model.trim() || !capacity || !trajetId) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
      })
      return
    }

    const selectedTrajet = trajets.find((trajet) => trajet.id === trajetId)

    if (isEditMode && currentId) {
      // Update existing bus
      setBusses(
        busses.map((bus) =>
          bus.id === currentId
            ? {
                ...bus,
                matricule,
                model,
                capacity: Number.parseInt(capacity),
                trajetId,
                trajetName: selectedTrajet?.name || "",
              }
            : bus,
        ),
      )

      toast({
        title: "Bus modifié",
        description: "Le bus a été modifié avec succès",
      })
    } else {
      // Add new bus
      const newBus = {
        id: `B-${1000 + busses.length + 1}`,
        matricule,
        model,
        capacity: Number.parseInt(capacity),
        trajetId,
        trajetName: selectedTrajet?.name || "",
        status: "active",
      }

      setBusses([...busses, newBus])

      toast({
        title: "Bus ajouté",
        description: "Le bus a été ajouté avec succès",
      })
    }

    // Reset form and close dialog
    setIsDialogOpen(false)
  }

  const handleDeleteBus = (id: string) => {
    setBusses(busses.filter((bus) => bus.id !== id))

    toast({
      title: "Bus supprimé",
      description: "Le bus a été supprimé avec succès",
    })
  }

  const activeBusses = busses.filter((bus) => bus.status === "active")
  const maintenanceBusses = busses.filter((bus) => bus.status === "maintenance")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Bus</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un bus
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{isEditMode ? "Modifier un bus" : "Ajouter un nouveau bus"}</DialogTitle>
                  <DialogDescription>
                    {isEditMode ? "Modifiez les informations du bus." : "Ajoutez un nouveau bus à la flotte."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="matricule">Matricule</Label>
                    <Input
                      id="matricule"
                      value={matricule}
                      onChange={(e) => setMatricule(e.target.value)}
                      placeholder="AB-123-CD"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="model">Modèle</Label>
                    <Input
                      id="model"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Mercedes Tourismo"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacité (places)</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="50"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="trajet">Trajet assigné</Label>
                    <Select value={trajetId} onValueChange={setTrajetId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un trajet" />
                      </SelectTrigger>
                      <SelectContent>
                        {trajets.map((trajet) => (
                          <SelectItem key={trajet.id} value={trajet.id}>
                            {trajet.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{isEditMode ? "Enregistrer" : "Ajouter"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des bus</CardTitle>
            <CardDescription>Statistiques sur la flotte de bus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Bus className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{busses.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total des bus</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold">{activeBusses.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bus actifs</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold">{maintenanceBusses.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bus en maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Liste des bus</CardTitle>
              <CardDescription>Gérez la flotte de bus</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Matricule</div>
                <div className="col-span-2">Modèle</div>
                <div className="col-span-1">Capacité</div>
                <div className="col-span-3">Trajet assigné</div>
                <div className="col-span-2">Statut</div>
                <div className="col-span-1">Actions</div>
              </div>
              {busses.map((bus) => (
                <div
                  key={bus.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-1 font-medium">{bus.id}</div>
                  <div className="col-span-2">{bus.matricule}</div>
                  <div className="col-span-2">{bus.model}</div>
                  <div className="col-span-1">{bus.capacity} places</div>
                  <div className="col-span-3">{bus.trajetName}</div>
                  <div className="col-span-2">
                    {bus.status === "active" && <Badge className="bg-green-500">Actif</Badge>}
                    {bus.status === "maintenance" && <Badge className="bg-yellow-500">En maintenance</Badge>}
                  </div>
                  <div className="col-span-1">
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => handleOpenDialog(bus)}
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
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action ne peut pas être annulée. Cela supprimera définitivement le bus et toutes les
                              données associées.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteBus(bus.id)}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Supprimer
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
