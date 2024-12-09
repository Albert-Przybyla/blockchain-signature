export interface DecodedToken {
  email: string;
  exp: number;
  iat: number;
  id: string;
  org: string;
  role: "owner" | "manager" | "user";
}
