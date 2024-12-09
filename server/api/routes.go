package api

func (a *APIServer) Routes() {

	// Login and register routes
	a.engine.POST("/login", a.Login)
	// a.engine.POST("/register", a.Register)

}
