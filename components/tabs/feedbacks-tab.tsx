"use client"
import { Download, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function FeedbacksTab() {
  const feedbacks = [
    {
      id: 1,
      client: "Jean Dupont",
      trajet: "Paris - Lyon",
      title: "Voyage agréable",
      content: "Le chauffeur était très professionnel et le bus confortable. Je recommande !",
      rating: 5,
      date: "2023-04-15T14:30:00",
    },
    {
      id: 2,
      client: "Marie Martin",
      trajet: "Marseille - Nice",
      title: "Bon service",
      content: "Trajet sans problème, bus propre et à l'heure.",
      rating: 4,
      date: "2023-04-14T10:15:00",
    },
    {
      id: 3,
      client: "Pierre Durand",
      trajet: "Bordeaux - Toulouse",
      title: "Retard important",
      content: "Le bus avait 30 minutes de retard au départ. Service correct sinon.",
      rating: 3,
      date: "2023-04-13T18:45:00",
    },
    {
      id: 4,
      client: "Sophie Petit",
      trajet: "Lille - Paris",
      title: "Très satisfaite",
      content: "Excellent service, personnel aimable et trajet confortable.",
      rating: 5,
      date: "2023-04-12T09:20:00",
    },
    {
      id: 5,
      client: "Thomas Bernard",
      trajet: "Lyon - Grenoble",
      title: "Problème de climatisation",
      content: "La climatisation ne fonctionnait pas correctement. Voyage inconfortable par temps chaud.",
      rating: 2,
      date: "2023-04-11T16:10:00",
    },
  ]

  const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length

  const ratingCounts = {
    5: feedbacks.filter((f) => f.rating === 5).length,
    4: feedbacks.filter((f) => f.rating === 4).length,
    3: feedbacks.filter((f) => f.rating === 3).length,
    2: feedbacks.filter((f) => f.rating === 2).length,
    1: feedbacks.filter((f) => f.rating === 1).length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Feedbacks</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aperçu des feedbacks</CardTitle>
            <CardDescription>Statistiques sur les avis des clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${star <= Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Note moyenne sur {feedbacks.length} avis</p>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-20">
                      {rating} <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${(ratingCounts[rating as keyof typeof ratingCounts] / feedbacks.length) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="w-10 text-xs text-gray-500 dark:text-gray-400">
                      {ratingCounts[rating as keyof typeof ratingCounts]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Liste des feedbacks</CardTitle>
              <CardDescription>Avis des clients sur les trajets</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Rechercher..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <Card key={feedback.id} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base">{feedback.title}</CardTitle>
                        <CardDescription>
                          {feedback.client} • {feedback.trajet} •{" "}
                          {new Date(feedback.date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${star <= feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm">{feedback.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
