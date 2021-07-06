import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormLabelComponent } from './form-label/form-label.component';



@NgModule({
  declarations: [
    FormLabelComponent,
    FormGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormLabelComponent,
    FormGroupComponent
  ],
})
export class FormsModule { }
