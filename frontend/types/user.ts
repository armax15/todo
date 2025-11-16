export interface User {
  id: string
  email: string
  name?: string
  image?: string
  createdAt: string
}

export interface UserProfile extends User {
  tasksCount?: number
  completedTasksCount?: number
}
