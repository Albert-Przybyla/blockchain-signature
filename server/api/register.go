package api

import (
	"net/http"
	model_user "server/model/user"

	"github.com/gin-gonic/gin"
)

func (a *APIServer) Register(c *gin.Context) {
	var req model_user.CreateUserRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	wallet, err := a.CreateWallet(req.Password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	res, err := a.db.CreateUser(req, *wallet)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	// user := model_user.User{
	// 	Email:          req.Email,
	// 	Password:       string(hashedPassword),
	// 	FirstName:      req.FirstName,
	// 	LastName:       req.LastName,
	// 	PublicKey:      req.PublicKey,
	// 	PrivateKeyHash: req.PrivateKeyHash,
	// }

	// err = a.db.CreateUser(&user)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
	// 	return
	// }

	// token, err := a.generateToken(&user)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
	// 	return
	// }

	// c.JSON(http.StatusOK, model_user.TokenUserResponse{Token: token, PrivateKeyHash: user.PrivateKeyHash})

	c.JSON(http.StatusOK, res)
}
