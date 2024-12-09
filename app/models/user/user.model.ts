export interface User {}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  public_key: string;
  private_key_hash: string;
  private_key: string;
  created_at: string;
  updated_at: string;
}
