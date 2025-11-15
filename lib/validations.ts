import { z } from "zod"

// Task validations
export const createTaskSchema = z.object({
  title: z.string()
    .min(3, "Название должно содержать минимум 3 символа")
    .max(200, "Название не должно превышать 200 символов"),
  description: z.string()
    .max(2000, "Описание не должно превышать 2000 символов")
    .optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
})

export const updateTaskSchema = z.object({
  title: z.string()
    .min(3, "Название должно содержать минимум 3 символа")
    .max(200, "Название не должно превышать 200 символов")
    .optional(),
  description: z.string()
    .max(2000, "Описание не должно превышать 2000 символов")
    .optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional(),
  completed: z.boolean().optional(),
})

// Auth validations
export const loginSchema = z.object({
  email: z.string()
    .email("Некорректный email адрес")
    .min(1, "Email обязателен"),
})

export const registerSchema = z.object({
  email: z.string()
    .email("Некорректный email адрес")
    .min(1, "Email обязателен"),
  name: z.string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя не должно превышать 100 символов")
    .optional(),
})

// User profile validations
export const updateProfileSchema = z.object({
  name: z.string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя не должно превышать 100 символов")
    .optional(),
})
