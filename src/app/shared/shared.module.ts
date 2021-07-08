import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from './forms/forms.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { TopbarComponent } from './topbar/topbar.component';
import { UploadModule } from './upload/upload.module';



@NgModule({
  imports: [
    SidebarModule,
    UploadModule,
    FormsModule,
  ],
  declarations: [
    TopbarComponent,
    FooterComponent,
  ],
  exports: [
    SidebarModule,
    UploadModule,
    FormsModule,
    TopbarComponent,
    FooterComponent,
  ],
})
export class SharedModule { }
