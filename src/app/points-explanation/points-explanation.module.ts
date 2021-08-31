import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LoadPointsExplanationService } from './load-points-explanation.service';
import { PointsExplanationComponent } from './points-explanation.component';
import { SavePointsExplanationService } from './save-points-explanation.service';

const routes: Routes = [
  { path: '', component: PointsExplanationComponent },
];

@NgModule({
  declarations: [
    PointsExplanationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    SavePointsExplanationService,
    LoadPointsExplanationService,
  ]
})
export class PointsExplanationModule { }
