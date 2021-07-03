import { NgModule } from '@angular/core';
import { DashboardLayoutModule } from './dashboard-layout/dashboard-layout.module';



@NgModule({
  imports: [
    DashboardLayoutModule
  ],
  exports: [DashboardLayoutModule],
})
export class SharedModule { }
