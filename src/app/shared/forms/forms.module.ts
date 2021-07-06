import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormLabelActionComponent } from './form-label-action/form-label-action.component';
import { FormLabelComponent } from './form-label/form-label.component';



@NgModule({
  declarations: [
    FormLabelComponent,
    FormGroupComponent,
    FormLabelActionComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormLabelComponent,
    FormGroupComponent,
    FormLabelActionComponent,
  ],
})
export class FormsModule { }
