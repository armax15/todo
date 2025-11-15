"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskForm } from "@/components/app/task-form"
import { CreateTaskInput } from "@/types"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  // В реальном приложении - загрузка задачи с API
  const task = null

  const handleSubmit = async (data: CreateTaskInput) => {
    setIsLoading(true)
    try {
      console.log("Updating task:", params.id, data)
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push("/tasks")
    } catch (error) {
      console.error("Error updating task:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Вы уверены, что хотите удалить эту задачу?")) {
      return
    }

    setIsDeleting(true)
    try {
      console.log("Deleting task:", params.id)
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push("/tasks")
    } catch (error) {
      console.error("Error deleting task:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    router.push("/tasks")
  }

  if (!task) {
    return (
      <div className="max-w-2xl">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Задача не найдена</p>
            <Button onClick={() => router.push("/tasks")} className="mt-4">
              Вернуться к задачам
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Редактировать задачу</h1>
          <p className="text-muted-foreground mt-2">
            Внесите изменения в задачу
          </p>
        </div>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {isDeleting ? "Удаление..." : "Удалить"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Детали задачи</CardTitle>
          <CardDescription>
            Обновите информацию о задаче
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TaskForm
            task={task}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  )
}
