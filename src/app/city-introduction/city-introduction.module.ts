import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CityIntroductionRoutingModule } from './city-introduction-routing.module';



@NgModule({
  declarations: [
    CityIntroductionRoutingModule.pages
  ],
  imports: [
    CommonModule,
    SharedModule,
    CityIntroductionRoutingModule
  ]
})
export class CityIntroductionModule { }
