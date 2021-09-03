import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityFinalVideoComponent } from './city-final-video.component';
import { LoadFinalVideoService } from './load-final-video.service';
import { SaveFinalVideoService } from './save-final-video.service';

const routes: Routes = [{
  path: '',
  component: CityFinalVideoComponent,
}]

@NgModule({
  declarations: [
    CityFinalVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveFinalVideoService, LoadFinalVideoService,
  ]
})
export class CityFinalVideoModule { }
