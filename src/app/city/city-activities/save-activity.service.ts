import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CityActivityDto } from './city-activity.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveActivityService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: CityActivityDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<CityActivityDto>('activity')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
