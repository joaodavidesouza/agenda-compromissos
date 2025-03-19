// src/app/contatos/contatos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaContatosComponent } from './lista-contatos/lista-contatos.component';
import { FormContatoComponent } from './form-contato/form-contato.component';

const routes: Routes = [
  { path: '', component: ListaContatosComponent },
  { path: 'novo', component: FormContatoComponent },
  { path: 'editar/:id', component: FormContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatosRoutingModule { }