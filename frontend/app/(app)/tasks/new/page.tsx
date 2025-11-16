"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskForm } from "@/components/app/task-form"
import { CreateTaskInput } from "@/types"

export default function NewTaskPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: CreateTaskInput) => {
    setIsLoading(true)
    try {
      // В реальном приложении - вызов API
      console.log("Creating task:", data)

      // Симуляция задержки
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Перенаправление на список задач
      router.push("/tasks")
    } catch (error) {
      console.error("Error creating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    router.push("/tasks")
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Создать задачу</h1>
        <p className="text-muted-foreground mt-2">
          Добавьте новую задачу в ваш список
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Новая задача</CardTitle>
          <CardDescription>
            Заполните форму для создания задачи
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
