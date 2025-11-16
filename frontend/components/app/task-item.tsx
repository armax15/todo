"use client"

import { Task } from "@/types"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import Link from "next/link"

interface TaskItemProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const priorityLabels = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="mt-1"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <Link href={`/tasks/${task.id}`} className="flex-1">
              <h3
                className={cn(
                  "font-medium text-lg hover:text-primary transition-colors",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h3>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Link href={`/tasks/${task.id}`}>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    Редактировать
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete(task.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground flex-wrap">
            <span>{formatDate(task.createdAt)}</span>
            {task.priority && (
              <Badge
                variant="outline"
                className={priorityColors[task.priority]}
              >
                {priorityLabels[task.priority]}
              </Badge>
            )}
            {task.dueDate && (
              <Badge variant="outline">
                Срок: {formatDate(task.dueDate)}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
