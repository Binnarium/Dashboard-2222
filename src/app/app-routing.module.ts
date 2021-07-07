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
      { path: '', loadChildren: () => import('./city/city-home/city-home.module').then(m => m.CityHomeModule) },
      { path: 'introduccion', loadChildren: () => import('./city/city-introduction/city-introduction.module').then(m => m.CityIntroductionModule) },
      { path: 'historia', loadChildren: () => import('./city/city-history/city-history.module').then(m => m.CityHistoryModule) },
      { path: 'argumentacion', loadChildren: () => import('./city/city-argument/city-argument.module').then(m => m.CityArgumentModule) },
      { path: 'contenido', loadChildren: () => import('./city/city-content/city-content.module').then(m => m.CityContentModule) },
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
