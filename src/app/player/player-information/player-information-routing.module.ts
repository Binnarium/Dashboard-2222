import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerInformationComponent } from './player-information.component';

const routes: Routes = [
  { path: '', component: PlayerInformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerInformationRoutingModule { }
