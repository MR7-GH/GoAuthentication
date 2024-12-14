package config

import (
	"fmt"
	"log"
	"os"
)

var (
	DBUser     string
	DBPassword string
	DBName     string
)

func LoadConfig() {
	DBUser = os.Getenv("WCT_SQL_USER")
	DBPassword = os.Getenv("WCT_SQL_PASS")
	DBName = os.Getenv("WCT_SQL_DB")

	if DBUser == "" || DBPassword == "" || DBName == "" {
		log.Fatal("Database credentials not set in environment variables")
	}
	fmt.Println("Configuration loaded successfully!")
}
