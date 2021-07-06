import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityHomeComponent } from './city-home.component';

const routes: Routes = [{
  path: ':cityId',
  component: CityHomeComponent,
}];

@NgModule({
  declarations: [
    CityHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class CityHomeModule { }
