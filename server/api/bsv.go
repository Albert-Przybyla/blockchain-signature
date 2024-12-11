package api

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"io"
	model "server/model/bsv"

	ec "github.com/bitcoin-sv/go-sdk/primitives/ec"
	"github.com/bitcoin-sv/go-sdk/script"
	"golang.org/x/crypto/scrypt"
)

func (a *APIServer) CreateWallet(password string) (*model.CreateWallet, error) {
	priv, err := ec.NewPrivateKey()
	if err != nil {
		return nil, fmt.Errorf("błąd podczas generowania klucza prywatnego: %w", err)
	}

	address, err := script.NewAddressFromPublicKey(priv.PubKey(), true)
	if err != nil {
		return nil, fmt.Errorf("błąd podczas generowania adresu: %w", err)
	}

	hashedKey, err := a.EncryptPrivateKey(priv.Wif(), password)
	if err != nil {
		return nil, fmt.Errorf("błąd podczas szyfrowania klucza prywatnego: %w", err)
	}

	return &model.CreateWallet{
		Address: address.AddressString,
		Key:     hashedKey,
	}, nil
}
func (a *APIServer) EncryptPrivateKey(privateKey, passphrase string) (string, error) {
	salt := make([]byte, 16)
	if _, err := rand.Read(salt); err != nil {
		return "", err
	}

	key, err := scrypt.Key([]byte(passphrase), salt, 32768, 8, 1, 32)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	ciphertext := make([]byte, aes.BlockSize+len(privateKey))
	iv := ciphertext[:aes.BlockSize]
	if _, err := io.ReadFull(rand.Reader, iv); err != nil {
		return "", err
	}

	stream := cipher.NewCFBEncrypter(block, iv)
	stream.XORKeyStream(ciphertext[aes.BlockSize:], []byte(privateKey))

	// Dodanie salt do zaszyfrowanych danych
	result := append(salt, ciphertext...)
	return base64.StdEncoding.EncodeToString(result), nil
}

func (a *APIServer) DecryptPrivateKey(encryptedPrivateKey, passphrase string) (string, error) {

	encryptedData, err := base64.StdEncoding.DecodeString(encryptedPrivateKey)
	if err != nil {
		return "", err
	}

	if len(encryptedData) < 16+aes.BlockSize {
		return "", fmt.Errorf("niepoprawne dane zaszyfrowane")
	}

	salt := encryptedData[:16]
	iv := encryptedData[16 : 16+aes.BlockSize]
	ciphertext := encryptedData[16+aes.BlockSize:]

	key, err := scrypt.Key([]byte(passphrase), salt, 32768, 8, 1, 32)
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	plaintext := make([]byte, len(ciphertext))
	stream := cipher.NewCFBDecrypter(block, iv)
	stream.XORKeyStream(plaintext, ciphertext)

	return string(plaintext), nil
}
