package main

import (
	"cs-analyser/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
  router := gin.Default()
  router.Use(cors.Default())
  router.POST("/parse", handlers.ParseDemoFile) 
  router.Run() // listens on 0.0.0.0:8080 by default
}
