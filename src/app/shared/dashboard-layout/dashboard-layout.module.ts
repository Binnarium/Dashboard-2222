import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { SidebarLayoutComponent } from './sidebar-layout.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    SidebarLayoutComponent,
    FooterComponent,
    TopbarComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [
    SidebarLayoutComponent,
    FooterComponent,
    SidebarModule,
    TopbarComponent,
  ]
})
export class DashboardLayoutModule { }
