import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityMicroMesoMacroComponent } from './city-micro-meso-macro.component';
import { LoadMicroMesoMacroService } from './load-micro-meso-macro.service';
import { SaveMicroMesoMacroService } from './save-micro-meso-macro.service';

const routes: Routes = [{
  path: '',
  component: CityMicroMesoMacroComponent,
}]

@NgModule({
  declarations: [
    CityMicroMesoMacroComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveMicroMesoMacroService, LoadMicroMesoMacroService,
  ]
})
export class CityMicroMesoMacroModule { }
