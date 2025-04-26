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
      username: "jean.dupont",
      email: "jean.dupont@example.com",
      phone: "06 12 34 56 78",
      walletBalance: 45.5,
      totalSpent: 235.75,
      ticketsValidated: 12,
      ticketsPending: 2,
      registrationDate: "2023-01-15",
    },
    {
      id: 2,
      username: "marie.martin",
      email: "marie.martin@example.com",
      phone: "07 23 45 67 89",
      walletBalance: 12.25,
      totalSpent: 178.5,
      ticketsValidated: 8,
      ticketsPending: 1,
      registrationDate: "2023-02-03",
    },
    {
      id: 3,
      username: "pierre.durand",
      email: "pierre.durand@example.com",
      phone: "06 34 56 78 90",
      walletBalance: 0,
      totalSpent: 320.0,
      ticketsValidated: 15,
      ticketsPending: 0,
      registrationDate: "2023-01-20",
    },
    {
      id: 4,
      username: "sophie.petit",
      email: "sophie.petit@example.com",
      phone: "07 45 67 89 01",
      walletBalance: 78.3,
      totalSpent: 145.25,
      ticketsValidated: 7,
      ticketsPending: 3,
      registrationDate: "2023-02-18",
    },
    {
      id: 5,
      username: "thomas.bernard",
      email: "thomas.bernard@example.com",
      phone: "06 56 78 90 12",
      walletBalance: 25.75,
      totalSpent: 210.5,
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
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
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
      title: "Client ajouté",
      description: "Le client a été ajouté avec succès",
    })
  }

  const handleDeleteClient = (id: number) => {
    setClients(clients.filter((client) => client.id !== id))

    toast({
      title: "Client supprimé",
      description: "Le client a été supprimé avec succès",
    })
  }

  const handleExport = () => {
    const dataToExport = clients.map((client) => ({
      ID: client.id,
      "Nom d'utilisateur": client.username,
      Email: client.email,
      Téléphone: client.phone,
      "Solde portefeuille": client.walletBalance,
      "Total dépensé": client.totalSpent,
      "Tickets validés": client.ticketsValidated,
      "Tickets en attente": client.ticketsPending,
      "Date d'inscription": client.registrationDate,
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
            Exporter
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleAddClient}>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau client</DialogTitle>
                  <DialogDescription>Créez un nouveau compte client pour l'application.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="jean.dupont"
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
                      placeholder="jean.dupont@example.com"
                      required
                    />
                  </div>
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
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Ajouter</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des clients</CardTitle>
            <CardDescription>Statistiques sur les clients de l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{clients.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Clients inscrits</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CreditCard className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, client) => sum + client.walletBalance, 0).toFixed(2)} €
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total dans les portefeuilles</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, client) => sum + client.totalSpent, 0).toFixed(2)} €
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total dépensé</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold">
                  {clients.reduce((sum, client) => sum + client.ticketsValidated, 0)}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tickets validés</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Liste des clients</CardTitle>
              <CardDescription>Gérez les comptes clients de l'application</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-2">Nom d'utilisateur</div>
                <div className="col-span-2">Email</div>
                <div className="col-span-2">Téléphone</div>
                <div className="col-span-1">Solde</div>
                <div className="col-span-1">Dépensé</div>
                <div className="col-span-1">Validés</div>
                <div className="col-span-1">En attente</div>
                <div className="col-span-1">Inscription</div>
                <div className="col-span-1">Actions</div>
              </div>
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-2 font-medium">{client.username}</div>
                  <div className="col-span-2">{client.email}</div>
                  <div className="col-span-2">{client.phone}</div>
                  <div className="col-span-1">{client.walletBalance.toFixed(2)} €</div>
                  <div className="col-span-1">{client.totalSpent.toFixed(2)} €</div>
                  <div className="col-span-1">{client.ticketsValidated}</div>
                  <div className="col-span-1">{client.ticketsPending}</div>
                  <div className="col-span-1">{new Date(client.registrationDate).toLocaleDateString("fr-FR")}</div>
                  <div className="col-span-1">
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
                            Cette action ne peut pas être annulée. Cela supprimera définitivement le compte client et
                            toutes les données associées.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteClient(client.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Supprimer
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
