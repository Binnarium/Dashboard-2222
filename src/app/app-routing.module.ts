import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // authentication module
  { path: 'ingresar', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  // redirect all inconsistent routes to home
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
