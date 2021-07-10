import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AppConfigurationComponent } from './app-configuration.component';

const routes: Routes = [{ path: '', component: AppConfigurationComponent }];

@NgModule({
  declarations: [
    AppConfigurationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AppConfigurationModule { }
