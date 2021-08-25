import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CityActivityDto } from './city-activity.dto';

@Injectable({
  providedIn: 'root'
})
export class LoadActivityService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public load$(cityId: string): Observable<CityActivityDto | null> {
    return this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<CityActivityDto>('activity')
      .valueChanges()
      .pipe(
        map(data => data ?? null),
        shareReplay(1),
      );
  }
}
