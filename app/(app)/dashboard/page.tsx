"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, ListTodo, Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session } = useSession()

  // В реальном приложении эти данные будут загружаться с API
  const stats = {
    total: 0,
    completed: 0,
    active: 0,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Привет, {session?.user?.name || session?.user?.email}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Добро пожаловать в Task Manager
        </p>
      </div>

      {/* Статистика */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего задач</CardTitle>
            <ListTodo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выполнено</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активных</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
      </div>

      {/* Быстрые действия */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>Начните работу с задачами</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/tasks/new">
            <Button size="lg" className="w-full md:w-auto">
              <Plus className="mr-2 h-5 w-5" />
              Создать новую задачу
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Последние задачи */}
      <Card>
        <CardHeader>
          <CardTitle>Последние задачи</CardTitle>
          <CardDescription>Ваши недавние задачи</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            У вас пока нет задач.{" "}
            <Link href="/tasks/new" className="text-primary hover:underline">
              Создайте первую задачу
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
