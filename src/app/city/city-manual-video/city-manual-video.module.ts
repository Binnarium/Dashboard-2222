import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityManualVideoComponent } from './city-manual-video.component';
import { LoadManualVideoService } from './load-manual-video.service';
import { SaveManualVideoService } from './save-manual-video.service';

const routes: Routes = [{
  path: '',
  component: CityManualVideoComponent,
}]

@NgModule({
  declarations: [
    CityManualVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveManualVideoService, LoadManualVideoService,
  ]
})
export class CityManualVideoModule { }
