import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CityIntroductionRoutingModule } from './city-introduction-routing.module';



@NgModule({
  declarations: [
    CityIntroductionRoutingModule.pages
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CityIntroductionRoutingModule
  ]
})
export class CityIntroductionModule { }
