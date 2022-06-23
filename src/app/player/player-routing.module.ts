import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from './player.component';

const routes: Routes = [
  {
    component: PlayerComponent,
    path: '',
    children: [
      { path: '', loadChildren: () => import('./player-information/player-information.module').then(m => m.PlayerInformationModule) },
      { path: 'clubhouse', loadChildren: () => import('./player-clubhouse/player-clubhouse.module').then(m => m.PlayerClubhouseModule) },
      { path: 'proyecto', loadChildren: () => import('./player-project/player-project.module').then(m => m.PlayerProjectModule) },
      { path: '**', redirectTo: '' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
