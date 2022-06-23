import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerClubhouseRoutingModule } from './player-clubhouse-routing.module';
import { PlayerClubhouseComponent } from './player-clubhouse.component';


@NgModule({
  declarations: [
    PlayerClubhouseComponent
  ],
  imports: [
    CommonModule,
    PlayerClubhouseRoutingModule
  ]
})
export class PlayerClubhouseModule { }
