import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityConfigurationComponent } from './city-configuration.component';

const routes: Routes = [{
  path: '',
  component: CityConfigurationComponent,
}];

@NgModule({
  declarations: [
    CityConfigurationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class CityConfigurationModule { }
