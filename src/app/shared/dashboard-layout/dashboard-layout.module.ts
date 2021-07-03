import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarLayoutComponent } from './sidebar-layout.component';
import { SidebarModule } from './sidebar/sidebar.module';



@NgModule({
  declarations: [
    SidebarLayoutComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
  ],
  exports: [
    SidebarLayoutComponent,
    FooterComponent,
    NavbarComponent,
    SidebarModule,
  ]
})
export class DashboardLayoutModule { }
