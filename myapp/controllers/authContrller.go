package controllers

import (
	"fmt"
	"myapp/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SignupHandler(c *gin.Context) {
	// گرفتن اطلاعات از درخواست
	username := c.DefaultPostForm("username", "")
	password := c.DefaultPostForm("password", "123123")
	email := c.DefaultPostForm("email", "")

	// فراخوانی سرویس ساین‌آپ
	err := services.Signup(username, password, email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Signup successful!"})
}

func LoginHandler(c *gin.Context) {
	// گرفتن اطلاعات از درخواست
	username := c.DefaultPostForm("username", "")
	password := c.DefaultPostForm("password", "")

	// فراخوانی سرویس لاگین
	user, err := services.Login(username, password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("Welcome %s!", user.Username)})
}
