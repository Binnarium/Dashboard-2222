import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { ContributionExplanationDto } from './contribution-explanation.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveContributionExplanationService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(payload: ContributionExplanationDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('application')
      .doc<ContributionExplanationDto>('contribution-explanation')
      .set(payload, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(_ => of(false)),
    );
  }
}
