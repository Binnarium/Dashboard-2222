import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityProjectVideoComponent } from './city-project-video.component';
import { LoadProjectVideoService } from './load-project-video.service';
import { SaveProjectVideoService } from './save-project-video.service';

const routes: Routes = [{
  path: '',
  component: CityProjectVideoComponent,
}]

@NgModule({
  declarations: [
    CityProjectVideoComponent
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
