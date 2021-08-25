import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ActivitiesComponent } from './activities.component';
import { LoadActivitiesService } from './load-activities.service';
import { SaveActivitiesService } from './save-activities.service';

const routes: Routes = [{
  path: '',
  component: ActivitiesComponent,
}];

@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    LoadActivitiesService,
    SaveActivitiesService,
  ]
})
export class ActivitiesModule { }
