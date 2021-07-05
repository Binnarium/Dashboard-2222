import { NgModule } from '@angular/core';
import { DashboardLayoutModule } from './dashboard-layout/dashboard-layout.module';
import { UploadModule } from './upload/upload.module';



@NgModule({
  imports: [
    DashboardLayoutModule,
    UploadModule,
  ],
  exports: [
    DashboardLayoutModule,
    UploadModule,
  ],
})
export class SharedModule { }
