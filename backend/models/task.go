package models

import "time"

type Task struct {
	ID          string     `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description,omitempty"`
	Status      string     `json:"status"` // "todo", "in_progress", "done"
	Completed   bool       `json:"completed"`
	Priority    string     `json:"priority,omitempty"` // "low", "medium", "high"
	DueDate     *time.Time `json:"dueDate,omitempty"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	UserID      string     `json:"userId,omitempty"`
}

type CreateTaskRequest struct {
	Title       string     `json:"title"`
	Description string     `json:"description,omitempty"`
	Status      string     `json:"status,omitempty"`
	Completed   *bool      `json:"completed,omitempty"`
	Priority    string     `json:"priority,omitempty"`
	DueDate     *time.Time `json:"dueDate,omitempty"`
}

type UpdateTaskRequest struct {
	Title       *string    `json:"title,omitempty"`
	Description *string    `json:"description,omitempty"`
	Status      *string    `json:"status,omitempty"`
	Completed   *bool      `json:"completed,omitempty"`
	Priority    *string    `json:"priority,omitempty"`
	DueDate     *time.Time `json:"dueDate,omitempty"`
}
