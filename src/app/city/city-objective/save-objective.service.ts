import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { CompetenceDto } from 'src/app/competences/competence.dto';
import { ObjectiveDto, ObjectiveFirebaseDto } from './objective.dto';

@Injectable({
  providedIn: 'root'
})
export class SaveObjectiveService {

  constructor(
    private readonly afFirestore: AngularFirestore,
  ) { }

  public save$(cityId: string, payload: ObjectiveDto): Observable<boolean> {

    const enabled = Object.entries(payload.competences ?? {}).filter(([_, value]) => value);

    const newValue: ObjectiveFirebaseDto = {
      ideas: payload.ideas,
      mainObjective: payload.mainObjective,
      competences: enabled.map(([c, _]) => this.getCompetenceReference(c)),
    };

    const saveTask = this.afFirestore.collection('cities')
      .doc(cityId)
      .collection('pages')
      .doc<ObjectiveFirebaseDto>('objective')
      .set(newValue, { merge: true });

    return from(saveTask).pipe(
      mapTo(true),
      catchError(err => {
        return of(false)
      }),
    );
  }

  getCompetenceReference(competenceId: string): DocumentReference<CompetenceDto> {
    return this.afFirestore.collection('competences').doc<CompetenceDto>(competenceId).ref;
  }
}
