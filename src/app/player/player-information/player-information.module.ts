import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { PlayerInformationRoutingModule } from './player-information-routing.module';
import { PlayerInformationComponent } from './player-information.component';


@NgModule({
  declarations: [
    PlayerInformationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlayerInformationRoutingModule
  ],
})
export class PlayerInformationModule { }
