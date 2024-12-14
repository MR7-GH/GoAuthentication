package main

import (
	"database/sql"
	"fmt"
	"log"
	"myapp/config"
	"myapp/db"
	"myapp/routes"
)

func main() {
	fmt.Println("Server is running on port 8080")
	// بارگذاری تنظیمات
	config.LoadConfig()
	db.InitDB()
	// راه‌اندازی روت‌ها
	routes.SetupRoutes()

	if err := routes.StartServer(); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func addUser(db *sql.DB, username, password, email string) error {
	query := "INSERT INTO users (username, password, email) VALUES (?, ?, ?)"
	_, err := db.Exec(query, username, password, email)
	if err != nil {
		return fmt.Errorf("failed to insert user: %w", err)
	}
	fmt.Println("User added successfully!")
	return nil
}
func getUsers(db *sql.DB) error {
	query := "SELECT id, username, email FROM users"
	rows, err := db.Query(query)
	if err != nil {
		return fmt.Errorf("failed to query users: %w", err)
	}
	defer rows.Close()

	fmt.Println("Users:")
	for rows.Next() {
		var id int
		var username, email string
		if err := rows.Scan(&id, &username, &email); err != nil {
			return fmt.Errorf("failed to scan user: %w", err)
		}
		fmt.Printf("ID: %d, Username: %s, Email: %s\n", id, username, email)
	}
	return nil
}
func deleteUser(db *sql.DB, userID int) error {
	query := "DELETE FROM users WHERE id = ?"
	_, err := db.Exec(query, userID)
	if err != nil {
		return fmt.Errorf("failed to delete user: %w", err)
	}
	fmt.Println("User deleted successfully!")
	return nil
}
