"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app/sidebar"
import { UserMenu } from "@/components/app/user-menu"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    )
  }

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold">Task Manager</h2>
            </div>
            <UserMenu user={session.user} />
          </div>
        </header>
        <main className="flex-1 container py-6">{children}</main>
      </div>
    </div>
  )
}
