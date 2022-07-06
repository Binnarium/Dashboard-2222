import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CompetenceDto as CompetenceDto } from './competence.dto';

@Injectable({
  providedIn: 'root'
})
export class CreateNewCompetenceService {
  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public create$(): Observable<string | null> {
    const newCompetence: CompetenceDto = {
      id: this.afFirestore.createId(),
      image: { height: null, name: null, path: null, url: null, width: null },
      kind: 'COMPETENCE#HARD',
      name: null,
    };

    const createTask = this.afFirestore
      .collection<CompetenceDto>('competences')
      .doc(newCompetence.id).set(newCompetence);

    return from(createTask).pipe(
      mapTo(newCompetence.id),
      catchError(() => of(null)),
    );
  }
}
