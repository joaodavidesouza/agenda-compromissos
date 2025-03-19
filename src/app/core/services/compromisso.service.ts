// src/app/core/services/compromisso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compromisso } from '../../shared/models/compromisso.model';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompromissoService {
  private apiUrl = 'http://localhost:3000/compromissos';

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCompromissos(): Observable<Compromisso[]> {
    const headers = this.getHeaders();
    
    if (this.authService.isAdmin()) {
      return this.http.get<Compromisso[]>(this.apiUrl, { headers });
    } else {
      const userId = this.authService.getCurrentUserId();
      return this.http.get<Compromisso[]>(`${this.apiUrl}?usuarioId=${userId}`, { headers });
    }
  }

  getCompromissoById(id: number): Observable<Compromisso> {
    const headers = this.getHeaders();
    return this.http.get<Compromisso>(`${this.apiUrl}/${id}`, { headers });
  }

  createCompromisso(compromisso: Compromisso): Observable<Compromisso> {
    const headers = this.getHeaders();
    compromisso.usuarioId = this.authService.getCurrentUserId() || 0;
    return this.http.post<Compromisso>(this.apiUrl, compromisso, { headers });
  }

  updateCompromisso(compromisso: Compromisso): Observable<Compromisso> {
    const headers = this.getHeaders();
    return this.http.put<Compromisso>(`${this.apiUrl}/${compromisso.id}`, compromisso, { headers });
  }

  deleteCompromisso(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}