"use client"

import { useState } from "react"
import { CheckCircle, Clock, Download, Filter, Search, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { exportToExcel } from "@/utils/export-to-excel"

export function TicketsTab() {
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const tickets = [
    {
      id: "T-1001",
      client: "Jean Dupont",
      trajet: "Paris - Lyon",
      date: "2023-04-15T10:30:00",
      validationDate: "2023-04-15T10:35:00",
      price: 45.5,
      status: "completed",
      type: "online",
    },
    {
      id: "T-1002",
      client: "Marie Martin",
      trajet: "Marseille - Nice",
      date: "2023-04-16T14:45:00",
      validationDate: null,
      price: 28.75,
      status: "pending",
      type: "online",
    },
    {
      id: "T-1003",
      client: "Pierre Durand",
      trajet: "Bordeaux - Toulouse",
      date: "2023-04-14T09:15:00",
      validationDate: "2023-04-14T09:20:00",
      price: 32.0,
      status: "completed",
      type: "surplace",
    },
    {
      id: "T-1004",
      client: "Sophie Petit",
      trajet: "Lille - Paris",
      date: "2023-04-17T16:20:00",
      validationDate: null,
      price: 38.5,
      status: "pending",
      type: "online",
    },
    {
      id: "T-1005",
      client: "Thomas Bernard",
      trajet: "Lyon - Grenoble",
      date: "2023-04-13T11:10:00",
      validationDate: null,
      price: 22.25,
      status: "canceled",
      cancelDate: "2023-04-12T18:45:00",
      type: "online",
    },
  ]

  const filteredTickets =
    selectedStatuses.length > 0 ? tickets.filter((ticket) => selectedStatuses.includes(ticket.status)) : tickets

  const completedTickets = tickets.filter((ticket) => ticket.status === "completed")
  const pendingTickets = tickets.filter((ticket) => ticket.status === "pending")
  const canceledTickets = tickets.filter((ticket) => ticket.status === "canceled")

  const totalAmount = tickets.reduce((sum, ticket) => sum + ticket.price, 0)
  const validatedAmount = completedTickets.reduce((sum, ticket) => sum + ticket.price, 0)
  const pendingAmount = pendingTickets.reduce((sum, ticket) => sum + ticket.price, 0)

  const handleExport = () => {
    const dataToExport = filteredTickets.map((ticket) => ({
      ID: ticket.id,
      Client: ticket.client,
      Trajet: ticket.trajet,
      Date: new Date(ticket.date).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      Prix: `${ticket.price.toFixed(2)} €`,
      Type: ticket.type === "online" ? "En ligne" : "Sur place",
      Statut: ticket.status === "completed" ? "Validé" : ticket.status === "pending" ? "En attente" : "Annulé",
      "Date de validation": ticket.validationDate
        ? new Date(ticket.validationDate).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "N/A",
    }))

    exportToExcel(dataToExport, "tickets")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Tickets</h2>
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des tickets</CardTitle>
            <CardDescription>Statistiques sur les tickets de l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="col-span-2 flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold">{tickets.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total tickets</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold">{completedTickets.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Validés</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold">{pendingTickets.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">En attente</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold">{canceledTickets.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Annulés</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold">{totalAmount.toFixed(2)} €</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Montant total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Liste des tickets</CardTitle>
              <CardDescription>Historique complet des tickets</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                <Input placeholder="Rechercher..." className="pl-8" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrer par statut</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={selectedStatuses.includes("completed")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, "completed"])
                      } else {
                        setSelectedStatuses(selectedStatuses.filter((s) => s !== "completed"))
                      }
                    }}
                  >
                    Validés
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedStatuses.includes("pending")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, "pending"])
                      } else {
                        setSelectedStatuses(selectedStatuses.filter((s) => s !== "pending"))
                      }
                    }}
                  >
                    En attente
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={selectedStatuses.includes("canceled")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStatuses([...selectedStatuses, "canceled"])
                      } else {
                        setSelectedStatuses(selectedStatuses.filter((s) => s !== "canceled"))
                      }
                    }}
                  >
                    Annulés
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Client</div>
                <div className="col-span-2">Trajet</div>
                <div className="col-span-2">Date</div>
                <div className="col-span-1">Prix</div>
                <div className="col-span-1">Type</div>
                <div className="col-span-1">Statut</div>
                <div className="col-span-2">Validation</div>
              </div>
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-1 font-medium">{ticket.id}</div>
                  <div className="col-span-2">{ticket.client}</div>
                  <div className="col-span-2">{ticket.trajet}</div>
                  <div className="col-span-2">
                    {new Date(ticket.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="col-span-1">{ticket.price.toFixed(2)} €</div>
                  <div className="col-span-1">
                    <Badge variant={ticket.type === "online" ? "outline" : "secondary"}>
                      {ticket.type === "online" ? "En ligne" : "Sur place"}
                    </Badge>
                  </div>
                  <div className="col-span-1">
                    {ticket.status === "completed" && <Badge className="bg-green-500">Validé</Badge>}
                    {ticket.status === "pending" && <Badge className="bg-yellow-500">En attente</Badge>}
                    {ticket.status === "canceled" && <Badge className="bg-red-500">Annulé</Badge>}
                  </div>
                  <div className="col-span-2">
                    {ticket.status === "completed" && ticket.validationDate && (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span>
                          {new Date(ticket.validationDate).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    )}
                    {ticket.status === "pending" && (
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Clock className="h-4 w-4" />
                        <span>En attente</span>
                      </div>
                    )}
                    {ticket.status === "canceled" && (
                      <div className="flex items-center gap-1 text-red-600">
                        <XCircle className="h-4 w-4" />
                        <span>
                          {ticket.cancelDate &&
                            new Date(ticket.cancelDate).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </span>
                      </div>
                    )}
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
