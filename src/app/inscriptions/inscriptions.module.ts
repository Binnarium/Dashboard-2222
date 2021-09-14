import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { InscriptionsComponent } from './inscriptions.component';
import { StringToCsvParserService } from './string-to-csv-parser.service';
import { TransformCsvToInscriptionService } from './transform-csv-to-inscription.service';
import { ReadFileComponent } from './upload-file/read-file.component';
import { UploadInscriptionsService } from './upload-inscriptions.service';

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
  providers: [
    TransformCsvToInscriptionService,
    UploadInscriptionsService,
    StringToCsvParserService,
  ]
})
export class InscriptionsModule { }
