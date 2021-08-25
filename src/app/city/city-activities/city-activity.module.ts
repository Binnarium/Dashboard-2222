import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CityActivityComponent } from './city-activity.component';
import { LoadActivityService } from './load-activity.service';
import { SaveActivityService } from './save-activity.service';

const routes: Routes = [{
  path: '',
  component: CityActivityComponent,
}];

@NgModule({
  declarations: [
    CityActivityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    LoadActivityService,
    SaveActivityService,
  ]
})
export class CityIntroductionModule { }
