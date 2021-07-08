import { NgModule } from '@angular/core';
import { CityColorService } from './city-color.service';
import { LoadCitiesService } from './load-cities.service';
import { LoadCityService } from './load-city.service';

@NgModule({
  providers: [
    LoadCitiesService,
    LoadCityService,
    CityColorService
  ],
})
export class CitiesModuleModule { }
