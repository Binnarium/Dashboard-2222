import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CityIntroductionComponent } from './city-introduction.component';
import { LoadIntroductionService } from './load-introduction.service';
import { SaveIntroductionService } from './save-introduction.service';

const routes: Routes = [{
  path: '',
  component: CityIntroductionComponent,
}];

@NgModule({
  declarations: [
    CityIntroductionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    LoadIntroductionService,
    SaveIntroductionService,
  ]
})
export class CityIntroductionModule { }
