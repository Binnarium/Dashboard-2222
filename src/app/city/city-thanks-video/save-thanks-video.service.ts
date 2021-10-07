import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CityThanksVideoDto } from './city-thanks-video.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveThanksVideoService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: CityThanksVideoDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<CityThanksVideoDto>('thanks-video')
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
