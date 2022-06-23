import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerProjectComponent } from './player-project.component';
import { UploadProjectComponent } from './upload-project/upload-project.component';

const routes: Routes = [
  { path: '', component: PlayerProjectComponent },
  { path: 'nuevo', component: UploadProjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerProjectRoutingModule { }
