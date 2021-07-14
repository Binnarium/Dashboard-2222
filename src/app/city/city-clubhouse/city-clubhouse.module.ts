import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityClubhouseComponent } from './city-clubhouse.component';


const routes: Routes = [{ path: '', component: CityClubhouseComponent }]

@NgModule({
  declarations: [
    CityClubhouseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CityClubhouseModule { }
