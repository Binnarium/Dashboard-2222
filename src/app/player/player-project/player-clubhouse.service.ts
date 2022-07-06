import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo, startWith } from 'rxjs/operators';

export interface PlayerProjectModel {
  cityId: string;
  id: string;
  kind: string;
  file: {
    path: string;
    url: string;
  };
}

export interface CreatePlayerProjectModel {
  cityId: string;
  id: string;
  kind: string;
  file: {
    path: string;
    url: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class PlayerProjectService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }


  public all$(playerId: string): Observable<Array<PlayerProjectModel>> {
    return this.afFirestore.collection('players').doc(playerId)
      .collection<PlayerProjectModel>('project', q => q.orderBy(<keyof PlayerProjectModel>'cityId',))
      .valueChanges()
      .pipe(
        startWith([])
      );
  }

  public delete$(playerId: string, projectId: string): Observable<boolean> {
    const task = this.afFirestore.collection('players').doc(playerId)
      .collection<PlayerProjectModel>('project').doc(projectId).delete();

    return from(task).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false)
      })
    )
  }

  public createNew$(playerId: string, cityId: string, kind: string, path: string, url: string): Observable<boolean> {
    const id = this.afFirestore.createId();
    const payload: CreatePlayerProjectModel = {
      cityId,
      id,
      file: {
        path,
        url
      },
      kind
    };

    const task = this.afFirestore.collection('players').doc(playerId)
      .collection<CreatePlayerProjectModel>('project').doc(id).set(payload);

    return from(task).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false)
      })
    )
  }
}
