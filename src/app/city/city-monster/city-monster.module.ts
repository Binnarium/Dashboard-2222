import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityMonsterComponent } from './city-monster.component';
import { LoadMonsterService } from './load-monster.service';
import { SaveMonsterService } from './save-monster.service';

const routes: Routes = [{
  path: '',
  component: CityMonsterComponent,
}]

@NgModule({
  declarations: [
    CityMonsterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    SaveMonsterService, LoadMonsterService,
  ]
})
export class CityMonsterModule { }
