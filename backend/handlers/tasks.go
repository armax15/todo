package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/armax15/todo-backend/db"
	"github.com/armax15/todo-backend/models"
	"github.com/gorilla/mux"
)

type TaskHandler struct {
	db *db.Database
}

func NewTaskHandler(database *db.Database) *TaskHandler {
	return &TaskHandler{db: database}
}

// CreateTask handles POST /api/tasks
func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {
	var req models.CreateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if req.Title == "" {
		respondWithError(w, http.StatusBadRequest, "Title is required")
		return
	}

	task, err := h.db.CreateTask(req)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Error creating task")
		return
	}

	respondWithJSON(w, http.StatusCreated, task)
}

// GetAllTasks handles GET /api/tasks
func (h *TaskHandler) GetAllTasks(w http.ResponseWriter, r *http.Request) {
	tasks := h.db.GetAllTasks()
	respondWithJSON(w, http.StatusOK, tasks)
}

// GetTask handles GET /api/tasks/{id}
func (h *TaskHandler) GetTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	task, err := h.db.GetTask(id)
	if err != nil {
		if err == db.ErrTaskNotFound {
			respondWithError(w, http.StatusNotFound, "Task not found")
			return
		}
		respondWithError(w, http.StatusInternalServerError, "Error retrieving task")
		return
	}

	respondWithJSON(w, http.StatusOK, task)
}

// UpdateTask handles PUT /api/tasks/{id}
func (h *TaskHandler) UpdateTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	var req models.UpdateTaskRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		respondWithError(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	task, err := h.db.UpdateTask(id, req)
	if err != nil {
		if err == db.ErrTaskNotFound {
			respondWithError(w, http.StatusNotFound, "Task not found")
			return
		}
		respondWithError(w, http.StatusInternalServerError, "Error updating task")
		return
	}

	respondWithJSON(w, http.StatusOK, task)
}

// DeleteTask handles DELETE /api/tasks/{id}
func (h *TaskHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	err := h.db.DeleteTask(id)
	if err != nil {
		if err == db.ErrTaskNotFound {
			respondWithError(w, http.StatusNotFound, "Task not found")
			return
		}
		respondWithError(w, http.StatusInternalServerError, "Error deleting task")
		return
	}

	respondWithJSON(w, http.StatusOK, map[string]string{"message": "Task deleted successfully"})
}

// Helper functions
func respondWithError(w http.ResponseWriter, code int, message string) {
	respondWithJSON(w, code, map[string]string{"error": message})
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, err := json.Marshal(payload)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"error": "Error encoding response"}`))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}
