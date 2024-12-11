package model

type PagedListResponse[T any] struct {
	Items       []T `json:"items"`
	TotalItems  int `json:"total_items"`
	TotalPages  int `json:"total_pages"`
	CurrentPage int `json:"current_page"`
}
