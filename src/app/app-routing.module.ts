import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanAccessDashboardGuard } from './core/auth/can-access-dashboard.guard';

const routes: Routes = [
  // authentication module
  {
    path: 'ingresar',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)
  },

  // welcome module
  {
    path: 'bienvenida',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // home module
  {
    path: 'ciudades/:cityId',
    loadChildren: () => import('./city/city.module').then(m => m.CityModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // home module
  {
    path: 'competencias',
    loadChildren: () => import('./competences/competences.module').then(m => m.CompetencesModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // home module
  {
    path: 'configuracion-clubhouse',
    loadChildren: () => import('./clubhouse-configuration/clubhouse-configuration.module').then(m => m.ClubhouseConfigurationModule),
    canActivate: [CanAccessDashboardGuard]
  },
  // home module
  {
    path: 'configuracion',
    loadChildren: () => import('./app-configuration/app-configuration.module').then(m => m.AppConfigurationModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // redirect all inconsistent routes to home
  {
    path: '**',
    redirectTo: '/ingresar',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
