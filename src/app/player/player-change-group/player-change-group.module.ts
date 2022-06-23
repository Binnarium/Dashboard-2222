import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerChangeGroupRoutingModule } from './player-change-group-routing.module';
import { PlayerChangeGroupComponent } from './player-change-group.component';


@NgModule({
  declarations: [
    PlayerChangeGroupComponent
  ],
  imports: [
    CommonModule,
    PlayerChangeGroupRoutingModule
  ]
})
export class PlayerChangeGroupModule { }
