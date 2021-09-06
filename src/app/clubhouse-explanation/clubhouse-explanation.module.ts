import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClubhouseExplanationComponent } from './clubhouse-explanation.component';
import { LoadClubhouseExplanationService } from './load-clubhouse-explanation.service';
import { SaveClubhouseExplanationService } from './save-clubhouse-explanation.service';

const routes: Routes = [
  { path: '', component: ClubhouseExplanationComponent },
];

@NgModule({
  declarations: [
    ClubhouseExplanationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    SaveClubhouseExplanationService,
    LoadClubhouseExplanationService,
  ]
})
export class ClubhouseExplanationModule { }
