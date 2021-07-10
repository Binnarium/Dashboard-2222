import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityResourcesComponent } from './city-resources.component';

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
  ]
})
export class CityResourcesModule { }
