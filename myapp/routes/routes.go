package routes

import (
	"github.com/gin-gonic/gin"
	"log"
	"myapp/controllers"
)

func SetupRoutes() {
	r := gin.Default()

	r.POST("/signup", controllers.SignupHandler)
	r.POST("/login", controllers.LoginHandler)

	// راه‌اندازی سرور
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

func StartServer() error {
	// اینجا دیگر نیازی به این تابع نیست چون سرور در SetupRoutes راه‌اندازی می‌شود
	return nil
}
