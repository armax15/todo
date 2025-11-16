package db

import (
	"errors"
	"sync"
	"time"

	"github.com/armax15/todo-backend/models"
	"github.com/google/uuid"
)

var (
	ErrTaskNotFound = errors.New("task not found")
)

type Database struct {
	tasks map[string]*models.Task
	mu    sync.RWMutex
}

func NewDatabase() *Database {
	return &Database{
		tasks: make(map[string]*models.Task),
	}
}

func (db *Database) CreateTask(req models.CreateTaskRequest) (*models.Task, error) {
	db.mu.Lock()
	defer db.mu.Unlock()

	now := time.Now()
	task := &models.Task{
		ID:          uuid.New().String(),
		Title:       req.Title,
		Description: req.Description,
		Status:      req.Status,
		Priority:    req.Priority,
		DueDate:     req.DueDate,
		CreatedAt:   now,
		UpdatedAt:   now,
		UserID:      "default-user", // For now, use a default user
	}

	// Set default status if not provided
	if task.Status == "" {
		task.Status = "todo"
	}

	// Handle completed field
	if req.Completed != nil {
		task.Completed = *req.Completed
		// Sync status with completed
		if task.Completed {
			task.Status = "done"
		}
	} else {
		// Sync completed with status
		task.Completed = task.Status == "done"
	}

	db.tasks[task.ID] = task
	return task, nil
}

func (db *Database) GetTask(id string) (*models.Task, error) {
	db.mu.RLock()
	defer db.mu.RUnlock()

	task, exists := db.tasks[id]
	if !exists {
		return nil, ErrTaskNotFound
	}

	return task, nil
}

func (db *Database) GetAllTasks() []*models.Task {
	db.mu.RLock()
	defer db.mu.RUnlock()

	tasks := make([]*models.Task, 0, len(db.tasks))
	for _, task := range db.tasks {
		tasks = append(tasks, task)
	}

	return tasks
}

func (db *Database) UpdateTask(id string, req models.UpdateTaskRequest) (*models.Task, error) {
	db.mu.Lock()
	defer db.mu.Unlock()

	task, exists := db.tasks[id]
	if !exists {
		return nil, ErrTaskNotFound
	}

	// Update fields if provided
	if req.Title != nil {
		task.Title = *req.Title
	}
	if req.Description != nil {
		task.Description = *req.Description
	}
	if req.Status != nil {
		task.Status = *req.Status
		// Sync completed with status
		task.Completed = task.Status == "done"
	}
	if req.Completed != nil {
		task.Completed = *req.Completed
		// Sync status with completed
		if task.Completed {
			task.Status = "done"
		} else if task.Status == "done" {
			task.Status = "todo"
		}
	}
	if req.Priority != nil {
		task.Priority = *req.Priority
	}
	if req.DueDate != nil {
		task.DueDate = req.DueDate
	}

	task.UpdatedAt = time.Now()
	return task, nil
}

func (db *Database) DeleteTask(id string) error {
	db.mu.Lock()
	defer db.mu.Unlock()

	if _, exists := db.tasks[id]; !exists {
		return ErrTaskNotFound
	}

	delete(db.tasks, id)
	return nil
}
