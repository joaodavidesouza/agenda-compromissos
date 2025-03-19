// src/app/locais/locais-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLocaisComponent } from './lista-locais/lista-locais.component';
import { FormLocalComponent } from './form-local/form-local.component';

const routes: Routes = [
  { path: '', component: ListaLocaisComponent },
  { path: 'novo', component: FormLocalComponent },
  { path: 'editar/:id', component: FormLocalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocaisRoutingModule { }