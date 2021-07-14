import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityProjectComponent } from './city-project.component';

const routes: Routes = [{ path: '', component: CityProjectComponent }]

@NgModule({
  declarations: [
    CityProjectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CityProjectModule { }
