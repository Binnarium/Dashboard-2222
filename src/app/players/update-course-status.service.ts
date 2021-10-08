import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { PlayerModel } from './player.model';

type _UpdateCourseStatusModel = Pick<PlayerModel, 'courseStatus'>;

@Injectable({
  providedIn: 'root'
})
export class UpdateCourseStatusService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(playerId: string, courseStatus: string): Observable<boolean> {
    const payload: _UpdateCourseStatusModel = { courseStatus };

    const saveTask = this.afFirestore.collection<_UpdateCourseStatusModel>('players')
      .doc(playerId)
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
