import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CitiesSidebarComponent } from './cities-sidebar/cities-sidebar.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
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
    MainSidebarComponent,
    CitiesSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SidebarComponent,
    SidebarHeaderComponent,
    SidebarDividerComponent,
    SidebarItemComponent,
    SidebarSectionNameComponent,
    MainSidebarComponent,
    CitiesSidebarComponent,
  ],
})
export class SidebarModule { }
