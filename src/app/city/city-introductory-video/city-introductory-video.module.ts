import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityIntroductoryVideoComponent } from './city-introductory-video.component';
import { LoadIntroductoryVideoService } from './load-introductory-video.service';
import { SaveIntroductoryVideoService } from './save-introductory-video.service';

const routes: Routes = [{
  path: '',
  component: CityIntroductoryVideoComponent,
}]

@NgModule({
  declarations: [
    CityIntroductoryVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveIntroductoryVideoService, LoadIntroductoryVideoService,
  ]
})
export class CityIntroductoryVideoModule { }
