import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // authentication module
  { path: 'ingresar', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  // home module
  { path: 'inicio', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },

  // home module
  {
    path: 'ciudades', children: [
      { path: 'introduccion', loadChildren: () => import('./city/city-introduction/city-introduction.module').then(m => m.CityIntroductionModule) },
      { path: 'historia', loadChildren: () => import('./city/city-history/city-history.module').then(m => m.CityHistoryModule) },
    ]
  },

  // home module
  { path: 'restringido', loadChildren: () => import('./unauthorized/unauthorized.module').then(m => m.UnauthorizedModule) },

  // redirect all inconsistent routes to home
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
