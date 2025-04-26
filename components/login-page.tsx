"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Bus } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple validation
    if (email === "admin@gmail.com" && password === "admin") {
      // Set logged in status
      localStorage.setItem("isLoggedIn", "true")

      // Show success toast
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur le tableau de bord MarkyTicket",
      })

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } else {
      setIsLoading(false)
      toast({
        variant: "destructive",
        title: "Échec de la connexion",
        description: "Email ou mot de passe incorrect",
      })
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
              <Bus className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">MarkyTicket</CardTitle>
          <CardDescription className="text-center">Connectez-vous à votre compte administrateur</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Se connecter"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-xs text-center text-gray-500 mt-4">
            &copy; {new Date().getFullYear()} MarkyTicket. Tous droits réservés.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
