import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { RegisterInscriptionsComponent } from './register-inscriptions/register-inscriptions.component';
import { ReadFileComponent } from './register-inscriptions/upload-file/read-file.component';
import { InscriptionsComponent } from './inscriptions.component';
import { ListInscriptionsComponent } from './list-inscriptions/list-inscriptions.component';

@NgModule({
  declarations: [
    RegisterInscriptionsComponent,
    ReadFileComponent,
    InscriptionsComponent,
    ListInscriptionsComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
  ],
})
export class InscriptionsModule { }
