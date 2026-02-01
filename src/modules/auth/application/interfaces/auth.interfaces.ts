export interface JwtPayload {
  email: string;
  sub: number; // En el token estándar se llama 'sub' al ID del usuario
  role: string;
}

export interface UserContext {
  id: number;
  email: string;
  role: string;
}

export interface ValidatedUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: ValidatedUser;
}
