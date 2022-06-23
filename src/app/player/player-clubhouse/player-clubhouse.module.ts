import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { PlayerClubhouseRoutingModule } from './player-clubhouse-routing.module';
import { PlayerClubhouseComponent } from './player-clubhouse.component';
import { PlayerClubhouseService } from './player-clubhouse.service';


@NgModule({
  declarations: [
    PlayerClubhouseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlayerClubhouseRoutingModule
  ],
  providers: [
    PlayerClubhouseService
  ]
})
export class PlayerClubhouseModule { }
