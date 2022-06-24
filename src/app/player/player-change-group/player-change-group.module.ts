import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlayerChangeGroupRoutingModule } from './player-change-group-routing.module';
import { PlayerChangeGroupComponent } from './player-change-group.component';


@NgModule({
  declarations: [
    PlayerChangeGroupComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PlayerChangeGroupRoutingModule
  ]
})
export class PlayerChangeGroupModule { }
