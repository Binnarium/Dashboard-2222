import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { PlayerModel } from './player.model';

type _UpdatePlayerWebAccessModel = Pick<PlayerModel, 'allowWebAccess'>;

@Injectable({
  providedIn: 'root'
})
export class UpdatePlayerWebAccessService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(playerId: string, allowWebAccess: boolean): Observable<boolean> {
    const payload: _UpdatePlayerWebAccessModel = { allowWebAccess };

    const saveTask = this.afFirestore.collection<_UpdatePlayerWebAccessModel>('players')
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
