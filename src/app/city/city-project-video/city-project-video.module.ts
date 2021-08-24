import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityIntroductoryVideoComponent } from './city-project-video.component';
import { LoadProjectVideoService } from './load-project-video.service';
import { SaveProjectVideoService } from './save-project-video.service';

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
    SaveProjectVideoService, LoadProjectVideoService,
  ]
})
export class CityProjectVideoModule { }
