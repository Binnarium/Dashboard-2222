import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityThanksVideoComponent } from './city-thanks-video.component';
import { LoadThanksVideoService } from './load-thanks-video.service';
import { SaveThanksVideoService } from './save-thanks-video.service';

const routes: Routes = [{
  path: '',
  component: CityThanksVideoComponent,
}]

@NgModule({
  declarations: [
    CityThanksVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveThanksVideoService, LoadThanksVideoService,
  ]
})
export class CityThanksVideoModule { }
