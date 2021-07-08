import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './city.component';



@NgModule({
  declarations: [
    CityComponent
  ],
  imports: [
    CommonModule, CityRoutingModule
  ]
})
export class CityModule { }
