import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoadTeamService } from './load-team.service';
import { SaveTeamService } from './save-team.service';
import { TeamComponent } from './team.component';

const routes: Routes = [
  { path: '', component: TeamComponent },
];

@NgModule({
  declarations: [
    TeamComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    SaveTeamService,
    LoadTeamService,
  ]
})
export class TeamModule { }
