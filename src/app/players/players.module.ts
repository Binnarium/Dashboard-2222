import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoadPlayersService } from './load-player.service';
import { PlayersRoutingModule } from './players-routing.module';
import { PlayersComponent } from './players.component';
import { UpdateCourseStatusService } from './update-course-status.service';
import { UpdatePlayerTypeService } from './update-player-type.service';



@NgModule({
  declarations: [
    PlayersComponent
  ],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    SharedModule,
  ],
  providers: [
    LoadPlayersService,
    UpdateCourseStatusService,
    UpdatePlayerTypeService,
  ]
})
export class PlayersModule { }
