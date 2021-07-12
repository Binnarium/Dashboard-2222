import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoadCityService } from 'src/app/core/cities-module/load-city.service';
import { CityConfigurationDto } from './city-configuration.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadCityConfigurationService {
  constructor(
    private readonly loadCityService: LoadCityService,
  ) { }

  public load$(cityId: string): Observable<CityConfigurationDto | null> {
    return this.loadCityService.city$(cityId)
      .pipe(
        map(data => data as CityConfigurationDto ?? null),
        shareReplay(1),
      );
  }
}
