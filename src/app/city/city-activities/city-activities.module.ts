import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityActivitiesComponent } from './city-activities.component';

const routes: Routes = [{ path: '', component: CityActivitiesComponent }];


@NgModule({
  declarations: [
    CityActivitiesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class CityActivitiesModule { }
