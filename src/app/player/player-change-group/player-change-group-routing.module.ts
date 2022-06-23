import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerChangeGroupComponent } from './player-change-group.component';

const routes: Routes = [
  { path: '', component: PlayerChangeGroupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerChangeGroupRoutingModule { }
