import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CityManualVideoDto } from './city-manual-video.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveManualVideoService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: CityManualVideoDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<CityManualVideoDto>('manual-video')
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
