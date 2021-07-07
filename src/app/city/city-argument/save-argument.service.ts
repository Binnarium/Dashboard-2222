import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CityArgumentDto } from './city-argument.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveArgumentService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: CityArgumentDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<CityArgumentDto>('argument')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);

        return of(false)
      }),
    );
  }
}
