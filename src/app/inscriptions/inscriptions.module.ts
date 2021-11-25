import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './register-inscriptions/inscriptions.component';
import { ReadFileComponent } from './register-inscriptions/upload-file/read-file.component';

@NgModule({
  declarations: [
    InscriptionsComponent,
    ReadFileComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
  ],
})
export class InscriptionsModule { }
