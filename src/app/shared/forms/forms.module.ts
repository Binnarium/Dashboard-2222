import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormGroupComponent } from './form-group/form-group.component';
import { FormLabelActionComponent } from './form-label-action/form-label-action.component';
import { FormLabelComponent } from './form-label/form-label.component';
import { TextareaComponent } from './textarea/textarea.component';



@NgModule({
  declarations: [
    FormLabelComponent,
    FormGroupComponent,
    FormLabelActionComponent,
    TextareaComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormLabelComponent,
    FormGroupComponent,
    FormLabelActionComponent,
    TextareaComponent,
  ],
})
export class FormsModule { }
