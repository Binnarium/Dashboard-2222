import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityArgumentComponent } from './city-argument.component';
import { LoadArgumentService } from './load-argument.service';
import { SaveArgumentService } from './save-argument.service';

const routes: Routes = [{
  path: ':cityId',
  component: CityArgumentComponent,
}]

@NgModule({
  declarations: [
    CityArgumentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveArgumentService, LoadArgumentService,
  ]
})
export class CityArgumentModule { }
