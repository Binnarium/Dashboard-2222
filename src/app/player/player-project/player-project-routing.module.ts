import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerProjectComponent } from './player-project.component';

const routes: Routes = [
  { path: '', component: PlayerProjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerProjectRoutingModule { }
