// src/app/core/services/auth-guard.service.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      // Verificar se a rota requer privilégios de admin
      const requiresAdmin = route.data['requiresAdmin'] as boolean;
      
      if (requiresAdmin && !this.authService.isAdmin()) {
        this.router.navigate(['/compromissos']);
        return false;
      }
      
      return true;
    }

    // Não está logado, redirecionar para a página de login
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}