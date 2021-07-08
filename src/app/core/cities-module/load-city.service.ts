import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CityDto, LoadCitiesService } from './load-cities.service';


@Injectable({
  providedIn: 'root'
})
export class LoadCityService {

  constructor(
    private readonly loadCitiesService: LoadCitiesService,
  ) { }

  public city$(cityId: string): Observable<CityDto | null> {
    return this.loadCitiesService.cities$.pipe(
      map(cities => cities.find(city => city.id === cityId) ?? null),
      shareReplay(1),
    );
  }
}
