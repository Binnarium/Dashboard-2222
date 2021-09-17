import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContributionExplanationComponent } from './contribution-explanation.component';
import { LoadContributionExplanationService } from './load-contribution-explanation.service';
import { SaveContributionExplanationService } from './save-contribution-explanation.service';

const routes: Routes = [
  { path: '', component: ContributionExplanationComponent },
];

@NgModule({
  declarations: [
    ContributionExplanationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    SaveContributionExplanationService,
    LoadContributionExplanationService,
  ]
})
export class ContributionExplanationModule { }
