import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CityDto } from 'src/app/core/cities-module/city.dto';
import { LoadCityService } from 'src/app/core/cities-module/load-city.service';

@Injectable({
  providedIn: 'root'
})
export class LoadCityConfigurationService {
  constructor(
    private readonly loadCityService: LoadCityService,
  ) { }

  public load$(cityId: string): Observable<CityDto | null> {
    return this.loadCityService.city$(cityId)
      .pipe(
        map(data => data as CityDto ?? null),
        shareReplay(1),
      );
  }
}
