import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionsComponent } from './inscriptions.component';
import { ListInscriptionsComponent } from './list-inscriptions/list-inscriptions.component';
import { RegisterInscriptionsComponent } from './register-inscriptions/register-inscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: InscriptionsComponent,
    children: [
      {
        path: '',
        component: ListInscriptionsComponent,
      },
      {
        path: 'registrar',
        component: RegisterInscriptionsComponent,
      },
    ]
  },
  {
    path: '**',
    redirectTo: '/inscripciones'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionsRoutingModule { }
