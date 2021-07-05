import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityHistoryComponent } from './city-history.component';

const routes: Routes = [{
  path: ':cityId',
  component: CityHistoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityHistoryRoutingModule { }
