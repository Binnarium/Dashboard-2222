import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { PlayerModel } from './player.model';

type _UpdatePlayerTypeModel = Pick<PlayerModel, 'playerType'>;

@Injectable({
  providedIn: 'root'
})
export class UpdatePlayerTypeService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(playerId: string, playerType: string): Observable<boolean> {
    const payload: _UpdatePlayerTypeModel = { playerType };

    const saveTask = this.afFirestore.collection<_UpdatePlayerTypeModel>('players')
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
