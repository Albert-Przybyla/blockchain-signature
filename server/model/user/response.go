package model_user

type TokenUserResponse struct {
	Token          string `json:"token"`
	PrivateKeyHash string `json:"private_key_hash"`
}
