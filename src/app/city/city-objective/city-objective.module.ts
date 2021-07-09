import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityObjectiveComponent } from './city-objective.component';
import { LoadAllValidCompetencesService } from './load-all-valid-competences.service';
import { LoadObjectiveService } from './load-objective.service';
import { SaveObjectiveService } from './save-objective.service';

const routes: Routes = [{
  path: '',
  component: CityObjectiveComponent
}];

@NgModule({
  declarations: [
    CityObjectiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoadObjectiveService,
    SaveObjectiveService,
    LoadAllValidCompetencesService
  ]
})
export class CityObjectiveModule { }
