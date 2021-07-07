import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityContentComponent } from './city-content.component';
import { LoadContentService } from './load-content.service';
import { SaveContentService } from './save-content.service';

const routes: Routes = [{
  path: ':cityId',
  component: CityContentComponent,
}];

@NgModule({
  declarations: [
    CityContentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    LoadContentService,
    SaveContentService,
  ]
})
export class CityContentModule { }
