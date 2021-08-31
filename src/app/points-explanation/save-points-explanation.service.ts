import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { PointsExplanationDto } from './points-explanation.dto';

@Injectable({
  providedIn: 'root'
})
export class SavePointsExplanationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: PointsExplanationDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('application')
      .doc<PointsExplanationDto>('points-explanation')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
