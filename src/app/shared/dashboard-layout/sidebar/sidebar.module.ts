import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarDividerComponent } from './sidebar-divider/sidebar-divider.component';
import { SidebarHeaderComponent } from './sidebar-header/sidebar-header.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { SidebarSectionNameComponent } from './sidebar-section-name/sidebar-section-name.component';
import { SidebarComponent } from './sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarDividerComponent,
    SidebarItemComponent,
    SidebarSectionNameComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarDividerComponent,
    SidebarItemComponent,
    SidebarSectionNameComponent,
  ],
})
export class SidebarModule { }
