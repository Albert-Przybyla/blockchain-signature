package api

import (
	"net/http"
	"server/config"
	"server/database"

	"github.com/gin-gonic/gin"
)

type APIServer struct {
	port   string
	db     *database.Postgres
	engine *gin.Engine
}

func New() *APIServer {
	return &APIServer{
		db:     database.New(),
		engine: gin.New(),
		port:   config.AppConfig.Port,
	}
}

func (a *APIServer) Start() {
	a.engine.Use(CORSMiddleware())
	a.Routes()
	a.engine.Run(":" + a.port)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}

		c.Next()
	}
}
