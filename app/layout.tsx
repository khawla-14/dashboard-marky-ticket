import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "@/app/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MarkyTicket - Administration",
  description: "Tableau de bord d'administration pour MarkyTicket",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
