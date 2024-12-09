package api

import (
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
	a.Routes()
	a.engine.Run(":" + a.port)
}
