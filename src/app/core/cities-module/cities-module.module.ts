import { NgModule } from '@angular/core';
import { LoadCitiesService } from './load-cities.service';
import { LoadCityService } from './load-city.service';

@NgModule({
  providers: [
    LoadCitiesService,
    LoadCityService
  ],
})
export class CitiesModuleModule { }
