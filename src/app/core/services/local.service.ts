// src/app/core/services/local.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Local } from '../../shared/models/local.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  private apiUrl = 'http://localhost:3000/locais';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  getHeaders(): HttpHeaders {
    const token = this.tokenService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getLocais(): Observable<Local[]> {
    const headers = this.getHeaders();
    return this.http.get<Local[]>(this.apiUrl, { headers });
  }

  getLocalById(id: number): Observable<Local> {
    const headers = this.getHeaders();
    return this.http.get<Local>(`${this.apiUrl}/${id}`, { headers });
  }

  createLocal(local: Local): Observable<Local> {
    const headers = this.getHeaders();
    return this.http.post<Local>(this.apiUrl, local, { headers });
  }

  updateLocal(local: Local): Observable<Local> {
    const headers = this.getHeaders();
    return this.http.put<Local>(`${this.apiUrl}/${local.id}`, local, { headers });
  }

  deleteLocal(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}