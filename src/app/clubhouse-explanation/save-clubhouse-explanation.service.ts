import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ClubhouseExplanationDto } from './clubhouse-explanation.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveClubhouseExplanationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: ClubhouseExplanationDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('application')
      .doc<ClubhouseExplanationDto>('clubhouse-explanation')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
