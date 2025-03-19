// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Usuario } from '../../shared/models/usuario.model';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

interface AuthResponse {
  accessToken: string;
  user: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<Usuario | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.checkTokenValidity();
  }

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, senha })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.accessToken);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  private checkTokenValidity(): void {
    const token = this.tokenService.getToken();
    
    if (token) {
      const user = this.tokenService.getUserFromToken();
      if (user) {
        this.currentUserSubject.next(user);
      } else {
        this.tokenService.removeToken();
      }
    }
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }
  
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.nivelAcesso === 'admin';
  }
  
  getCurrentUserId(): number | undefined {
    return this.currentUserSubject.value?.id;
  }
}