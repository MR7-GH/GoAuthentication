package services

import (
	"fmt"
	"myapp/db"
	"myapp/models"
	"myapp/utils"
)

func Signup(username, password, email string) error {
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	query := "INSERT INTO users (username, password, email) VALUES (?, ?, ?)"
	_, err = db.DB.Exec(query, username, hashedPassword, email)
	if err != nil {
		return fmt.Errorf("failed to insert user: %w", err)
	}

	fmt.Println("User signed up successfully!")
	return nil
}

func Login(username, password string) (*models.User, error) {
	var user models.User
	query := "SELECT id, username, email, password FROM users WHERE username = ?"
	err := db.DB.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.Email, &user.Password)
	if err != nil {
		return nil, fmt.Errorf("user not found: %w", err)
	}

	if !utils.CheckPasswordHash(password, user.Password) {
		return nil, fmt.Errorf("incorrect password")
	}

	return &user, nil
}
