import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwardsCitiesNamesComponent } from './awards-cities-names/awards-cities-names.component';
import { ContainerComponent } from './container/container.component';



@NgModule({
  declarations: [
    ContainerComponent,
    AwardsCitiesNamesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ContainerComponent,
    AwardsCitiesNamesComponent,
  ],
})
export class ComponentsModule { }
