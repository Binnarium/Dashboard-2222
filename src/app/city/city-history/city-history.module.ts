import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityHistoryRoutingModule } from './city-history-routing.module';
import { CityHistoryComponent } from './city-history.component';
import { LoadHistoryService } from './load-history.service';
import { SaveHistoryService } from './save-history.service';



@NgModule({
  declarations: [
    CityHistoryComponent
  ],
  imports: [
    CommonModule,
    CityHistoryRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    LoadHistoryService,
    SaveHistoryService,
  ]
})
export class CityHistoryModule { }
