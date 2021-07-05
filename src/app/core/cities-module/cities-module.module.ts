import { NgModule } from '@angular/core';
import { LoadCitiesService } from './load-cities.service';

@NgModule({
  providers: [
    LoadCitiesService,
  ],
})
export class CitiesModuleModule { }
