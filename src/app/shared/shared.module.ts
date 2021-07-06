import { NgModule } from '@angular/core';
import { DashboardLayoutModule } from './dashboard-layout/dashboard-layout.module';
import { FormsModule } from './forms/forms.module';
import { UploadModule } from './upload/upload.module';



@NgModule({
  imports: [
    DashboardLayoutModule,
    UploadModule,
    FormsModule,
  ],
  exports: [
    DashboardLayoutModule,
    UploadModule,
    FormsModule,
  ],
})
export class SharedModule { }
