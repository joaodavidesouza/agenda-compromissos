// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/auth-guard.service';
import { NotFoundComponent } from './core/not-found/not-found.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/compromissos', 
    pathMatch: 'full' 
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'compromissos',
    loadChildren: () => import('./compromissos/compromissos.module').then(m => m.CompromissosModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'contatos',
    loadChildren: () => import('./contatos/contatos.module').then(m => m.ContatosModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'locais',
    loadChildren: () => import('./locais/locais.module').then(m => m.LocaisModule),
    canActivate: [AuthGuardService],
    data: { requiresAdmin: true }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }