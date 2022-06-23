import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanAccessDashboardGuard } from './core/auth/can-access-dashboard.guard';

const routes: Routes = [
  // authentication module
  {
    path: 'ingresar',
    loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)
  },

  // players module
  {
    path: 'jugadores',
    loadChildren: () => import('./players/players.module').then(m => m.PlayersModule),
    canActivate: [CanAccessDashboardGuard]
  },

  {
    path: 'jugador/:playerId',
    loadChildren: () => import('./player/player.module').then(m => m.PlayerModule),
    canActivate: [CanAccessDashboardGuard],
  },

  {
    path: 'inscripciones',
    loadChildren: () => import('./inscriptions/inscriptions.module').then(m => m.InscriptionsModule),
    canActivate: [CanAccessDashboardGuard]
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
    path: 'explicacion-colaboraciones',
    loadChildren: () => import('./contribution-explanation/contribution-explanation.module').then(m => m.ContributionExplanationModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // home module
  {
    path: 'explicacion-clubhouse',
    loadChildren: () => import('./clubhouse-explanation/clubhouse-explanation.module').then(m => m.ClubhouseExplanationModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // home module
  {
    path: 'configuracion',
    loadChildren: () => import('./app-configuration/app-configuration.module').then(m => m.AppConfigurationModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // start video module
  {
    path: 'video-introduccion',
    loadChildren: () => import('./start-video/start-video.module').then(m => m.StartVideoModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // start video module
  {
    path: 'actividades',
    loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule),
    canActivate: [CanAccessDashboardGuard]
  },
  // points explanation
  {
    path: 'explicacion-puntos',
    loadChildren: () => import('./points-explanation/points-explanation.module').then(m => m.PointsExplanationModule),
    canActivate: [CanAccessDashboardGuard]
  },

  // team module
  {
    path: 'ficha-equipo',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
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
