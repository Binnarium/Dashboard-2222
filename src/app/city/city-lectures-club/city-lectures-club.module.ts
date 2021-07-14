import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityLecturesClubComponent } from './city-lectures-club.component';


const routes: Routes = [{ path: '', component: CityLecturesClubComponent }]

@NgModule({
  declarations: [
    CityLecturesClubComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CityLecturesClubModule { }
