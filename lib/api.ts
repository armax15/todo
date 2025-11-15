import { Task, CreateTaskInput, UpdateTaskInput, User } from "@/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api"

class ApiError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.name = "ApiError"
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }))
    throw new ApiError(response.status, error.message || "An error occurred")
  }

  return response.json()
}

// Task API
export async function getTasks(token: string): Promise<Task[]> {
  return fetchApi<Task[]>("/tasks", {}, token)
}

export async function getTask(id: string, token: string): Promise<Task> {
  return fetchApi<Task>(`/tasks/${id}`, {}, token)
}

export async function createTask(
  data: CreateTaskInput,
  token: string
): Promise<Task> {
  return fetchApi<Task>(
    "/tasks",
    {
      method: "POST",
      body: JSON.stringify(data),
    },
    token
  )
}

export async function updateTask(
  id: string,
  data: UpdateTaskInput,
  token: string
): Promise<Task> {
  return fetchApi<Task>(
    `/tasks/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token
  )
}

export async function deleteTask(id: string, token: string): Promise<void> {
  return fetchApi<void>(
    `/tasks/${id}`,
    {
      method: "DELETE",
    },
    token
  )
}

export async function toggleTaskComplete(
  id: string,
  token: string
): Promise<Task> {
  return fetchApi<Task>(
    `/tasks/${id}/toggle`,
    {
      method: "PATCH",
    },
    token
  )
}

// User API
export async function getUserProfile(token: string): Promise<User> {
  return fetchApi<User>("/user/profile", {}, token)
}

export async function updateUserProfile(
  data: Partial<User>,
  token: string
): Promise<User> {
  return fetchApi<User>(
    "/user/profile",
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
    token
  )
}

export { ApiError }
