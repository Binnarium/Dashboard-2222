import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo, startWith } from 'rxjs/operators';

export interface PlayerClubhouseModel {
  date?: firebase.firestore.Timestamp;
  scraped?: firebase.firestore.Timestamp;
  id: string;
  cityId: string;
  clubhouseUrl: string;
  clubhouseId?: string;
  name?: string;
  uploaderId: string;
}

export interface CreatePlayerClubhouseModel {
  id: string;
  cityId: string;
  clubhouseUrl: string;
  uploaderId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerClubhouseService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }


  public all$(playerId: string): Observable<Array<PlayerClubhouseModel>> {
    return this.afFirestore.collection('players').doc(playerId)
      .collection<PlayerClubhouseModel>('clubhouse', q => q.orderBy(<keyof PlayerClubhouseModel>'cityId',))
      .valueChanges()
      .pipe(
        startWith([])
      );
  }

  public delete$(playerId: string, clubhouseId: string): Observable<boolean> {
    const task = this.afFirestore.collection('players').doc(playerId)
      .collection<PlayerClubhouseModel>('clubhouse').doc(clubhouseId).delete();

    return from(task).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false)
      })
    )
  }

  public createNew$(playerId: string, cityId: string, url: string): Observable<boolean> {
    const id = this.afFirestore.createId();
    const payload: CreatePlayerClubhouseModel = {
      cityId,
      clubhouseUrl: url,
      id,
      uploaderId: playerId,
    };

    const task = this.afFirestore.collection('players').doc(playerId)
      .collection<CreatePlayerClubhouseModel>('clubhouse').doc(id).set(payload);

    return from(task).pipe(
      mapTo(true),
      catchError(err => {
        console.log(err);
        return of(false)
      })
    )
  }
}
