import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { PlayerProjectService } from './player-clubhouse.service';
import { PlayerProjectRoutingModule } from './player-project-routing.module';
import { PlayerProjectComponent } from './player-project.component';
import { UploadProjectComponent } from './upload-project/upload-project.component';


@NgModule({
  declarations: [
    PlayerProjectComponent,
    UploadProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlayerProjectRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    PlayerProjectService,
  ]
})
export class PlayerProjectModule { }
