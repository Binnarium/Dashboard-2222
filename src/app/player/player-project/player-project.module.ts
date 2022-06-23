import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerProjectRoutingModule } from './player-project-routing.module';
import { PlayerProjectComponent } from './player-project.component';


@NgModule({
  declarations: [
    PlayerProjectComponent
  ],
  imports: [
    CommonModule,
    PlayerProjectRoutingModule
  ]
})
export class PlayerProjectModule { }
