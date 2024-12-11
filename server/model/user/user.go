package model_user

import "time"

type User struct {
	Id             string    `gorm:"primaryKey;type:uuid;default:gen_random_uuid()" json:"id"`
	Email          string    `gorm:"unique;not null;size:255" json:"email"`
	Password       string    `gorm:"not null;size:255" json:"-"`
	FirstName      string    `gorm:"size:100" json:"first_name"`
	LastName       string    `gorm:"size:100" json:"last_name"`
	RefreshToken   string    `gorm:"size:255" json:"-"`
	Address        string    `gorm:"size:255" json:"address"`
	PrivateKeyHash string    `gorm:"size:255" json:"private_key_hash"`
	CreatedAt      time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt      time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
