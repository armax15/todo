export type TaskPriority = "low" | "medium" | "high"

export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority?: TaskPriority
  dueDate?: string // ISO date string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface CreateTaskInput {
  title: string
  description?: string
  priority?: TaskPriority
  dueDate?: string
}

export interface UpdateTaskInput {
  title?: string
  description?: string
  priority?: TaskPriority
  dueDate?: string
  completed?: boolean
}
