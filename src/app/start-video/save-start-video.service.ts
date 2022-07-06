import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { StartVideoDto } from './start-video.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveStartVideoService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: StartVideoDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('application')
      .doc<StartVideoDto>('start-video')
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
