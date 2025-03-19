// src/app/compromissos/compromissos-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCompromissosComponent } from './lista-compromissos/lista-compromissos.component';
import { FormCompromissoComponent } from './form-compromisso/form-compromisso.component';
import { DetalheCompromissoComponent } from './detalhe-compromisso/detalhe-compromisso.component';

const routes: Routes = [
  { path: '', component: ListaCompromissosComponent },
  { path: 'novo', component: FormCompromissoComponent },
  { path: 'editar/:id', component: FormCompromissoComponent },
  { path: ':id', component: DetalheCompromissoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompromissosRoutingModule { }