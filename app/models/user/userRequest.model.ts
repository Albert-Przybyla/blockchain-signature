export interface UserRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: string;
}

export interface UserFromRequest extends UserRequest {
  password_confirmation: string;
}
