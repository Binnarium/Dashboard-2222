import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CityDto } from './load-cities.service';


@Injectable({
  providedIn: 'root'
})
export class LoadCityService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public city$(cityId: string): Observable<CityDto | null> {
    return this.afFirestore
      .collection('cities')
      .doc<CityDto>(cityId)
      .valueChanges()
      .pipe(
        map(city => city ?? null),
        shareReplay(1),
      );
  }
}
