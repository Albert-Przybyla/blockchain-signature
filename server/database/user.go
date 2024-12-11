package database

import (
	"fmt"
	model "server/model"
	model_bsv "server/model/bsv"
	model_user "server/model/user"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func (p *Postgres) CreateUser(req model_user.CreateUserRequest, wallet model_bsv.CreateWallet) (*model.CreateElementResponse, error) {
	userExists, err := p.userExists(req.Email)
	if err != nil {
		return nil, err
	}

	if userExists {
		return nil, fmt.Errorf("user with email %s already exists", req.Email)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %v", err)
	}

	user := model_user.User{
		Email:          req.Email,
		Password:       string(hashedPassword),
		FirstName:      req.FirstName,
		LastName:       req.LastName,
		Address:        wallet.Address,
		PrivateKeyHash: wallet.Key,
	}

	res := p.db.Create(&user)
	if res.Error != nil {
		return nil, res.Error
	}

	return &model.CreateElementResponse{Id: user.Id}, nil
}

func (p *Postgres) GetUserById(id string) (*model_user.User, error) {
	var user model_user.User
	res := p.db.Table("users").Where("id = ?", id).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, nil
		}
		return nil, res.Error
	}

	return &user, nil
}

func (p *Postgres) GetUserByEmail(email string) (*model_user.User, error) {
	var user model_user.User
	res := p.db.Where("email = ?", email).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return nil, res.Error
		}
		return nil, res.Error
	}
	return &user, nil
}

func (p *Postgres) UpdateUser(id string, req model_user.UpdateUserRequest) error {
	res := p.db.Model(&model_user.User{}).Where("id = ?", id).Updates(req)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) UpdateUserPassword(id string, req model_user.ChangePasswordRequest) error {
	res := p.db.Model(&model_user.User{}).Where("id = ?", id).Updates(req)
	if res.Error != nil {
		return res.Error
	}
	return nil
}

func (p *Postgres) userExists(email string) (bool, error) {
	var user model_user.User
	res := p.db.Table("users").Where("email = ?", email).First(&user)
	if res.Error != nil {
		if res.Error == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, res.Error
	}

	return true, nil
}

func (p *Postgres) DeleteUser(id string) error {
	res := p.db.Where("id = ?", id).Delete(&model_user.User{})
	if res.Error != nil {
		return res.Error
	}
	return nil
}
