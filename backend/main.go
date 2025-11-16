package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/armax15/todo-backend/db"
	"github.com/armax15/todo-backend/handlers"
	"github.com/armax15/todo-backend/middleware"
	"github.com/gorilla/mux"
)

func main() {
	// Initialize database
	database := db.NewDatabase()

	// Initialize handlers
	taskHandler := handlers.NewTaskHandler(database)

	// Create router
	router := mux.NewRouter()

	// API routes
	api := router.PathPrefix("/api").Subrouter()
	api.HandleFunc("/tasks", taskHandler.GetAllTasks).Methods("GET")
	api.HandleFunc("/tasks", taskHandler.CreateTask).Methods("POST")
	api.HandleFunc("/tasks/{id}", taskHandler.GetTask).Methods("GET")
	api.HandleFunc("/tasks/{id}", taskHandler.UpdateTask).Methods("PUT")
	api.HandleFunc("/tasks/{id}", taskHandler.DeleteTask).Methods("DELETE")

	// Health check endpoint
	router.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status": "healthy"}`))
	}).Methods("GET")

	// Apply CORS middleware
	handler := middleware.CORS(router)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server
	addr := fmt.Sprintf(":%s", port)
	log.Printf("Starting server on %s", addr)
	log.Printf("API endpoints available at http://localhost%s/api/tasks", addr)

	if err := http.ListenAndServe(addr, handler); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
