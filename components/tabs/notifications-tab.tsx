"use client"

import type React from "react"

import { useState } from "react"
import { Bell, Plus, Search, Users } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function NotificationsTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [recipient, setRecipient] = useState("all")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const { toast } = useToast()

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Application Update",
      content:
        "A new version of the application is available. Please update to enjoy the new features.",
      recipient: "All",
      date: "2023-04-15T10:30:00",
      read: 1248,
    },
    {
      id: 2,
      title: "Promotion on Bejaia Center - Oued Ghir Routes",
      content: "Enjoy 20% discount on all Bejaia Center - Oued Ghir routes this weekend!",
      recipient: "Clients",
      date: "2023-04-12T14:45:00",
      read: 843,
    },
    {
      id: 3,
      title: "Mandatory Training",
      content: "A training session on new ticket validation procedures will be held on April 20th.",
      recipient: "Collectors",
      date: "2023-04-10T09:15:00",
      read: 42,
    },
    {
      id: 4,
      title: "Scheduled Maintenance",
      content: "The application will be under maintenance on April 18th from 2 AM to 4 AM.",
      recipient: "All",
      date: "2023-04-08T16:20:00",
      read: 1248,
    },
    {
      id: 5,
      title: "New Routes Available",
      content: "New routes to coastal destinations are now available for booking.",
      recipient: "Clients",
      date: "2023-04-05T11:10:00",
      read: 756,
    },
  ])

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!title.trim() || !content.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all required fields",
      })
      return
    }

    // Add new notification
    const newNotification = {
      id: notifications.length + 1,
      title,
      content,
      recipient: recipient === "all" ? "All" : recipient === "clients" ? "Clients" : "Collectors",
      date: new Date().toISOString(),
      read: recipient === "all" ? 1248 : recipient === "clients" ? 1248 : 42,
    }

    setNotifications([newNotification, ...notifications])

    // Reset form
    setTitle("")
    setContent("")
    setImageUrl("")
    setRecipient("all")

    // Close dialog
    setIsDialogOpen(false)

    // Show success toast
    toast({
      title: "Notification Sent",
      description: "The notification has been successfully sent",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-white">Notifications</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleSendNotification}>
              <DialogHeader>
                <DialogTitle>Send Notification</DialogTitle>
                <DialogDescription>
                  Create a new notification for application users.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipient">Recipients</Label>
                  <Select value={recipient} onValueChange={setRecipient}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="clients">Clients Only</SelectItem>
                      <SelectItem value="receveurs">Collectors Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Notification title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="image">Image URL (optional)</Label>
                  <Input
                    id="image"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Notification content"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Send</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications Overview</CardTitle>
            <CardDescription>Statistics on sent notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold">{notifications.length}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sent Notifications</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Users className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Users Reached</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold">92%</div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Read Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <CardTitle>Notification History</CardTitle>
              <CardDescription>List of all sent notifications</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              <Input placeholder="Search..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-12 border-b px-4 py-3 font-medium">
                <div className="col-span-4">Title</div>
                <div className="col-span-3">Recipients</div>
                <div className="col-span-2">Reads</div>
                <div className="col-span-3">Sent Date</div>
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="grid grid-cols-12 border-b px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="col-span-4 font-medium">{notification.title}</div>
                  <div className="col-span-3">{notification.recipient}</div>
                  <div className="col-span-2">{notification.read} reads</div>
                  <div className="col-span-3 text-gray-500 dark:text-gray-400">
                    {new Date(notification.date).toLocaleDateString("en-US", {
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
