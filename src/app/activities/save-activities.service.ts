import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ActivitiesDto } from './activities.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveActivitiesService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: ActivitiesDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('application')
      .doc<ActivitiesDto>('activities')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
