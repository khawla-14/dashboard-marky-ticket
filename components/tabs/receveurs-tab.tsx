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
    { id: "B-1001", name: "Bus Paris-Lyon" },
    { id: "B-1002", name: "Bus Marseille-Nice" },
    { id: "B-1003", name: "Bus Bordeaux-Toulouse" },
    { id: "B-1004", name: "Bus Lille-Paris" },
    { id: "B-1005", name: "Bus Lyon-Grenoble" },
  ]

  const [receveurs, setReceveurs] = useState([
    {
      id: 1,
      name: "Robert Dubois",
      username: "robert.dubois",
      email: "robert.dubois@example.com",
      phone: "06 12 34 56 78",
      busId: "B-1001",
      busName: "Bus Paris-Lyon",
      ticketsValidated: 145,
      totalAmount: 3625.5,
    },
    {
      id: 2,
      name: "Sylvie Moreau",
      username: "sylvie.moreau",
      email: "sylvie.moreau@example.com",
      phone: "07 23 45 67 89",
      busId: "B-1002",
      busName: "Bus Marseille-Nice",
      ticketsValidated: 98,
      totalAmount: 2450.75,
    },
    {
      id: 3,
      name: "Michel Lambert",
      username: "michel.lambert",
      email: "michel.lambert@example.com",
      phone: "06 34 56 78 90",
      busId: "B-1003",
      busName: "Bus Bordeaux-Toulouse",
      ticketsValidated: 112,
      totalAmount: 2800.25,
    },
    {
      id: 4,
      name: "Christine Dupuis",
      username: "christine.dupuis",
      email: "christine.dupuis@example.com",
      phone: "07 45 67 89 01",
      busId: "B-1004",
      busName: "Bus Lille-Paris",
      ticketsValidated: 87,
      totalAmount: 2175.0,
    },
    {
      id: 5,
      name: "Philippe Martin",
      username: "philippe.martin",
      email: "philippe.martin@example.com",
      phone: "06 56 78 90 12",
      busId: "B-1005",
      busName: "Bus Lyon-Grenoble",
      ticketsValidated: 76,
      totalAmount: 1900.5,
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
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
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
        title: "Receveur modifié",
        description: "Le receveur a été modifié avec succès",
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
        title: "Receveur ajouté",
        description: "Le receveur a été ajouté avec succès",
      })
    }

    // Reset form and close dialog
    setIsDialogOpen(false)
  }

  const handleDeleteReceveur = (id: number) => {
    setReceveurs(receveurs.filter((receveur) => receveur.id !== id))

    toast({
      title: "Receveur supprimé",
      description: "Le receveur a été supprimé avec succès",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Receveurs</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un receveur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{isEditMode ? "Modifier un receveur" : "Ajouter un nouveau receveur"}</DialogTitle>
                  <DialogDescription>
                    {isEditMode
                      ? "Modifiez les informations du receveur."
                      : "Créez un nouveau compte receveur pour l'application."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Robert Dubois"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="robert.dubois"
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
                      placeholder="robert.dubois@example.com"
                      required
                    />
                  </div>
                  {!isEditMode && (
                    <div className="grid gap-2">
                      <Label htmlFor="password">Mot de passe</Label>
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
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="bus">Bus assigné</Label>
                    <Select value={busId} onValueChange={setBusId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un bus" />
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
            <CardTitle>Aperçu des receveurs</CardTitle>
            <CardDescription>Statistiques sur les receveurs de l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{receveurs.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receveurs actifs</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">
                  {receveurs.reduce((sum, receveur) => sum + receveur.ticketsValidated, 0)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tickets validés</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold">
                  {receveurs.reduce((sum, receveur) => sum + receveur.totalAmount, 0).toFixed(2)} €
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Montant total validé</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Liste des receveurs</CardTitle>
              <CardDescription>Gérez les comptes receveurs de l'application</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-2">Nom</div>
                <div className="col-span-2">Email</div>
                <div className="col-span-2">Téléphone</div>
                <div className="col-span-2">Bus assigné</div>
                <div className="col-span-1">Tickets validés</div>
                <div className="col-span-2">Montant total</div>
                <div className="col-span-1">Actions</div>
              </div>
              {receveurs.map((receveur) => (
                <div
                  key={receveur.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-2 font-medium">{receveur.name}</div>
                  <div className="col-span-2">{receveur.email}</div>
                  <div className="col-span-2">{receveur.phone}</div>
                  <div className="col-span-2">{receveur.busName}</div>
                  <div className="col-span-1">{receveur.ticketsValidated}</div>
                  <div className="col-span-2">{receveur.totalAmount.toFixed(2)} €</div>
                  <div className="col-span-1">
                    <div className="flex items-center gap-1">
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
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action ne peut pas être annulée. Cela supprimera définitivement le compte receveur
                              et toutes les données associées.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteReceveur(receveur.id)}
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
