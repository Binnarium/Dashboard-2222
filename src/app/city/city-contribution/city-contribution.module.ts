import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityContributionComponent } from './city-contribution.component';

const routes: Routes = [{ path: '', component: CityContributionComponent }]

@NgModule({
  declarations: [
    CityContributionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CityContributionModule { }
