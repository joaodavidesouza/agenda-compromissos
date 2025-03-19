// src/app/core/services/token.service.ts
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Usuario } from '../../shared/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private TOKEN_KEY = 'auth_token';

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getUserFromToken(): Usuario | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<Usuario>(token);
      } catch (error) {
        return null;
      }
    }
    return null;
  }
}