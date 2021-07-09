import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompetencesComponent } from './competences.component';
import { CreateNewCompetenceService } from './create-new-competence.service';
import { LoadAllCompetencesService } from './load-all-competences.service';
import { DeleteCompetenceService } from './update-competence/delete-competence.service';
import { LoadCompetenceService } from './update-competence/load-competence.service';
import { SaveCompetenceService } from './update-competence/save-competence.service';
import { UpdateCompetenceComponent } from './update-competence/update-competence.component';

const routes: Routes = [{
  path: '',
  component: CompetencesComponent,
  children: [
    { path: ':competenceId', component: UpdateCompetenceComponent }
  ]
}];

@NgModule({
  declarations: [
    CompetencesComponent,
    UpdateCompetenceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    LoadAllCompetencesService,
    LoadCompetenceService,
    SaveCompetenceService,
    CreateNewCompetenceService,
    DeleteCompetenceService,
  ]
})
export class CompetencesModule { }
