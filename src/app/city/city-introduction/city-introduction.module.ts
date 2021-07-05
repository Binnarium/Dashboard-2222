import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CityIntroductionRoutingModule } from './city-introduction-routing.module';
import { LoadIntroductionService } from './load-introduction.service';
import { SaveIntroductionService } from './save-introduction.service';



@NgModule({
  declarations: [
    CityIntroductionRoutingModule.pages
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CityIntroductionRoutingModule
  ],
  providers: [
    LoadIntroductionService,
    SaveIntroductionService,
  ]
})
export class CityIntroductionModule { }
