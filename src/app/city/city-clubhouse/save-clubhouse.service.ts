import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ClubhouseDto } from './clubhouse.dto';


@Injectable({
  providedIn: 'root'
})
export class SaveClubhouseService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: ClubhouseDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<ClubhouseDto>('clubhouse')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
