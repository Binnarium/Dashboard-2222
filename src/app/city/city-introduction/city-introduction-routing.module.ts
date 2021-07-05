import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityIntroductionComponent } from './city-introduction.component';

const routes: Routes = [{
  path: ':cityId',
  component: CityIntroductionComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityIntroductionRoutingModule {
  static pages = [CityIntroductionComponent];
}
