// src/app/core/services/contato.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contato } from '../../shared/models/contato.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private apiUrl = 'http://localhost:3000/contatos';

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

  getContatos(): Observable<Contato[]> {
    const headers = this.getHeaders();
    return this.http.get<Contato[]>(this.apiUrl, { headers });
  }

  getContatoById(id: number): Observable<Contato> {
    const headers = this.getHeaders();
    return this.http.get<Contato>(`${this.apiUrl}/${id}`, { headers });
  }

  createContato(contato: Contato): Observable<Contato> {
    const headers = this.getHeaders();
    return this.http.post<Contato>(this.apiUrl, contato, { headers });
  }

  updateContato(contato: Contato): Observable<Contato> {
    const headers = this.getHeaders();
    return this.http.put<Contato>(`${this.apiUrl}/${contato.id}`, contato, { headers });
  }

  deleteContato(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}