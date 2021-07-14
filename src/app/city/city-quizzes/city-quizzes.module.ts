import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityQuizzesComponent } from './city-quizzes.component';

const routes: Routes = [{ path: '', component: CityQuizzesComponent }]

@NgModule({
  declarations: [
    CityQuizzesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CityQuizzesModule { }
