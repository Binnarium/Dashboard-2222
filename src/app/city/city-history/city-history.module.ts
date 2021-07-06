import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityHistoryComponent } from './city-history.component';
import { LoadHistoryService } from './load-history.service';
import { SaveHistoryService } from './save-history.service';

const routes: Routes = [{ path: ':cityId', component: CityHistoryComponent }];

@NgModule({
  declarations: [
    CityHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    LoadHistoryService,
    SaveHistoryService,
  ]
})
export class CityHistoryModule { }
