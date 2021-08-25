import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoadStartVideoService } from './load-start-video.service';
import { SaveStartVideoService } from './save-start-video.service';
import { StartVideoComponent } from './start-video.component';

const routes: Routes = [{
  path: '',
  component: StartVideoComponent,
}]

@NgModule({
  declarations: [
    StartVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveStartVideoService, LoadStartVideoService,
  ]
})
export class StartVideoModule { }
