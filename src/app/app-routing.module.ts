import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // authentication module
  { path: 'ingresar', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  // home module
  { path: 'inicio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  // welcome module
  { path: 'bienvenida', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },

  // home module
  { path: 'ciudades/:cityId', loadChildren: () => import('./city/city.module').then(m => m.CityModule) },

  // home module
  { path: 'restringido', loadChildren: () => import('./unauthorized/unauthorized.module').then(m => m.UnauthorizedModule) },

  // redirect all inconsistent routes to home
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
