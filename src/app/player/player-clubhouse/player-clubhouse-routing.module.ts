import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerClubhouseComponent } from './player-clubhouse.component';

const routes: Routes = [
  { path: '', component: PlayerClubhouseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerClubhouseRoutingModule { }
