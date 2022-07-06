import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CompetenceDto } from '../competence.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveCompetenceService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(competenceId: string, payload: CompetenceDto): Observable<boolean> {
    const saveTask = this.afFirestore.collection('competences')
      .doc<CompetenceDto>(competenceId)
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
