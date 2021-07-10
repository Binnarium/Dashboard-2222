import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ClubhouseConfigurationComponent } from './clubhouse-configuration.component';

const routes: Routes = [{ path: '', component: ClubhouseConfigurationComponent }];

@NgModule({
  declarations: [
    ClubhouseConfigurationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ]
})
export class ClubhouseConfigurationModule { }
