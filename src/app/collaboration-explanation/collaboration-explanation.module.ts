import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CollaborationExplanationComponent } from './collaboration-explanation.component';
import { LoadCollaborationExplanationService } from './load-collaboration-explanation.service';
import { SaveCollaborationExplanationService } from './save-collaboration-explanation.service';

const routes: Routes = [
  { path: '', component: CollaborationExplanationComponent },
];

@NgModule({
  declarations: [
    CollaborationExplanationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
  providers: [
    SaveCollaborationExplanationService,
    LoadCollaborationExplanationService,
  ]
})
export class CollaborationExplanationModule { }
