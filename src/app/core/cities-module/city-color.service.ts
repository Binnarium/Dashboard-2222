import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadCityService } from './load-city.service';


@Injectable({
  providedIn: 'root'
})
export class CityColorService {

  constructor(
    private readonly loadCityService: LoadCityService,
  ) { }

  public color$(cityId: string): Observable<string | null> {
    return this.loadCityService.city$(cityId)
      .pipe(
        map(city => city ?? null),
        map(city => city?.configuration.colorHex ?? null),
        map(color => color ? (color - 0xff000000).toString(16) : null),
      );
  }
}
