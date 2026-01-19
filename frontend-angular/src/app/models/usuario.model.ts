export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
  senha?: string;
}

export interface UsuarioPage {
  content: Usuario[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  usuario: Usuario;
}
