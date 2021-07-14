import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityResourcesComponent } from './city-resources.component';
import { LoadResourcesService } from './load-resources.service';
import { SaveResourcesService } from './save-resources.service';

const routes: Routes = [{ path: '', component: CityResourcesComponent }];


@NgModule({
  declarations: [
    CityResourcesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    LoadResourcesService,
    SaveResourcesService,
  ]
})
export class CityResourcesModule { }
