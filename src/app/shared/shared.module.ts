import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { DataModule } from './data/data.module';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from './forms/forms.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { TopbarComponent } from './topbar/topbar.component';
import { UploadModule } from './upload/upload.module';

@NgModule({
  imports: [
    CommonModule,
    SidebarModule,
    UploadModule,
    FormsModule,
    ComponentsModule,
    DataModule,
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
    ComponentsModule,
    DataModule,
  ],
})
export class SharedModule { }
